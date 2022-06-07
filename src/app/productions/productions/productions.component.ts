import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Plot } from 'src/app/plots/model/plot';
import { PlotsService } from 'src/app/plots/services/plots.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Production } from '../model/production';
import { ProductionsService } from '../services/productions.service';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.scss']
})
export class ProductionsComponent implements OnInit {

  plot$!: Observable <Plot>;
  productions$!: Observable <Production[]>;
  idFarm: string | null  = "";
  idPlot: string | null = "";

  displayedColumns = ['kilo', 'actions'];
  dataSource!: MatTableDataSource<Production>;

  constructor(
    private route: ActivatedRoute,
    private plotsService: PlotsService,
    private productionsService: ProductionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idFarm = this.route.snapshot.paramMap.get('idFarm');
    this.idPlot = this.route.snapshot.paramMap.get('idPlot');

    this.getAll();
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  getAll() {
    this.plot$ = this.plotsService.find(this.idFarm, this.idPlot)
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar talhão');
        return of()
      }
      )
    );

    this.productions$ = this.productionsService.list(this.idFarm, this.idPlot)
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar lista de produções');
        return of([])
      }
      )
    );
  }

}
