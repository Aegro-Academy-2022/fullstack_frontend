import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FarmFormComponent } from '../farm-form/farm-form.component';
import { Farm } from '../model/farm';
import { FarmsService } from '../services/farms.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.scss']
})
export class FarmsComponent implements OnInit {

  farms$: Observable <Farm[]>;
  displayedColumns = ['name', 'actions'];

  constructor(
    private farmsService: FarmsService, 
    public dialog: MatDialog
    ) { 
    this.farms$ = this.farmsService.list()
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar lista de fazendas');
        return of([])
      })
    );
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  ngOnInit(): void {

  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(FarmFormComponent, dialogConfig);
  }
  

}
