import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GeoService } from '../../../Services/geo.service';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
@Component({
  selector: 'ngx-subdomaincve',
  templateUrl: './subdomaincve.component.html',
  styleUrls: ['./subdomaincve.component.scss'],
})
export class SubdomaincveComponent implements OnInit {
  displayedColumns: string[] = ['ip', 'port', 'id', 'cve', 'cwe', 'finding', 'severity'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  List: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubdomaincveComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
    public geo: GeoService) { }

  ngOnInit(): void {
    if (this.data.Details?.length !== 0) {
      this.List = new MatTableDataSource(this.data.Details);
      this.List.paginator = this.paginator;
      this.List.sort = this.sort;
    } else {
      this.List = [];
    }
  }

  refresh() {
    this.ngOnInit();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.List.filter = filterValue.trim().toLowerCase();
    if (this.List.paginator) {
      this.List.paginator.firstPage();
    }
  }
}
