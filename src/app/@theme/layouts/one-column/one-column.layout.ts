import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode style="background:#f8f9fa!important;">
      <nb-layout-header class="fixed-header" subheader style="background:#f8f9fa!important;">
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar style="background-color:#f8f9fa!important;" class="menu-sidebar "  tag="menu-sidebar"  responsive>
 
        <ng-content select="nb-menu">
        
       
        </ng-content>
      </nb-sidebar>

      <nb-layout-column style="background:#f8f9fa!important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>


    </nb-layout>
  `,

        // <nb-layout-footer fixed>
      //   <ngx-footer></ngx-footer>
      // </nb-layout-footer>
})
export class OneColumnLayoutComponent {}
