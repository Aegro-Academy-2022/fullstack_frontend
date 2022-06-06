import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm } from '../model/farm';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FarmsService { 

  private readonly API = 'http://localhost:8080/api/v1/farms/'; 

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Farm[]>(this.API)
    .pipe(
      first(),
      delay(800),
      tap( farms => console.log(farms))
    );
  }

  find(id: string | null) {
    return this.httpClient.get<Farm>(this.API+id)
    .pipe(
      first(),
      tap( farm => console.log(farm))
    );
  }

  save(data : Farm) {
    return this.httpClient.post<Farm>(this.API, data)
    .pipe(
      first(),
      tap( farm => console.log(farm))
    );
  }

  update(data: Farm, id: string){
    return this.httpClient.put<Farm>(this.API + id, data)
    .pipe(
      first(),
      tap( farm => console.log(farm))
    );

  }

  remove(id: string){
    return this.httpClient.delete(this.API+id);
  }
}