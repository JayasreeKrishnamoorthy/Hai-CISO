import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
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
  }

  onboardRole() {
    const obj = {

    };
  }

}
