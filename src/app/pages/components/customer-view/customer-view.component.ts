import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  userForm: FormGroup;
  usergroup: any;
  groupList: any = [];
  groupId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
  ) {
    this.userForm = this.fb.group({
      accountId: ['', Validators.required],
      companyName: ['', Validators.required],
      businessUnit: ['', Validators.required],
      noOfEmp: ['', Validators.required],
      publicTradedComp: ['', Validators.required],
      governmentOwned: ['', Validators.required],
      annualRevenu: ['', Validators.required],
      saassPlatform: ['', Validators.required],
      cisoPresent: ['', Validators.required],
      noOfSectem: ['', Validators.required],
      cheifPrivacy: ['', Validators.required],
      hippaOffice: ['', Validators.required],
      riseOffice: ['', Validators.required],
      secOperating: ['', Validators.required],
      usPresence: ['', Validators.required],
      emeaPresence: ['', Validators.required],
      apacPresence: ['', Validators.required],
      latmPresence: ['', Validators.required],
      chinaPresence: ['', Validators.required],
      papAccount: ['', Validators.required],
      isActive1: ['', Validators.required],
      userId: ['', Validators.required],
      addressType: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      contactNo: ['', Validators.required],
      latitude: ['', Validators.required],
      logitude: ['', Validators.required],
      landMark: ['', Validators.required],
      isActive2: ['', Validators.required],
      userId2: ['', Validators.required],
      contactPrimary: ['', Validators.required],
      contactSecondary: ['', Validators.required],
      emailPrimary: ['', Validators.required],
      emailSecondary: ['', Validators.required],
      telephonePrimary: ['', Validators.required],
      designationPrimary: ['', Validators.required],
      designationSecondary: ['', Validators.required],
      isActive3: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getGroup();
    if (this.data?.userDetails?.iuserid) {
      this.userForm.controls?.accountLock.patchValue(false);
      this.userForm.controls?.resetpass.patchValue(false);
      this.getUserDetails();
    }
    if (this.data?.name === 'View User') {
      this.userForm.disable();
    }
  }

  getGroup(): void {
    this.http.getToken(`/user-group`).subscribe(data => {
      if (data[`success`] === true) {
        this.groupList = data?.data?.data;
      } else {
        this.groupList = [];
      }
    });
  }

  getUserDetails() {
    const obj = {
      id: this.data?.userDetails?.iuserid,
    };
    this.http.postToken(`/user-management/geteachuserinfo`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.userForm.patchValue(data?.data);
        // tslint:disable-next-line:no-console
        console.log('data?.data?.groups[0]?.iid', data?.data?.groups[0]?.userGroupId?.iid);
        this.userForm.controls.group.patchValue(data?.data?.groups[0]?.userGroupId?.iid);
        this.groupId = data?.data?.groups[0]?.userGroupId?.iid;
      }
    });
  }

  onboardUser(): void {
    if (this.data?.userDetails?.iuserid) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    const obj = {
      sname: this.userForm.controls.sname.value,
      semailid: this.userForm.controls.semailid.value,
      iusergroupid: this.userForm.controls.group.value,
      icontectnumber: this.userForm.controls.icontectnumber.value,
    };
    this.http.postToken(`/user-management`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      } else {

      }
    });
  }

  updateUser(): void {
    const obj = {
      sname: this.userForm.controls.sname.value,
      semailid: this.userForm.controls.semailid.value,
      iusergroupid: this.userForm.controls.group.value,
      icontectnumber: this.userForm.controls.icontectnumber.value,
      accountLock: this.userForm.controls.accountLock.value,
      resetpass: this.userForm.controls.resetpass.value,
      id: this.data?.userDetails?.iuserid,
    };
    if (this.userForm.controls.group.value !== this.groupId) {
      obj[`old_group_id`] = this.groupId;
    } else {
      obj[`old_group_id`] = this.usergroup;
    }
    this.http.putToken(`/user-management`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      }
    });
  }

}
