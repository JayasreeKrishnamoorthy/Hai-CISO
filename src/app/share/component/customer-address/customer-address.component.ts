import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ngx-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
})
export class CustomerAddressComponent implements OnInit {
  displayedColumnsAddress: string[] = ['address', 'addressType', 'country', 'state', 'city', 'zipCode', 'landMark', 'contact'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  addressListTable: any;
  @Input() addressList: any;
  constructor() {
  }

  ngOnInit(): void {
  }

  getAddressList(val): void {
    this.addressListTable = new MatTableDataSource(val);
    this.addressListTable.paginator = this.paginator;
    this.addressListTable.sort = this.sort;
  }

  applyFilterAddress(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.addressListTable.filter = filterValue.trim().toLowerCase();
    if (this.addressListTable.paginator) {
      this.addressListTable.paginator.firstPage();
    }
  }

}
