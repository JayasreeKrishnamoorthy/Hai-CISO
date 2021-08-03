import { Component, OnDestroy } from '@angular/core';




@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {


  constructor() {
    this.loadScript('assets/globe/globe.js');
  }



  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    window.onload;
    this.loadScript('assets/globe/globe.js');
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    window.onload;
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngOnDestroy() {
    window.onload;
  }

}
