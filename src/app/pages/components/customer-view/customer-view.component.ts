import { MapComponent } from './../map/map.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
import { GeoService } from '../../../Services/geo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'ngx-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  customerForm: FormGroup;
  addressForm: FormGroup;
  usergroup: any;
  groupList: any = [];
  selectOption: any = ['yes', 'no', 'partial', 'not applicable', 'don\'t know'];
  companyType: any = ['entity', 'individual'];
  displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  addressList: any = [];
  addressId: any = 0;
  addressListTable: any;
  editAddBtn = false;
  step = 1;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  countryName: any;
  stateName: any;
  countrySearch: any;
  stateSearch: any;
  citySearch: any;
  editAddressInfo: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
    public utility: UtilityService,
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      addresstype: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      contectnum: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      landmark: ['', Validators.required],
      cusaddid: [''],
    });
    this.customerForm = this.fb.group({
      iaccountid: [''],
      scompanyname: ['', Validators.required],
      scompanytype: ['', Validators.required],
      sbusinessunti: ['', Validators.required],
      snumofemployee: ['', Validators.required],
      ispublictradedcomp: ['', Validators.required],
      isgovowned: ['', Validators.required],
      dannualrevenue: ['', Validators.required],
      issaasappplatform: ['', Validators.required],
      iscisopresent: ['', Validators.required],
      noofsectemmember: ['', Validators.required],
      ischeifprivacyofficer: ['', Validators.required],
      ishipaaofficer: ['', Validators.required],
      isriskofficer: ['', Validators.required],
      issecopsteam: ['', Validators.required],
      isuspresence: ['', Validators.required],
      isemeapresence: ['', Validators.required],
      isapacpresence: ['', Validators.required],
      islatmpresence: ['', Validators.required],
      ischinapresence: ['', Validators.required],
      ipspacctexec: ['', Validators.required],
      isriskTeam: ['', Validators.required],
      website_url: ['', Validators.required],
      accountstartdate: ['', Validators.required],
      accountenddate: ['', Validators.required],
      // address: ['', Validators.required],
      // addresstype: ['', Validators.required],
      // city: ['', Validators.required],
      // state: ['', Validators.required],
      // country: ['', Validators.required],
      // zipcode: ['', Validators.required],
      // contectnum: ['', Validators.required],
      // lat: ['', Validators.required],
      // long: ['', Validators.required],
      // landmark: ['', Validators.required],
      customer_contect_primary_name: ['', Validators.required],
      customer_contect_secondary_name: ['', Validators.required],
      customer_contact_primary: ['', Validators.required],
      customer_contact_secondary: ['', Validators.required],
      customer_contact_primary_email: ['', Validators.required],
      customer_contact_secondary_email: ['', Validators.required],
      customer_contact_primary_phone: ['', Validators.required],
      customer_contact_secondary_phone: ['', Validators.required],
      customer_contact_primary_designation: ['', Validators.required],
      customer_contact_secondary_designation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCountryList();
    if (this.data?.customerDetails?.cusid) {
      this.getCustomerDetails();
      this.getAddress();
    }
    if (this.data?.name === 'View Customer') {
      this.displayedColumns = [
        // 'sNo',
        'address',
        'addressType',
        'country',
        'state',
        'city',
        'zipCode',
        'landMark',
        'contact',
      ];
      this.customerForm.disable();
    } else {
      this.displayedColumns = [
        // 'sNo',
        'address',
        'addressType',
        'country',
        'state',
        'city',
        'zipCode',
        'landMark',
        'contact',
        'action',
      ];
    }
  }

  getCountryList() {
    this.http.getToken(`/essential/getCountries`).subscribe(data => {
      if (data[`success`] === true) {
        this.countryList = data?.data;
      } else {
        this.countryList = [];
      }
    });
  }

  getStateList(val: any): void {
    const oldCountryName = this.countryName;
    this.countryName = this.countryList.find((x: any) => x.name === val)?.isoCode;
    if (oldCountryName && this.countryName !== oldCountryName) {
      this.addressForm.controls.state.patchValue('');
    }
    // tslint:disable-next-line:no-console
    console.log('state', this.addressForm.controls.state.value);
    this.http.getToken(`/essential/getCountryStates/${this.countryName}`).subscribe(data => {
      if (data[`success`] === true) {
        this.stateList = data?.data;
        if (this.countryName) {
          this.addressForm.controls.state.patchValue(this.addressForm.controls.state.value);
        }
      } else {
        this.stateList = [];
      }
    });
  }

  getCityList(val: any): void {
    const oldStateName = this.stateName;
    this.stateName = this.stateList.find((x: any) => x.name === val)?.isoCode;
    if (oldStateName && this.stateName !== oldStateName) {
      this.addressForm.controls.city.patchValue('');
    }
    this.http.getToken(`/essential/getCityDetails/${this.countryName}/${this.stateName}`).subscribe(data => {
      if (data[`success`] === true) {
        this.cityList = data?.data;
        this.addressForm.controls.city.patchValue(this.addressForm.controls.city.value);
      } else {
        this.cityList = [];
      }
    });
  }

  getCustomerDetails() {
    this.utility.showloader();
    this.http.getToken(`/customer-onboard/${this.data?.customerDetails?.cusid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.customerForm.patchValue(data?.data);
        this.customerForm.controls.scompanytype.patchValue(data?.data?.scompanytype.toLowerCase());
        this.customerForm.patchValue(data?.data?.contect);
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
      this.utility.dismissloader();
    });
  }

  getAddress() {
    const obj = {
      id: this.data?.customerDetails?.cusid,
      count: 100,
      page: 1,
    };
    this.http.postToken(`/customer-onboard/get-customer-address`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.addressList = data?.data?.data;
        this.addressListTable = new MatTableDataSource(this.addressList);
        this.addressListTable.paginator = this.paginator;
        this.addressListTable.sort = this.sort;
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
    });
  }

  stepControl(val) {
    this.step = val;
  }

  pageNavigation(val, step) {
    this.step = step;
  }

  addAddress(form): void {
    this.editAddBtn = false;
    if (this.addressForm.controls.cusaddid.value) {
      if (this.data?.customerDetails?.cusid) {
        this.updateAddress();
      } else {
        const index = this.addressList.findIndex(x => x.cusaddid === this.addressForm.controls.cusaddid.value);
        this.addressList[index] = this.addressForm.value;
      }
    } else {
      if (this.data?.customerDetails?.cusid) {
        this.addCustomerAddress();
      } else {
        this.addressId = this.addressId + 1;
        this.addressForm.controls.cusaddid.patchValue(this.addressId);
        this.addressList.push(this.addressForm.value);
      }
    }
    this.addressListTable = new MatTableDataSource(this.addressList);
    this.addressListTable.paginator = this.paginator;
    this.addressListTable.sort = this.sort;
    form.resetForm();
  }

  updateAddress() {
    this.http.postToken(`/customer-onboard/edit-address`, this.addressForm.value).subscribe(data => {
      this.getAddress();
      if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
    });
  }

  addCustomerAddress() {
    const arr = [];
    delete this.addressForm.value.cusaddid;
    arr.push(this.addressForm.value);
    this.utility.showloader();
    const obj = {
      customer_address: arr,
      cus_id: this.data?.customerDetails?.cusid,
    };
    this.http.postToken(`/customer-onboard/add-customer-address`, obj).subscribe(data => {
      if (data[`success`] === true) {

      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      } else {

      }
      this.utility.showloader();
      this.getAddress();
    });
  }

  editAddress(val) {
    this.editAddBtn = true;
    this.addressForm.patchValue(val);
  }

  confirmation(val: any, index): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '35%',
      disableClose: true,
      panelClass: '',
      data: {
        message: 'Are you sure, you want to delete this Address ?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        if (this.data?.customerDetails?.cusid) {
          this.deleteCustomerAddress(val);
        } else {
          this.deleteAddress(val, index);
        }
      }
    });
  }

  deleteAddress(val, index) {
    this.addressList.splice(index, 1);
    this.addressListTable = new MatTableDataSource(this.addressList);
    this.addressListTable.paginator = this.paginator;
    this.addressListTable.sort = this.sort;
  }

  deleteCustomerAddress(val) {
    this.utility.showloader();
    this.http.delToken(`/customer-onboard/delete-address/${val?.cusaddid}`).subscribe(data => {
      if (data[`success`] === true) {

      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      } else {

      }
      this.getAddress();
      this.utility.openToast(data[`message`]);
      this.utility.dismissloader();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.addressListTable.filter = filterValue.trim().toLowerCase();
    if (this.addressListTable.paginator) {
      this.addressListTable.paginator.firstPage();
    }
  }


  openMap(): void {
    let obj;
    if (this.editAddBtn === true) {
      obj = {
        address: this.addressForm.controls.address.value,
        lat: this.addressForm.controls.lat.value,
        long: this.addressForm.controls.long.value,
      };
    }
    const dialogRef = this.dialog.open(MapComponent, {
      width: 'auto',
      height: '70%',
      minWidth: '55%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        addressDetails: obj,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // tslint:disable-next-line:no-console
        console.log('result', result);
        this.addressForm.controls.address.patchValue(result?.address);
        this.addressForm.controls.lat.patchValue(result?.lat);
        this.addressForm.controls.long.patchValue(result?.long);
      }
    });
  }


  searchFilter(eve: any, val: any): void {
    if (val === 'country') {
      this.countrySearch = eve.target.value;
    } else if (val === 'state') {
      this.stateSearch = eve.target.value;
    } else if (val === 'city') {
      this.citySearch = eve.target.value;
    }
  }

  selectPanelOpen(): void {
    this.countrySearch = '';
    this.stateSearch = '';
    this.citySearch = '';
  }

  onboardCustomer(): void {
    if (this.data?.customerDetails?.cusid) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  addCustomer(): void {

    const arr = [];

    this.addressList.forEach(element => {
      delete element.cusaddid;
      arr.push(element);
    });

    if (this.addressList?.length !== 0 && arr?.length !== 0) {
      this.utility.showloader();
      const obj = {
        // iaccountid: +this.customerForm.controls.iaccountid.value,
        iaccountid: 1002,
        scompanyname: this.customerForm.controls.scompanyname.value,
        scompanytype: this.customerForm.controls.scompanytype.value,
        sbusinessunti: this.customerForm.controls.sbusinessunti.value,
        snumofemployee: this.customerForm.controls.snumofemployee.value,
        ispublictradedcomp: this.customerForm.controls.ispublictradedcomp.value,
        isgovowned: this.customerForm.controls.isgovowned.value,
        dannualrevenue: this.customerForm.controls.dannualrevenue.value,
        issaasappplatform: this.customerForm.controls.issaasappplatform.value,
        iscisopresent: this.customerForm.controls.iscisopresent.value,
        noofsectemmember: this.customerForm.controls.noofsectemmember.value,
        ischeifprivacyofficer: this.customerForm.controls.ischeifprivacyofficer.value,
        ishipaaofficer: this.customerForm.controls.ishipaaofficer.value,
        isriskofficer: this.customerForm.controls.isriskofficer.value,
        issecopsteam: this.customerForm.controls.issecopsteam.value,
        isuspresence: this.customerForm.controls.isuspresence.value,
        isemeapresence: this.customerForm.controls.isemeapresence.value,
        isapacpresence: this.customerForm.controls.isapacpresence.value,
        islatmpresence: this.customerForm.controls.islatmpresence.value,
        ischinapresence: this.customerForm.controls.ischinapresence.value,
        ipspacctexec: +this.customerForm.controls.ipspacctexec.value,
        website_url: this.customerForm.controls.website_url.value,
        accountstartdate: this.customerForm.controls.accountstartdate.value,
        accountenddate: this.customerForm.controls.accountenddate.value,
        // address: this.customerForm.controls.address.value,
        // addresstype: this.customerForm.controls.addresstype.value,
        // city: this.customerForm.controls.city.value,
        // state: this.customerForm.controls.state.value,
        // country: this.customerForm.controls.country.value,
        // zipcode: this.customerForm.controls.zipcode.value,
        // contectnum: this.customerForm.controls.contectnum.value,
        // lat: this.customerForm.controls.lat.value,
        // long: this.customerForm.controls.long.value,
        // landmark: this.customerForm.controls.landmark.value,
        customer_contect_primary_name: this.customerForm.controls.customer_contect_primary_name.value,
        customer_contect_secondary_name: this.customerForm.controls.customer_contect_secondary_name.value,
        customer_contact_primary: this.customerForm.controls.customer_contact_primary.value,
        customer_contact_secondary: this.customerForm.controls.customer_contact_secondary.value,
        customer_contact_primary_email: this.customerForm.controls.customer_contact_primary_email.value,
        customer_contact_secondary_email: this.customerForm.controls.customer_contact_secondary_email.value,
        customer_contact_primary_phone: this.customerForm.controls.customer_contact_primary_phone.value,
        customer_contact_secondary_phone: this.customerForm.controls.customer_contact_secondary_phone.value,
        customer_contact_primary_designation: this.customerForm.controls.customer_contact_primary_designation.value,
        customer_contact_secondary_designation: this.customerForm.controls.customer_contact_secondary_designation.value,
        isriskTeam: this.customerForm.controls.isriskTeam.value,
        customer_address: this.addressList,
      };
      this.http.postToken(`/customer-onboard`, obj).subscribe(data => {
        if (data[`success`] === true) {
          this.dialogRef.close();
        } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
          this.utility.openToast(data[`message`]);
          this.utility.logOut();
        } else {

        }
        this.utility.openToast(data[`message`]);
        this.utility.dismissloader();
      });
    } else {
      this.utility.openToast('Please add customer address!');
    }
  }

  updateCustomer(): void {
    this.utility.showloader();
    const obj = {
      id: this.data?.customerDetails?.cusid,
      iaccountid: +this.customerForm.controls.iaccountid.value,
      scompanyname: this.customerForm.controls.scompanyname.value,
      scompanytype: this.customerForm.controls.scompanytype.value,
      sbusinessunti: this.customerForm.controls.sbusinessunti.value,
      snumofemployee: this.customerForm.controls.snumofemployee.value,
      ispublictradedcomp: this.customerForm.controls.ispublictradedcomp.value,
      isgovowned: this.customerForm.controls.isgovowned.value,
      dannualrevenue: this.customerForm.controls.dannualrevenue.value,
      issaasappplatform: this.customerForm.controls.issaasappplatform.value,
      iscisopresent: this.customerForm.controls.iscisopresent.value,
      noofsectemmember: this.customerForm.controls.noofsectemmember.value,
      ischeifprivacyofficer: this.customerForm.controls.ischeifprivacyofficer.value,
      ishipaaofficer: this.customerForm.controls.ishipaaofficer.value,
      isriskofficer: this.customerForm.controls.isriskofficer.value,
      issecopsteam: this.customerForm.controls.issecopsteam.value,
      isuspresence: this.customerForm.controls.isuspresence.value,
      isemeapresence: this.customerForm.controls.isemeapresence.value,
      isapacpresence: this.customerForm.controls.isapacpresence.value,
      islatmpresence: this.customerForm.controls.islatmpresence.value,
      ischinapresence: this.customerForm.controls.ischinapresence.value,
      ipspacctexec: +this.customerForm.controls.ipspacctexec.value,
      website_url: this.customerForm.controls.website_url.value,
      accountstartdate: this.customerForm.controls.accountstartdate.value,
      accountenddate: this.customerForm.controls.accountenddate.value,
      // address: this.customerForm.controls.address.value,
      // addresstype: this.customerForm.controls.addresstype.value,
      // city: this.customerForm.controls.city.value,
      // state: this.customerForm.controls.state.value,
      // country: this.customerForm.controls.country.value,
      // zipcode: this.customerForm.controls.zipcode.value,
      // contectnum: this.customerForm.controls.contectnum.value,
      // lat: this.customerForm.controls.lat.value,
      // long: this.customerForm.controls.long.value,
      // landmark: this.customerForm.controls.landmark.value,
      customer_contect_primary_name: this.customerForm.controls.customer_contect_primary_name.value,
      customer_contect_secondary_name: this.customerForm.controls.customer_contect_secondary_name.value,
      customer_contact_primary: this.customerForm.controls.customer_contact_primary.value,
      customer_contact_secondary: this.customerForm.controls.customer_contact_secondary.value,
      customer_contact_primary_email: this.customerForm.controls.customer_contact_primary_email.value,
      customer_contact_secondary_email: this.customerForm.controls.customer_contact_secondary_email.value,
      customer_contact_primary_phone: this.customerForm.controls.customer_contact_primary_phone.value,
      customer_contact_secondary_phone: this.customerForm.controls.customer_contact_secondary_phone.value,
      customer_contact_primary_designation: this.customerForm.controls.customer_contact_primary_designation.value,
      customer_contact_secondary_designation: this.customerForm.controls.customer_contact_secondary_designation.value,
      isriskTeam: this.customerForm.controls.isriskTeam.value,
      // customer_address: this.addressList,
    };
    this.http.putToken(`/customer-onboard`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
      this.utility.openToast(data[`message`]);
      this.utility.dismissloader();
    });
  }

}

