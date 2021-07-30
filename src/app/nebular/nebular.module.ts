import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbInputModule, NbLayoutModule } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule
  ]
})
export class NebularModule { }
