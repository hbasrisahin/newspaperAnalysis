import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gazete } from '../search/search.component';

@Injectable({
  providedIn: 'root'
})
export class PaperService{

  constructor(private http: HttpClient) { }

  getPaper(searchModel:SearchModel){
    if(searchModel.isNgram){
      return this.search(searchModel,"page-index-ngram");
    }else{
      return this.search(searchModel,"page-index");
    }
  }


  private search(searchModel:SearchModel,index:string){
    return this.http.get<Gazete[]>('http://localhost:4000/query?keyword='
    +searchModel.keyword+'&start_date='
    +searchModel.startDate.getFullYear()+'_01_01&end_date='
    +searchModel.endDate.getFullYear()+'_12_31&index='
    +index + '&isText='
    +searchModel.isText+'&isPerson='
    +searchModel.isPerson+'&isLocation='
    +searchModel.isLocation+'&isOrganization='
    +searchModel.isOrganization+'&isCluster='
    +searchModel.isCluster)
  }
}

export interface SearchModel{
  keyword: string;
  startDate: Date;
  endDate: Date;
  isPerson: boolean;
  isLocation: boolean;
  isOrganization: boolean;
  isText: boolean;
  isCluster: boolean;
  isNgram: boolean;
}
