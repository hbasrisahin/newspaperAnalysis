import { Component, OnInit } from '@angular/core';
import { SettingsParams } from 'src/core/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  switchValue = SettingsParams.isNgram;
  minGram=SettingsParams.min_gram_value;
  maxGram=SettingsParams.max_gram_value;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    SettingsParams.isNgram=this.switchValue;
    SettingsParams.min_gram_value=this.minGram;
    SettingsParams.max_gram_value=this.maxGram;

    
  }



}
