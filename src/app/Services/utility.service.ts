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

  constructor(
    public dialog: MatDialog,
    public http: HttpServiceService,
    public router: Router,
  ) { }


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
    // tslint:disable-next-line:no-console
    console.log('working');
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
