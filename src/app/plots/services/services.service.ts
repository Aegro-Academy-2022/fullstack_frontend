import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Plot } from '../model/plot';

@Injectable({
  providedIn: 'root'
})
export class PlotsService { 

  private readonly API = 'http://localhost:8080/api/v1/farms/'; 

  constructor(private httpClient: HttpClient) {}

  list(id: string | null) {
    return this.httpClient.get<Plot[]>(this.API+id+"/plots")
    .pipe(
      first(),
      tap( plots => console.log(plots))
    );
  }
}
