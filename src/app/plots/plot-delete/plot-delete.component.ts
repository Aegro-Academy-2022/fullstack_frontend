import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Plot } from '../model/plot';
import { PlotsService } from '../services/plots.service';

@Component({
  selector: 'app-plot-delete',
  templateUrl: './plot-delete.component.html',
  styleUrls: ['./plot-delete.component.scss']
})
export class PlotDeleteComponent implements OnInit {

  constructor(
    private plotsService: PlotsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public deleteData: Plot,
    private dialogRef: MatDialogRef<PlotDeleteComponent>
  ) { }

  ngOnInit(): void {
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }


  deletePlot() {
    this.plotsService.remove(this.deleteData.fkFarm, this.deleteData.id)
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
