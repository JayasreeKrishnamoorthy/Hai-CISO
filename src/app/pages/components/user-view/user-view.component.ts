import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GeoService } from '../../../Services/geo.service';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'ngx-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  userForm: FormGroup;
  usergroup: any;
  groupList: any = [];
  groupId: any;
  userDetails: any;
  pspCustomerDetails: any;
  accountUnlock: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
    public utility: UtilityService,
  ) {
    this.userForm = this.fb.group({
      sname: ['', Validators.required],
      group: ['', Validators.required],
      semailid: ['', Validators.required],
      icontectnumber: ['', Validators.required],
      accountLock: [''],
      resetpass: [''],
    });
  }

  ngOnInit(): void {

    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.pspCustomerDetails = localStorage.getItem('PSPCUSTOMER');
    this.pspCustomerDetails = JSON.parse(this.pspCustomerDetails);

    if (this.userDetails.idendifier === 'CUSTOMER') {
      this.getCusUserGroupList();  // For Customer
    } else {
      this.getAdminUserGroupList();   // For PSP
    }

    // this.getGroup();
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
        this.groupList = data?.data;
      } else {
        this.groupList = [];
      }
    });
  }

  getAdminUserGroupList() {
    this.http.postToken(`/user-group/admin`).subscribe(data => {
      if (data[`success`] === true) {
        this.groupList = data?.data;
      } else {
        this.groupList = [];
      }
    });
  }

  getCusUserGroupList() {
    const obj = {
      customerid: +this.pspCustomerDetails?.customerid?.cusid,
    };
    this.http.postToken(`/user-group/customer`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.groupList = data?.data;
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
        this.accountUnlock = data?.data?.userdtls?.baccountlocked;
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
      this.utility.openToast(data[`message`]);
    });
  }

  updateUser(): void {
    const obj = {
      sname: this.userForm.controls.sname.value,
      semailid: this.userForm.controls.semailid.value,
      icontectnumber: this.userForm.controls.icontectnumber.value,
      accountLock: this.userForm.controls.accountLock.value,
      resetpass: this.userForm.controls.resetpass.value,
      id: this.data?.userDetails?.iuserid,
    };
    if (this.userForm.controls.group.value !== this.groupId) {
      obj[`old_group_id`] = this.groupId;
      obj[`iusergroupid`] = this.userForm.controls.group.value;
    } else {
      obj[`old_group_id`] = this.userForm.controls.group.value;
    }
    this.http.putToken(`/user-management`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      }
      this.utility.openToast(data[`message`]);
    });
  }

}
