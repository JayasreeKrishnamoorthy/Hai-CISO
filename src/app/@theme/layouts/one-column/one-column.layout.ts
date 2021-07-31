import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode >
      <nb-layout-header subheader>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar style="background-color:rgba(255, 255, 255, 0);" class="menu-sidebar "  tag="menu-sidebar"  responsive>
 
        <ng-content select="nb-menu">
        
       
        </ng-content>
      </nb-sidebar>

      <nb-layout-column style="background:rgb(223, 227, 230);">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>


    </nb-layout>
  `,

        // <nb-layout-footer fixed>
      //   <ngx-footer></ngx-footer>
      // </nb-layout-footer>
})
export class OneColumnLayoutComponent {}
