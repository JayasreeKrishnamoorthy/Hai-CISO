import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from '../pages/components/confirmation/confirmation.component';
import { HttpServiceService } from './http_service/http-service.service';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  private getUserDetail = new Subject<any>();
  userdetails = this.getUserDetail.asObservable();
  ipAddress: any;
  userInfo: any;

  constructor(
    public dialog: MatDialog,
    public http: HttpServiceService,
    public router: Router,
  ) {
    this.userdetails.subscribe((data: any) => {
      this.userInfo = localStorage.getItem('PSPUser');
      this.userInfo = JSON.parse(this.userInfo);
    });
    this.userInfo = localStorage.getItem('PSPUser');
    this.userInfo = JSON.parse(this.userInfo);
    const publicIp = require('public-ip');
    (async () => {
      this.ipAddress = await publicIp.v4();
    })();
  }


  openToast(message) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '35%',
      disableClose: true,
      panelClass: '',
      data: {
        message,
        type: 'single',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  updateUserDetails(): void {
    this.getUserDetail.next();
  }


  logOut() {
    const obj = {
      user_id: this.userInfo?.id,
      ip: this.ipAddress,
    };
    this.http.postToken(`/auth/logout`, obj).subscribe(data => {
      if (data[`success`] === true) {
      } else {
      }
    });
    localStorage.removeItem('pspkey');
    localStorage.removeItem('PSPUser');
    localStorage.removeItem('PSPCUSTOMER');
    this.router.navigate(['/auth/login']);
    this.updateUserDetails();
  }



  showloader() {
    // tslint:disable-next-line:ban
    $('#preloader-active').css('display', 'block');
  }

  dismissloader() {
    setTimeout(() => {
      // tslint:disable-next-line:ban
      $('#preloader-active').css('display', 'none');
    }, 1000);
  }



}
