import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { SubdomainComponent } from '../components/subdomain/subdomain.component';
import { SubdomaincveComponent } from '../components/subdomaincve/subdomaincve.component';

@Component({
  selector: 'ngx-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})
export class AnalyzeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'url', 'action'];
  displayedColumnsSub: string[] = ['url', 'test', 'cve', 'action'];
  displayedColumnsSubdomain: string[] = ['url', 'test', 'cve'];

  // @Input() selectedIndex: number | null;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  companyList: any;
  domainList: any;
  subDomainList: any;
  showCompany = true;
  showDomain = true;
  domain: any;
  subDomain: any;



  companys = true;   // changed   //testssl_output //cve_list
  domainin = true;



  contList: any = [
    {
      count: 155,
      name: 'Project',
    },
    {
      count: 155,
      name: 'Domain',
    },
    {
      count: 155,
      name: 'Sub Domain',
    },
  ];
  tabName: any = [
    {
      name: 'SUMMARY',
      status: true,
    },
    {
      name: 'COMPANY PROFILE',
      status: false,
    },
    {
      name: 'TECH VENDORS',
      status: false,
    },
    {
      name: 'SUB DOMAIN',
      status: false,
    },
    {
      name: 'COMPLIANCE STATUS',
      status: false,
    },
    {
      name: 'PRIVACY STATUS',
      status: false,
    },
    {
      name: 'AI&ML',
      status: false,
    },
  ];

  privacyStatus: any = [
    {
      lable: 'Cookie Settings Notice',
      status: true,
    },
    {
      lable: 'Privacy Notice is in place',
      status: true,
    },
    {
      lable: 'Privacy Notice shown as dialog box',
      status: true,
    },
    {
      lable: 'Reference to rights under GDPR provided',
      status: true,
    },
    {
      lable: 'Reference to rights under CCPA provided',
      status: true,
    },
    {
      lable: 'Is there a designated Privacy Officer?',
      status: true,
    },
    {
      lable: 'Is HIPAA in scope?',
      status: true,
    },
    {
      lable: 'Is there a designated HIPAA Officer?',
      status: false,
    },
    {
      lable: 'Is HIPAA training in place?',
      status: false,
    },
    {
      lable: 'Select the scope',
      status: false,
    },
  ];

  currentTab: any = 'SUMMARY';

  complianceForm: FormGroup;
  partyCertification: any = [
    'ISO 27001',
    'ISO 27017',
    'ISO 27018',
    'SOC 2',
    'SOC 1',
    'PCI DSS',
    'HIPAA',
    'HITRUST',
    'FISMA',
    'FedRAMP',
    'FFIEC',
    'Other',
  ];

  standards: any = [
    'NIST 800 - 53',
    'NIST 800 - 30',
    'NIST 800 - 66',
  ];

  userDetails: any;
  pspCustomerDetails: any;

  constructor(
    public http: HttpServiceService,
    public dialog: MatDialog,
    public fb: FormBuilder,
  ) {
    this.complianceForm = this.fb.group({
      certificate: ['', Validators.required],
      standards: ['', Validators.required],
      securityOfficer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.pspCustomerDetails = localStorage.getItem('PSPCUSTOMER');
    this.pspCustomerDetails = JSON.parse(this.pspCustomerDetails);
    // this.getUserList();
    if (this.userDetails.idendifier === 'CUSTOMER') {
      this.showCompany = false;
      this.viewCustomerDomain(); // For Customer
    } else {
      this.getUserList(); // For PSP
    }
  }

  refreshCompany(): void {
    this.getUserList();
  }

  getUserList() {
    this.http.getToken(`/analyze`).subscribe(data => {
      if (data[`success`] === true) {
        this.companyList = new MatTableDataSource(data?.data);
        this.companyList.paginator = this.paginator.toArray()[0];
        this.companyList.sort = this.sort.toArray()[0];
      } else {
        this.companyList = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyList.filter = filterValue.trim().toLowerCase();
    if (this.companyList.paginator) {
      this.companyList.paginator.firstPage();
    }
  }

  applyFilterSub(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subDomain.filter = filterValue.trim().toLowerCase();
    if (this.subDomain.paginator) {
      this.subDomain.paginator.firstPage();
    }
  }


  viewDomain(val): void {
    const obj = {
      isublistid: +val?.isublistid,
      count: 29415,
      page: 1,
    };
    this.http.postToken(`/analyze/getsubdomains`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.domain = val;
        this.domainList = new MatTableDataSource(data?.data?.data);
        this.domainList.paginator = this.paginator.toArray()[1];
        this.domainList.sort = this.sort.toArray()[1];
        this.showCompany = false;
      } else {
        this.domainList = [];
      }
    });
  }

  viewCustomerDomain(): void {
    const obj = {
      customer_id: +this.pspCustomerDetails?.customerid?.cusid,
      count: 29415,
      page: 1,
    };
    this.http.postToken(`/analyze/get-customer-subdomain`, obj).subscribe(data => {
      if (data[`success`] === true) {
        // this.domain = val;
        this.domainList = new MatTableDataSource(data?.data?.data);
        this.domainList.paginator = this.paginator.toArray()[1];
        this.domainList.sort = this.sort.toArray()[1];
        this.showCompany = false;
      } else {
        this.domainList = [];
      }
    });
  }

  refreshDomain(): void {
    if (this.userDetails.idendifier === 'CUSTOMER') {
      this.viewCustomerDomain();
    } else {
      this.viewDomain(this.domain);
    }
  }


  viewsubdomaininfo(eve) {
    const obj = {
      isublistdtlsid: eve.isublistdtlsid,
    };
    this.http.postToken(`/analyze/subdomain-info`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.subDomain = eve;
        if (data?.data?.domain_info?.length !== 0) {
          this.subDomainList = new MatTableDataSource(data?.data?.domain_info);
          this.subDomainList.paginator = this.paginator.toArray()[2];
          this.subDomainList.sort = this.sort.toArray()[2];
        } else {
          this.subDomainList = [];
        }
        this.showDomain = false;
      } else {
        this.subDomainList = [];
      }
    });
  }

  back(val): void {
    if (val === 'company') {
      this.showCompany = true;
      this.getUserList();
    } else {
      this.showDomain = true;
    }
  }

  testdomain(val?: any): void {
    const dialogRef = this.dialog.open(SubdomainComponent, {
      width: 'auto',
      height: '70%',
      minWidth: '80%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        Details: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.viewsubdomaininfo(this.subDomain);
    });
  }

  cvelist(val?: any): void {
    const dialogRef = this.dialog.open(SubdomaincveComponent, {
      width: 'auto',
      height: '50%',
      minWidth: '80%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        Details: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.viewsubdomaininfo(this.subDomain);
    });
  }


  selectAnalyseTab(val) {
    if (val?.status === false) {
      val.status = true;
      this.currentTab = val?.name;
      this.tabName.forEach(element => {
        if (element?.name !== val?.name) {
          element.status = false;
        }
      });
    }
  }

  radioChange(eve, val) {
    if (val?.lable === 'Is HIPAA in scope?') {
      if (eve.value === '1') {
        this.privacyStatus.forEach(element => {
          element.status = true;
        });
      } else if (eve.value === '2') {
        this.privacyStatus.forEach(element => {
          if (element?.lable === 'Is there a designated HIPAA Officer?') {
            element.status = false;
          }
          if (element?.lable === 'Select the scope') {
            element.status = false;
          }
          if (element?.lable === 'Is HIPAA training in place?') {
            element.status = false;
          }
        });
      }
    }
  }


}

