import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Farm } from '../model/farm';
import { FarmsService } from '../services/farms.service';

@Component({
  selector: 'app-farm-delete',
  templateUrl: './farm-delete.component.html',
  styleUrls: ['./farm-delete.component.scss']
})
export class FarmDeleteComponent implements OnInit {

  constructor(
    private farmsService: FarmsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public deleteData: Farm,
    private dialogRef: MatDialogRef<FarmDeleteComponent>
  ) { }

  ngOnInit(): void {
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  deleteFarm() {
    this.farmsService.remove(this.deleteData.id)
    .subscribe({
      next:(res)=>{
        this.dialogRef.close('delete');

      },
      error:()=>{
        this.onError('Erro ao remover a fazenda');
      }
    })
  }

  

}
