import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { DarkBinRoutingModule } from './dark-bin-routing.module';
import { DarkBinComponent } from './dark-bin.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DarkBinComponent
  ],
  imports: [
    CommonModule,
    DarkBinRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  ]
})
export class DarkBinModule { }
