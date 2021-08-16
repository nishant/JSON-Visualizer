import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonTreeComponent } from '../components/json-tree/json-tree.component';
import { AngularSplitModule } from 'angular-split';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  declarations: [AppComponent, JsonTreeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule,
    CodeEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
