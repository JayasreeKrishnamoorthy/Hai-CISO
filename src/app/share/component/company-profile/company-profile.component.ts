import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
import { UtilityService } from '../../../Services/utility.service';
import { CustomerAddressComponent } from '../customer-address/customer-address.component';

@Component({
  selector: 'ngx-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  profileData: any;
  customerAddressList: any;
  step: any = 1;
  @ViewChild(CustomerAddressComponent, { static: false }) public myChild: CustomerAddressComponent;

  constructor(
    public http: HttpServiceService,
    public utility: UtilityService,
  ) { }

  ngOnInit(): void {
  }

  stepControl(val) {
    this.step = val;
  }

  getCustomerProfile(val) {
    this.http.get(`/customer-onboard/${val}`).subscribe(data => {
      if (data[`success`] === true) {
        this.profileData = data?.data;
        this.getAddress(val);
      }
    });
  }

  getAddress(val) {
    const obj = {
      id: val,
      count: 100,
      page: 1,
    };
    this.http.postToken(`/customer-onboard/get-customer-address`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.customerAddressList = data?.data?.data;
        this.myChild.getAddressList(this.customerAddressList);
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      } else {
        this.customerAddressList = [];
        this.myChild.getAddressList(this.customerAddressList);
      }
    });
  }

}
