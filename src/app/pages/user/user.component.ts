import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UserViewComponent } from '../components/user-view/user-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';


@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {


  displayedColumns: string[] = ['sNo', 'name', 'contact', 'mail', 'userGroup', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  userList: any = [];
  userDetails: any;

  constructor(
    private service: SmartTableData,
    public http: HttpServiceService,
    private dialogService: NbDialogService,
    public dialog: MatDialog,
  ) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.getUserList();
  }

  getUserList() {
    this.http.getToken(`/user-management?count=${100}&page=${1}`).subscribe(data => {
      if (data[`success`] === true) {
        this.userList = new MatTableDataSource(data?.data?.data);
        this.userList.paginator = this.paginator;
        this.userList.sort = this.sort;
      } else {
        this.userList = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
    if (this.userList.paginator) {
      this.userList.paginator.firstPage();
    }
  }

  addRequest(name: any, val?: any): void {
    const dialogRef = this.dialog.open(UserViewComponent, {
      width: 'auto',
      height: '60%',
      minWidth: '55%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        name,
        userDetails: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  confirmation(val: any): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '35%',
      disableClose: true,
      panelClass: '',
      data: {
        message: 'Are you sure, you want to delete this User ?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteUser(val);
      }
    });
  }

  deleteUser(val: any): void {
    this.http.delToken(`/user-management/${val?.iuserid}`).subscribe(data => {
      this.getUserList();
    });
  }




}
