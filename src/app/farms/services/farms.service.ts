import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm } from '../model/farm';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FarmsService { 

  private readonly API = '/assets/frm.json'; 
  //'http://localhost:8080/api/v1/farms';
  //'/assets/farm.json'; 

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Farm[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap( farms => console.log(farms))
    );
  }
}