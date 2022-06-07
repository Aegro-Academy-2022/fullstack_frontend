import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FarmDeleteComponent } from '../farm-delete/farm-delete.component';
import { FarmFormComponent } from '../farm-form/farm-form.component';
import { Farm } from '../model/farm';
import { FarmsService } from '../services/farms.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.scss']
})
export class FarmsComponent implements OnInit {

  farms$!: Observable <Farm[]>;
  displayedColumns = ['name', 'actions'];
  dataSource!: MatTableDataSource<Farm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private farmsService: FarmsService, 
    public dialog: MatDialog
    ) { }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  ngOnInit(): void {
    this.getAll();

  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(FarmFormComponent, dialogConfig)
    .afterClosed().subscribe(res => {
      if(res === 'save'){
        this.getAll();
      }
    });
  }

  onEdit(farm: Farm) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = farm;
    this.dialog.open(FarmFormComponent, dialogConfig)
    .afterClosed().subscribe(res => {
      if(res === 'update'){
        this.getAll();
      }
    });

  }

  onDelete(farm : Farm){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = farm;
    this.dialog.open(FarmDeleteComponent, dialogConfig)
    .afterClosed().subscribe(res => {
      if(res === 'delete'){
        this.getAll();
      }
    });

  }

  getAll() {
    this.farms$ = this.farmsService.list()
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar lista de fazendas');
        return of([])
      }
      )
    );
  }
  

}
