import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from '../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})
export class AnalyzeComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'name', 'url', 'action'];
  displayedColumnsSub: string[] = ['sNo', 'url', 'test', 'cve', 'action'];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  domainList: any = [];
  subDomain: any = [];
  showDomain = 'domain';
  domain: any;
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
    const obj = {
      isublistid: +val?.isublistid,
      count: 100,
      page: 1,
    };
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

}
