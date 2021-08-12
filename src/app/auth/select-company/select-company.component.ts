import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datum, SelectCompany, UserGroupID } from '../../Responses/select-companies';
import { HttpServiceService } from '../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss'],
})
export class SelectCompanyComponent implements OnInit {
  company: any = [
    // {
    //   name: 'PSPADMIN',
    // },
    // {
    //   name: 'PSP USER',
    // },
  ];


  constructor(
    private httpService: HttpServiceService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.companieslist();
  }

  companieslist(): void {
    this.httpService.getcompanies().subscribe((res) => {
      if (res['success'] === true) {
        this.company = res?.data.map((d: any) => {
          return { name: d.userGroupId.susergroupname, id: d.userGroupId.iid, customerid: d.userGroupId.customerid };
        });
      }
    },
    ); (err) => {
    };
  }


  movetodashboard(company) {
    localStorage.setItem('PSPCUSTOMER', JSON.stringify(company));
    this.router.navigate(['/pages']);
  }

}
