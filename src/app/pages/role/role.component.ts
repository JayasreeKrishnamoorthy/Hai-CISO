import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../@core/data/smart-table';
import { Roles } from '../../Responses/usr-management';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { RoleViewComponent } from '../components/role-view/role-view.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { GeoService } from '../../Services/geo.service';
import { UtilityService } from '../../Services/utility.service';
@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['role', 'read', 'add', 'edit', 'delete', 'execute', 'schedule', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  roleList: any;
  constructor(
    private service: SmartTableData,
    public http: HttpServiceService,
    private dialogService: NbDialogService,
    public dialog: MatDialog,
    public router: Router,
    private httpService: HttpServiceService,
    public utility: UtilityService,
  ) { }

  ngOnInit(): void {
    this.getRoleList();
  }

  refresh(): void {
    this.ngOnInit();
  }


  addRequest(name: any, val?: any): void {
    const dialogRef = this.dialog.open(RoleViewComponent, {
      width: 'auto',
      height: '60%',
      minWidth: '60%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        name,
        roleDetails: val,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRoleList();
    });
  }


  getRoleList(): void {
    this.httpService.getRoles(`/roles`).subscribe(res => {
      if (res[`success`] === true) {
        this.roleList = new MatTableDataSource(res?.data);
        this.roleList.paginator = this.paginator;
        this.roleList.sort = this.sort;
      } else {
        this.roleList = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleList.filter = filterValue.trim().toLowerCase();
    if (this.roleList.paginator) {
      this.roleList.paginator.firstPage();
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
        message: 'Are you sure, you want to delete this Role ?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteRole(val);
      }
    });
  }


  deleteRole(val: any): void {
    this.http.delToken(`/roles/${val?.iid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.getRoleList();
      }
      this.utility.openToast(data[`message`]);
    });
  }

}
