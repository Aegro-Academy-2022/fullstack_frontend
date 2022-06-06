import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { FarmFormComponent } from 'src/app/farms/farm-form/farm-form.component';
import { Farm } from 'src/app/farms/model/farm';
import { FarmsService } from 'src/app/farms/services/farms.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Plot } from '../model/plot';
import { PlotFormComponent } from '../plot-form/plot-form.component';
import { PlotsService } from '../services/services.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export default class PlotsComponent implements OnInit {
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

  getFk(){
    return this.fkFarm;
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

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = this.fkFarm;
    this.dialog.open(PlotFormComponent, dialogConfig)
    .afterClosed().subscribe(res => {
      if(res === 'save'){
        this.getAll();
      }
    });
  }

  onEdit(plot: Plot) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = plot;
    this.dialog.open(PlotFormComponent, dialogConfig)
    .afterClosed().subscribe(res => {
      if(res === 'update'){
        this.getAll();
      }
    });

  }



}
