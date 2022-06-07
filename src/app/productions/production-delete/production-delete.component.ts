import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ProductionsService } from '../services/productions.service';

@Component({
  selector: 'app-production-delete',
  templateUrl: './production-delete.component.html',
  styleUrls: ['./production-delete.component.scss']
})
export class ProductionDeleteComponent implements OnInit {

  constructor(
    private productionsService: ProductionsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<ProductionDeleteComponent>

  ) { }

  ngOnInit(): void {
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  deleteProduction() {
    this.productionsService.remove(
      this.deleteData.idFarm,
      this.deleteData.idPlot,
      this.deleteData.idProduction)
    .subscribe({
      next:(res)=>{
        this.dialogRef.close('delete');

      },
      error:(err)=>{
        this.onError(err.error.message);
      }
    })
  }

}
