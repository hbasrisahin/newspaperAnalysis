import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ImageViewComponent } from '../image-view/image-view.component';
import { PaperService, SearchModel } from '../services/paper.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  
  startDate=new Date(1900,0,1);
  endDate=new Date(1999,11,31);
  keyword:string="";

  responseTime:number=0;
  responseTimeNgram:number=0;

  responseTimeCluster:number=0;
  responseTimeNgramCluster:number=0;

  searchedText:string="";
  listOfData: Gazete[] =[];
  listOfDataNgram: Gazete[] =[];

  listOfDataCluster: Gazete[] =[];
  listOfDataNgramCluster: Gazete[] =[];

  isNgram=false;
  isCluster=false;

  checkOptionsOne = [
    { label: 'Text', value: 'Text', checked: true },
    { label: 'Persons', value: 'Persons', checked: true },
    { label: 'Locations', value: 'Locations', checked: true },
    { label: 'Organization', value: 'Organization', checked: true },
  ];


  constructor(private i18n: NzI18nService,
    private paperService: PaperService,
    private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
  }

  search(){
    this.searchedText=this.keyword;
    
    const model:SearchModel = {
      keyword: this.keyword,
      startDate: this.startDate,
      endDate: this.endDate,
      isPerson: this.checkOptionsOne[1].checked,
      isLocation: this.checkOptionsOne[2].checked,
      isOrganization: this.checkOptionsOne[3].checked,
      isText: this.checkOptionsOne[0].checked,
      isCluster: false,
      isNgram: false
    }

    const date1=new Date().getTime();
    this.paperService.getPaper(model).subscribe(respose=>{
      this.responseTime=new Date().getTime()- date1;
      this.listOfData =respose;
      console.log(respose);
    })

    model.isNgram=true;
    const date2=new Date().getTime();
    this.paperService.getPaper(model).subscribe(respose=>{
      this.responseTimeNgram=new Date().getTime()- date2;
      this.listOfDataNgram =respose;
      console.log(respose);
    })

    model.isCluster=true;
    model.isNgram=false;
    const date3=new Date().getTime();
    this.paperService.getPaper(model).subscribe(respose=>{
      this.responseTimeCluster=new Date().getTime()- date3;
      this.listOfDataCluster =respose;
      console.log(respose);
    })

    model.isNgram=true;
    const date4=new Date().getTime();
    this.paperService.getPaper(model).subscribe(respose=>{
      this.responseTimeNgramCluster =new Date().getTime()- date4;
      this.listOfDataNgramCluster =respose;
      console.log(respose);
    })



  }


  openDetail(data: Gazete){
    const modal = this.modal.create({
      nzTitle: data.name,
      nzContent: DetailModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth:"80%" ,
      nzComponentParams: {
        text: data.text,
        ner: data.ner,
        searchText:this.searchedText
      }
    });
  }

  viewImage(data:Gazete){
    console.log("view image")
    const modal = this.modal.create({
      nzTitle: data.name,
      nzContent: ImageViewComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth:"80%" ,
      nzComponentParams: {
      },

    });
  }
    
}

export interface Gazete{
  date: string;
  name: string;
  text: string;
  url:string;
  png:string;
  ner:Ner;
}

export interface Ner{
  PERSON: string[];
  LOCATION: string[];
  ORGANIZATION: string[];
}