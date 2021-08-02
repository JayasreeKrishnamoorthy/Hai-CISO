import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { SmartTableData } from '../../@core/data/smart-table';


@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  settings = {
    hideSubHeader: true,

    // custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }],
    columns: {

      company_name: {
        title: 'Company',
        type: 'string',
      },

      customer: {
        title: 'Customer',
        type: 'string',

      },
      user_group: {
        title: 'User Groub',
        type: 'string',
      },

    },
    actions: {
      // add: false,
      columnTitle: 'Actions',
      edit: false,    // <i class="fad fa-border-all"></i>
      delete: false,
      custom: [
        { name: 'viewrecord', title: '&nbsp;&nbsp;<i class="ion-stats-bars"></i>' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa fa-cog fa-spin  fa-fw"></i>' },
        { name: 'deleterecord', title: '&nbsp;&nbsp;<i class="ion-trash-a"></i>' },
        { name: 'downloadrecord', title: '&nbsp;&nbsp;&nbsp;<i class="ion-arrow-down-a"></i>' },
      ],
      // position: 'right'
    },

  };


  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit(): void {
  }

}
