import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Farm } from 'src/app/farms/model/farm';
import { FarmsService } from 'src/app/farms/services/farms.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  farm$!: Observable <Farm>;

  fkFarm: string | null | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private farmService: FarmsService
  ) { }

  ngOnInit(): void {
    this.fkFarm = this.route.snapshot.paramMap.get('id');
    this.farm$ = this.farmService.find(this.fkFarm)
    .pipe(
      catchError( error => {
        console.log ("Ola");
        return of()
      }
      )
    );;
  }

}
