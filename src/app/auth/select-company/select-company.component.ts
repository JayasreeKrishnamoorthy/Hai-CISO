import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss'],
})
export class SelectCompanyComponent implements OnInit {
  company: any = [
    {
      name: 'PSPADMIN',
    },
    {
      name: 'PSP USER',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
