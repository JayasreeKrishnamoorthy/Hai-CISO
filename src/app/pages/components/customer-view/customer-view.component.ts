import { MapComponent } from './../map/map.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
import { GeoService } from '../../../Services/geo.service';

@Component({
  selector: 'ngx-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  customerForm: FormGroup;
  usergroup: any;
  groupList: any = [];
  selectOption: any = ['yes', 'no'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
    public geo: GeoService,
  ) {
    this.customerForm = this.fb.group({
      iaccountid: ['', Validators.required],
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
      accountstartdate: ['', Validators.required],
      accountenddate: ['', Validators.required],
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
    if (this.data?.customerDetails?.cusid) {
      this.getCustomerDetails();
    }
    if (this.data?.name === 'View Customer') {
      this.customerForm.disable();
    }
  }

  getCustomerDetails() {
    this.http.getToken(`/customer-onboard/${this.data?.customerDetails?.cusid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.customerForm.patchValue(data?.data);
        this.customerForm.patchValue(data?.data?.address);
        this.customerForm.patchValue(data?.data?.contect);
      }
    });
  }


  openMap(): void {
    // let obj;
    // if (myForm?.value?.sHospitalAddress) {
    //   obj = {
    //     address: myForm?.value?.sHospitalAddress,
    //     lat: myForm?.value?.sLat,
    //     long: myForm?.value?.sLong
    //   };
    // }
    const dialogRef = this.dialog.open(MapComponent, {
      width: 'auto',
      height: '50%',
      minWidth: '55%',
      disableClose: true,
      panelClass: 'full-screen-popup',
      data: {
        // addressDetails: obj
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customerForm.controls.address.patchValue('poonamallee');
      this.customerForm.controls.lat.patchValue(13.0473);
      this.customerForm.controls.long.patchValue(80.0945);
      if (result) {
        // myForm.patchValue({
        //   sHospitalAddress: result?.address,
        //   sLat: result?.lat,
        //   sLong: result?.long
        // });
      }
    });
  }



  onboardCustomer(): void {
    if (this.data?.customerDetails?.cusid) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  addCustomer(): void {
    const obj = {
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
      accountstartdate: this.customerForm.controls.accountstartdate.value,
      accountenddate: this.customerForm.controls.accountenddate.value,
      address: this.customerForm.controls.address.value,
      addresstype: this.customerForm.controls.addresstype.value,
      city: this.customerForm.controls.city.value,
      state: this.customerForm.controls.state.value,
      country: this.customerForm.controls.country.value,
      zipcode: this.customerForm.controls.zipcode.value,
      contectnum: this.customerForm.controls.contectnum.value,
      lat: this.customerForm.controls.lat.value,
      long: this.customerForm.controls.long.value,
      landmark: this.customerForm.controls.landmark.value,
      customer_contact_primary: this.customerForm.controls.customer_contact_primary.value,
      customer_contact_secondary: this.customerForm.controls.customer_contact_secondary.value,
      customer_contact_primary_email: this.customerForm.controls.customer_contact_primary_email.value,
      customer_contact_secondary_email: this.customerForm.controls.customer_contact_secondary_email.value,
      customer_contact_primary_phone: this.customerForm.controls.customer_contact_primary_phone.value,
      customer_contact_secondary_phone: this.customerForm.controls.customer_contact_secondary_phone.value,
      customer_contact_primary_designation: this.customerForm.controls.customer_contact_primary_designation.value,
      customer_contact_secondary_designation: this.customerForm.controls.customer_contact_secondary_designation.value,
      isriskTeam: this.customerForm.controls.isriskTeam.value,
    };
    this.http.postToken(`/customer-onboard`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      } else {

      }
      this.geo.openToast(data[`message`]);
    });
  }

  updateCustomer(): void {
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
      accountstartdate: this.customerForm.controls.accountstartdate.value,
      accountenddate: this.customerForm.controls.accountenddate.value,
      address: this.customerForm.controls.address.value,
      addresstype: this.customerForm.controls.addresstype.value,
      city: this.customerForm.controls.city.value,
      state: this.customerForm.controls.state.value,
      country: this.customerForm.controls.country.value,
      zipcode: this.customerForm.controls.zipcode.value,
      contectnum: this.customerForm.controls.contectnum.value,
      lat: this.customerForm.controls.lat.value,
      long: this.customerForm.controls.long.value,
      landmark: this.customerForm.controls.landmark.value,
      customer_contact_primary: this.customerForm.controls.customer_contact_primary.value,
      customer_contact_secondary: this.customerForm.controls.customer_contact_secondary.value,
      customer_contact_primary_email: this.customerForm.controls.customer_contact_primary_email.value,
      customer_contact_secondary_email: this.customerForm.controls.customer_contact_secondary_email.value,
      customer_contact_primary_phone: this.customerForm.controls.customer_contact_primary_phone.value,
      customer_contact_secondary_phone: this.customerForm.controls.customer_contact_secondary_phone.value,
      customer_contact_primary_designation: this.customerForm.controls.customer_contact_primary_designation.value,
      customer_contact_secondary_designation: this.customerForm.controls.customer_contact_secondary_designation.value,
      isriskTeam: this.customerForm.controls.isriskTeam.value,
    };
    this.http.putToken(`/customer-onboard`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      }
      this.geo.openToast(data[`message`]);
    });
  }

}

