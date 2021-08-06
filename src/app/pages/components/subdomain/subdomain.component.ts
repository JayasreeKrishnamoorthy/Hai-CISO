import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GeoService } from '../../../Services/geo.service';
import { HttpServiceService } from '../../../Services/http_service/http-service.service';

@Component({
  selector: 'ngx-subdomain',
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.scss']
})
export class SubdomainComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SubdomainComponent>,
  public fb: FormBuilder,
  public dialog: MatDialog,
  public http: HttpServiceService,
  public geo: GeoService,) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
