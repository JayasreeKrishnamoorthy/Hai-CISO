import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GeoService } from '../../../Services/geo.service';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'ngx-user-group-view',
  templateUrl: './user-group-view.component.html',
  styleUrls: ['./user-group-view.component.scss'],
})
export class UserGroupViewComponent implements OnInit {
  userForm: FormGroup;
  roleList: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserGroupViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
    public utility: UtilityService,
  ) {
    this.userForm = this.fb.group({
      usergroupname: ['', Validators.required],
      roleid: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRole();
    if (this.data?.userGroupDetails?.iid) {
      this.getUserDetails();
    }
    if (this.data?.name === 'View User Group') {
      this.userForm.disable();
    }
  }

  getRole(): void {
    this.http.getToken(`/roles`).subscribe(data => {
      if (data[`success`] === true) {
        this.roleList = data?.data;
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      } else {
        this.roleList = [];
      }
    });
  }

  getUserDetails() {
    this.utility.showloader();
    this.http.getToken(`/user-group/${this.data?.userGroupDetails?.iid}`).subscribe(data => {
      if (data[`success`] === true) {
        this.userForm.controls.usergroupname.patchValue(data?.data?.susergroupname);
        const obj = {
          iid: data?.data?.iroleid?.iid,
          srolename: data?.data?.iroleid?.srolename,
        };
        this.roleList.push(obj);
        this.userForm.controls.roleid.patchValue(data?.data?.iroleid?.iid);
      } else if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
      this.utility.dismissloader();
    });
  }

  onboardUser(): void {
    if (this.data?.userGroupDetails?.iid) {
      this.updateUserGroup();
    } else {
      this.addUserGroup();
    }
  }

  addUserGroup(): void {
    this.utility.showloader();
    const obj = {
      usergroupname: this.userForm.controls.usergroupname.value,
      roleid: this.userForm.controls.roleid.value,
    };
    this.http.postToken(`/user-group`, obj).subscribe(data => {
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

  updateUserGroup(): void {
    this.utility.showloader();
    const obj = {
      id: this.data?.userGroupDetails?.iid,
      usergroupname: this.userForm.controls.usergroupname.value,
      roleid: this.userForm.controls.roleid.value,
    };
    this.http.putToken(`/user-group`, obj).subscribe(data => {
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
