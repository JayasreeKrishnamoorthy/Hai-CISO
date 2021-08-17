import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeoService } from '../../Services/geo.service';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UtilityService } from '../../Services/utility.service';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { CustomerViewComponent } from '../components/customer-view/customer-view.component';


@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'email', 'contact', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  customerList: any;
  userDetails: any;
  customerCount: any;
  listCount = 100;
  nextPage = 0;

  constructor(
    public http: HttpServiceService,
    public utility: UtilityService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.getCustomerList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getCustomerList() {
    this.utility.showloader();
    this.http.getToken(`/customer-onboard`).subscribe(data => {
      if (data[`success`] === true) {
        this.customerList = new MatTableDataSource(data?.data);
        this.customerList.paginator = this.paginator;
        this.customerList.sort = this.sort;
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      } else {
        this.customerList = [];
      }
      this.utility.dismissloader();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerList.filter = filterValue.trim().toLowerCase();
    if (this.customerList.paginator) {
      this.customerList.paginator.firstPage();
    }
  }

  paginationEvent(eve) {
    // tslint:disable-next-line:no-console
    console.log('eve', eve);
    if (eve.pageIndex > this.nextPage) {
      // tslint:disable-next-line:no-console
      console.log('this.customerCount', this.customerCount);
      if (this.customerCount > this.listCount) {
        // this.listCount = this.listCount + 100;
        // this.getCustomerList();
      }
    } else {
      if (this.listCount > 100) {
        // this.listCount = this.listCount - 100;
        // this.getCustomerList();
      }
    }
  }

  addRequest(name: any, val?: any): void {
    const dialogRef = this.dialog.open(CustomerViewComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        name,
        customerDetails: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomerList();
    });
  }


  confirmation(val: any): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '35%',
      disableClose: true,
      panelClass: '',
      data: {
        message: 'Are you sure, you want to delete this Customer ?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteCustomer(val);
      }
    });
  }

  deleteCustomer(val: any): void {
    this.utility.showloader();
    this.http.delToken(`/customer-onboard/${val?.cusid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.getCustomerList();
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
      this.utility.openToast(data[`message`]);
      this.utility.dismissloader();
    });
  }


}
