import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Plot } from '../model/plot';
import { PlotsService } from '../services/plots.service';

@Component({
  selector: 'app-plot-form',
  templateUrl: './plot-form.component.html',
  styleUrls: ['./plot-form.component.scss']
})
export class PlotFormComponent implements OnInit {

  plot$!: Observable<Plot>;
  plotForm !: FormGroup;
  actionBtn : string = "Salvar"

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private plotsService: PlotsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<PlotFormComponent>
  ) { }

  ngOnInit(): void {
    console.log(typeof this.editData)
    this.plotForm = this.formBuilder.group({
      name : ['', Validators.required],
      area : ['', Validators.required]
    });

    if(typeof this.editData === 'object'){
      this.actionBtn = "Atualizar";
      this.plotForm.controls['name'].setValue(this.editData.name);
      this.plotForm.controls['area'].setValue(this.editData.area);
    }
  }

  savePlot(){
    if(typeof this.editData === 'string'){
      if(this.plotForm.valid){
        this.plotsService.save(this.editData, this.plotForm.value)
        .subscribe({
          next:(res)=>{
            this.plotForm.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            this.onError('Erro ao salvar talhão');
          }
        })
      }
    }else{
      this.updatePlot();
    }
  }

  updatePlot() {
    this.plotsService.update(this.editData.fkFarm, this.editData.id, this.plotForm.value)
    .subscribe({
      next:(res)=>{
        this.plotForm.reset();
        this.dialogRef.close('update');

      },
      error:()=>{
        this.onError('Erro ao atualizar o talhão');
      }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

}
