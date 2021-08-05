import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../pages/components/confirmation/confirmation.component';
declare var google: { maps: { places: { AutocompleteService: new () => any; }; Geocoder: new () => any; }; };

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  public addressAutocomplete = new google.maps.places.AutocompleteService();
  constructor(
    public ngZone: NgZone,
    public dialog: MatDialog,
  ) { }


  getAddress(lat: any, lng: any): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results: { formatted_address: any; }[], status: string) => {
        if (status === 'OK') {
          this.ngZone.run(() => {
            resolve(results[0].formatted_address);
          });
        }
      });
    });
  }

  updatePredictions(text: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.addressAutocomplete.getPlacePredictions({ input: text, componentRestrictions: { country: 'IN' } },
        (predictions: any[], status: string) => {
          if (status === 'OK') {
            const data = (predictions.map((p: { description: any; }) => p.description));
            resolve(data);
          }
        });
    });
  }

  updateAddressAndLatLong(add: string): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: add }, (results: any, status: string) => {
        if (status === 'OK') {
          this.ngZone.run(() => {
            const geo = results[0].geometry.viewport;
            const res = {
              location: results[0].formatted_address,
              latitude: geo.getCenter().lat(),
              longitude: geo.getCenter().lng(),
            };
            resolve(res);
          });
        }
      });
    });
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


}
