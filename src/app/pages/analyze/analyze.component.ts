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
  displayedColumns: string[] = ['sNo', 'name', 'url', 'action'];
  displayedColumnsSub: string[] = ['sNo', 'url', 'test', 'cve', 'action'];
  displayedColumnsSubdomain: string[] = ['sNo', 'url', 'test', 'cve'];

  @Input()selectedIndex: number | null
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  domainList: any = [];
  subDomain: any = [];
  showDomain = 'domain';
  domain: any;
  companys = true   // changed   //testssl_output //cve_list
  domainin=true
  companyy=false
  companyname:any
  constructor(
    public http: HttpServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  refreshDomain(): void {
    this.getUserList();
  }

  getUserList() {
    this.http.getToken(`/analyze?count=${100}&page=${1}`).subscribe(data => {
      if (data[`success`] === true) {
        this.domainList = new MatTableDataSource(data?.data?.data);
        this.domainList.paginator = this.paginator.toArray()[0];
        this.domainList.sort = this.sort.toArray()[0];
      } else {
        this.domainList = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.domainList.filter = filterValue.trim().toLowerCase();
    if (this.domainList.paginator) {
      this.domainList.paginator.firstPage();
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
    this.companys=false
    this.companyy=true
    this.companyname=val.scompanyname
    
    const obj = {
      isublistid: +val?.isublistid,
      count: 100,
      page: 1,
    };
    console.log(obj)
    this.http.postToken(`/analyze/getsubdomains`, obj).subscribe(data => {
     
      if (data[`success`] === true) {
        this.domain = val;
        this.subDomain = new MatTableDataSource(data?.data?.data);
        this.subDomain.paginator = this.paginator.toArray()[1];
        this.subDomain.sort = this.sort.toArray()[1];
        this.showDomain = 'subdomain';
      } else {
        this.subDomain = [];
      }
    });
  }

  back(): void {
    this.showDomain = 'domain';
    this.getUserList();
  }

  viewsubdomaininfo(eve){
    console.log(eve)
    this.companys=false
    this.domainin=false
    this.companyy=true
    const obj ={
      isublistdtlsid: eve.isublistdtlsid
    }
    this.http.postToken(`/analyze/subdomain-info`, obj).subscribe(data => {
      console.log(data)
      if (data[`success`] === true) {
         this.domain = eve;
         this.subDomain = new MatTableDataSource(data?.data?.domain_info);
         this.subDomain.paginator = this.paginator.toArray()[1];
         this.subDomain.sort = this.sort.toArray()[1];
        this.showDomain = 'domain';
      } else {
         this.subDomain = [];
      }
    });
  }


  

  testdomain( val?: any): void {
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
      this.viewsubdomaininfo(this.domain);
    });
  }

  cvelist( val?: any): void {
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
      this.viewsubdomaininfo(this.domain);
    });
  }



}
