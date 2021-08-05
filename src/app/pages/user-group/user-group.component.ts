import { UserGroupViewComponent } from './../components/user-group-view/user-group-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { UserViewComponent } from '../components/user-view/user-view.component';
import { GeoService } from '../../Services/geo.service';

@Component({
  selector: 'ngx-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'name', 'role', 'created', 'createdBy', 'modified', 'modifiedBy', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  userGroupList: any = [];

  constructor(
    public http: HttpServiceService,
    public geo: GeoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUserGroupList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getUserGroupList() {
    this.http.getToken(`/user-group?count=${100}&page=${1}`).subscribe(data => {
      if (data[`success`] === true) {
        this.userGroupList = new MatTableDataSource(data?.data?.data);
        this.userGroupList.paginator = this.paginator;
        this.userGroupList.sort = this.sort;
      } else {
        this.userGroupList = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userGroupList.filter = filterValue.trim().toLowerCase();
    if (this.userGroupList.paginator) {
      this.userGroupList.paginator.firstPage();
    }
  }

  addRequest(name: any, val?: any): void {
    const dialogRef = this.dialog.open(UserGroupViewComponent, {
      width: 'auto',
      height: '60%',
      minWidth: '45%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        name,
        userGroupDetails: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserGroupList();
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
        message: 'Are you sure, you want to delete this User Group ?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteUser(val);
      }
    });
  }

  deleteUser(val: any): void {
    this.http.delToken(`/user-group/${val?.iid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.getUserGroupList();
      }
      this.geo.openToast(data[`message`]);
    });
  }

}
