import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  userForm: FormGroup;
  userDetails: any;
  groupList: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public http: HttpServiceService,
  ) {
    this.userForm = this.fb.group({
      sname: ['', Validators.required],
      group: ['', Validators.required],
      semailid: ['', Validators.required],
      icontectnumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getGroup();
    if (this.data?.userDetails?.iuserid) {
      this.getUserDetails();
    }
    if (this.data?.name === 'View User') {
      this.userForm.disable();
    }
  }

  getGroup(): void {
    this.http.getToken(`/user-group?count=${4}&page=${1}`).subscribe(data => {
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
        this.userForm.controls.group.patchValue(data?.data?.groups[0]?.iid);
      }
    });
  }

  onboardUser(): void {
    const obj = {
      sname: this.userForm.controls.sname.value,
      semailid: this.userForm.controls.semailid.value,
      iusergroupid: this.userForm.controls.group.value,
      icontectnumber: this.userForm.controls.icontectnumber.value,
    };
    this.http.postToken(`/user-management`, obj).subscribe(data => {
      if (data[`success`] === true) {
        this.dialogRef.close();
      }
    });
  }

}
