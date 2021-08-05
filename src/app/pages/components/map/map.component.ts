import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeoService } from '../../../Services/geo.service';
// tslint:disable-next-line:max-line-length
declare var google: { maps: { LatLng: new (arg0: any, arg1: any) => any; MapTypeId: { ROADMAP: any; }; Map: new (arg0: any, arg1: { zoom: number; mapTypeId: any; center: any; }) => any; Marker: new (arg0: { position: any; icon: string; map: any; draggable: boolean; }) => { getPosition: () => { (): any; new(): any; lat: { (): any; new(): any; }; lng: { (): any; new(): any; }; }; }; Geocoder: new () => any; event: { addListener: (arg0: { getPosition: () => { (): any; new(): any; lat: { (): any; new(): any; }; lng: { (): any; new(): any; }; }; }, arg1: string, arg2: () => void) => void; }; GeocoderStatus: { OK: any; }; }; };

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map')
  mapElement!: ElementRef;
  map: any;
  lat: any;
  long: any;
  addressList: any = [];
  addressForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapComponent>,
    public geo: GeoService,
    public fb: FormBuilder,
  ) {
    this.addressForm = this.fb.group({
      currentAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data?.addressDetails?.address) {
      this.addressForm.controls.currentAddress.setValue(this.data?.addressDetails?.address);
      this.getlatlong(this.data?.addressDetails?.address);
    }
  }

  // tslint:disable-next-line:typedef
  async getAddressList(event: any) {
    if (event.target.value) {
      this.addressList = await this.geo.updatePredictions(event.target.value);
    } else {
      this.addressList = [];
    }
  }

  // tslint:disable-next-line:typedef
  getOptionText(option: any) {
    return option;
  }


  // tslint:disable-next-line:typedef
  async getlatlong(val: any) {
    const res = await this.geo.updateAddressAndLatLong(val);
    this.lat = res[`latitude`];
    this.long = res[`longitude`];
    this.loadMap(this.lat, this.long);
  }


  loadMap(lat: any, long: any): void {
    const latLng = new google.maps.LatLng(lat, long);
    const mapOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: latLng,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // tslint:disable-next-line:max-line-length
    let marker: { getPosition: () => { (): any; new(): any; lat: { (): any; new(): any; }; lng: { (): any; new(): any; }; }; };
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      icon: 'assets/img/greenMarker.png',
      map: this.map,
      draggable: true,
    });


    const geocoder = new google.maps.Geocoder();
    // tslint:disable-next-line:only-arrow-functions
    google.maps.event.addListener(marker, 'dragend', () => {
      // tslint:disable-next-line:only-arrow-functions
      // tslint:disable-next-line:typedef
      geocoder.geocode({ latLng: marker.getPosition() }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            this.lat = marker.getPosition().lat();
            this.long = marker.getPosition().lng();
            // this.dragAddress = results[0].formatted_address;
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            (<HTMLInputElement>document.getElementById('dragAddress')).value = results[0].formatted_address;
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            (<HTMLInputElement>document.getElementById('latitude')).value = this.lat;
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            (<HTMLInputElement>document.getElementById('longitude')).value = this.long;
          }
        }
      });
    });
  }


  // tslint:disable-next-line:typedef
  async getCurrentAddress() {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const value = (<HTMLInputElement>document.getElementById('dragAddress')).value;
    this.addressForm.controls.currentAddress.setValue(value);

    // tslint:disable-next-line:no-angle-bracket-type-assertion
    if ((<HTMLInputElement>document.getElementById('latitude')).value && (<HTMLInputElement>document.getElementById('longitude')).value) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.lat = (<HTMLInputElement>document.getElementById('latitude')).value;
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.long = (<HTMLInputElement>document.getElementById('longitude')).value;
    }
    const obj = {
      address: this.addressForm.controls.currentAddress.value,
      lat: this.lat,
      long: this.long,
    };
    this.dialogRef.close(obj);
  }

}
