import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    FormsModule /* for using form elements like NgForm */,
    HttpClientModule /* for using http request elements end verbs like GET, POST, ... */,
  ],
})
export class SharedModule {}
