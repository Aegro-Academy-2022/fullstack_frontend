import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Production } from '../model/production';

@Injectable({
  providedIn: 'root'
})

export class ProductionsService {

  private readonly API = 'http://localhost:8080/api/v1/farms/';

  constructor(private httpClient: HttpClient) { }


  list(idFarm: string | null, idPlot: string | null) {
    return this.httpClient.get<Production[]>(this.API+`${idFarm}/plots/${idPlot}/productions/`)
    .pipe(
      first(),
      tap( productions => console.log(productions))
    );
  }

  save(idFarm: string | null, idPlot: string | null, data: Production) {
    return this.httpClient.post<Production>(this.API+`${idFarm}/plots/${idPlot}/productions/`, data)
    .pipe(
      first(),
      tap( production => console.log(production))
    );
  }

  update(idFarm: string | null, idPlot: string | null, id: string, data: Production){
    return this.httpClient.put<Production>(this.API+`${idFarm}/plots/${idPlot}/productions/${id}`, data)
    .pipe(
      first(),
      tap( production => console.log(production))
    );

  }

  remove(idFarm: string | null, idPlot: string | null, id: string){
    return this.httpClient.delete(this.API+`${idFarm}/plots/${idPlot}/productions/${id}`);
  }
}
