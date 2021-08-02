import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { RoleViewComponent } from '../components/role-view/role-view.component';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'role', 'read', 'add', 'edit', 'delete', 'execute', 'schedule', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  roleList: any = [];
  constructor(
    private service: SmartTableData,
    public http: HttpServiceService,
    private dialogService: NbDialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  getRoleList() {

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

}
