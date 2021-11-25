import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  @Input()
  url = 'http://admin:test123@127.0.0.1:5984/page/1936_07_01.aciksoz_2/png';

  loading=false;
  image:any;
  constructor(private sanitization:DomSanitizer,
    private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.loading=true;
    this.getImageHttp().subscribe((file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          this.image = this.sanitization.bypassSecurityTrustResourceUrl(reader.result+"") ;
          this.loading=false;
      }
     })
  }

  getImageHttp(): Observable<Blob> {

    return this.httpClient.get(this.url,{
      headers:{ 'Authorization': 'Basic YWRtaW46dGVzdDEyMw=='},
      responseType: "blob"});
  }

}
