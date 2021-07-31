import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbTreeGridModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NebularModule { }
