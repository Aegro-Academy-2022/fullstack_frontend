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
    return this.httpClient.get<Plot[]>(this.API+`${id}/plots/`)
    .pipe(
      first(),
      tap( plots => console.log(plots))
    );
  }

  find(fk: string | null, id: string | null) {
    return this.httpClient.get<Plot>(this.API+`${fk}/plots/${id}`)
    .pipe(
      first(),
      tap( plot => console.log(plot))
    );
  }

  save(fk: string | null, data : Plot) {
    return this.httpClient.post<Plot>(this.API+`${fk}/plots/`, data)
    .pipe(
      first(),
      tap( plot => console.log(plot))
    );
  }

  update(fk: string | null, id: string, data: Plot){
    return this.httpClient.put<Plot>(this.API+`${fk}/plots/${id}`, data)
    .pipe(
      first(),
      tap( plot => console.log(plot))
    );

  }

  remove(fk: string | null, id: string){
    return this.httpClient.delete(this.API+`${fk}/plots/${id}`);
  }
}
