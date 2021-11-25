import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {  NzLayoutModule } from 'ng-zorro-antd/layout';
import {  NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { ImageViewComponent } from './image-view/image-view.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HighlightText } from 'src/core/pipes/high-ligth-text.pipe';
import { SettingsComponent } from './settings/settings.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailModalComponent,
    ImageViewComponent,
    HighlightText,
    SettingsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
    HttpClientModule,
    NzModalModule,
    NzTabsModule,
    NzTagModule,
    NzSpinModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzCardModule,
    NzCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
