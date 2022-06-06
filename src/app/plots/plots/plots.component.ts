import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Farm } from 'src/app/farms/model/farm';
import { FarmsService } from 'src/app/farms/services/farms.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Plot } from '../model/plot';
import { PlotsService } from '../services/services.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  farm$!: Observable <Farm>;
  plots$!: Observable <Plot[]>;
  fkFarm: string | null  = "";

  displayedColumns = ['name', 'area', 'actions'];
  dataSource!: MatTableDataSource<Plot>;
  constructor(
    private route: ActivatedRoute,
    private farmService: FarmsService,
    private plotsService: PlotsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fkFarm = this.route.snapshot.paramMap.get('id');

    this.getAll();
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  getAll() {
    this.farm$ = this.farmService.find(this.fkFarm)
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar fazenda');
        return of()
      }
      )
    );

    this.plots$ = this.plotsService.list(this.fkFarm)
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar lista de talhões');
        return of([])
      }
      )
    );
  }




}
