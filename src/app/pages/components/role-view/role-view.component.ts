import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.scss'],
})
export class RoleViewComponent implements OnInit {
  roleForm: FormGroup;
  userDetails: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoleViewComponent>,
    public fb: FormBuilder,
    public dialog: MatDialog,public http: HttpServiceService,
  ) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      read: [''],
      add: [''],
      edit: [''],
      delete: [''],
      execute: [''],
      schedule: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.data)
    this.getroles(this.data?.roleDetails?.iid);
    if (this.data?.roleDetails?.iid) {
      // this.roleForm.controls?.accountLock.patchValue(false);
      // this.roleForm.controls?.resetpass.patchValue(false);
      // this.getUserDetails();
    }
    if (this.data?.name === 'View User') {
      this.roleForm.disable();
    }
  }


  
  getroles(id): void {
    this.http.getToken(`/roles/${id}`).subscribe(data => {
      console.log(data)
      if (data[`success`] === true) {
       this.userDetails = data?.data;
    var old = JSON.stringify( this.userDetails).replace(/YES/g, JSON.parse("true"));
    var old2 = JSON.stringify( old).replace(/NO/g, JSON.parse("false"));
    var newArray = JSON.parse(old2);
     this.roleForm.controls.role.patchValue(JSON.parse(newArray).srolename);
     this.roleForm.controls.delete.patchValue(this.convertToBoolean(JSON.parse(newArray).edelete)); 
     this.roleForm.controls.read.patchValue(this.convertToBoolean(JSON.parse(newArray).ereadonly));
     this.roleForm.controls.execute.patchValue(this.convertToBoolean(JSON.parse(newArray).eexecute));
     this.roleForm.controls.edit.patchValue(this.convertToBoolean(JSON.parse(newArray).eedit));
     this.roleForm.controls.add.patchValue(this.convertToBoolean(JSON.parse(newArray).eadd));
     this.roleForm.controls.schedule.patchValue(this.convertToBoolean(JSON.parse(newArray).eschedule));

      } else {
        this.userDetails = [];
      }
    });
  }

  convertToBoolean(input: string): boolean | undefined {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return undefined;
    }
}
  
updateRole(): void {
  const obj = {
    rolename: this.roleForm.controls.role.value,
    schedule: this.roleForm.controls.schedule.value,
    execute: this.roleForm.controls.execute.value,
    readonly: this.roleForm.controls.read.value,
    Delete: this.roleForm.controls.delete.value,
    edit: this.roleForm.controls.edit.value,
    add: this.roleForm.controls.add.value,
    id: this.data?.roleDetails?.iid,
  };
  this.http.putToken(`/roles`, obj).subscribe(data => {
    if (data[`success`] === true) {
      this.dialogRef.close();
    }
  });
}

addRole(): void {
  const obj = {
    rolename: this.roleForm.controls.role.value,
    schedule: this.roleForm.controls.schedule.value,
    execute: this.roleForm.controls.execute.value,
    readonly: this.roleForm.controls.read.value,
    Delete: this.roleForm.controls.delete.value,
    edit: this.roleForm.controls.edit.value,
    add: this.roleForm.controls.add.value,
    id: this.data?.roleDetails?.iid,
  };
  this.http.postToken(`/roles`, obj).subscribe(data => {
    if (data[`success`] === true) {
      this.dialogRef.close();
    }
  });
}



  onboardRole(): void {
    if (this.data?.roleDetails?.iid) {
      this.updateRole();
    } else {
      this.addRole();
    }
  }

}
