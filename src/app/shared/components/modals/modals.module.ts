import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseModalComponent } from './base-modal/base-modal.component';
import { ListModalComponent } from './list-modal/list-modal.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    BaseModalComponent,
    ListModalComponent,
    DetailModalComponent
  ],
  exports: [
    BaseModalComponent,
    ListModalComponent,
    DetailModalComponent
  ]
})
export class ModalsModule { } 