import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
