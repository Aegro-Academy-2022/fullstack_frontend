import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Production } from '../model/production';
import { ProductionsService } from '../services/productions.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent implements OnInit {

  production$!: Observable<Production>;
  productionForm !: FormGroup;
  actionBtn : string = "Salvar"

  constructor(
    private formBuilder : FormBuilder,
    private productionsService: ProductionsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProductionFormComponent>
  ) { }

  ngOnInit(): void {
    this.productionForm = this.formBuilder.group({
      kilo : ['', Validators.required],
    });

    if(!(this.editData.production == null)){
      this.actionBtn = "Atualizar";
      this.productionForm.controls['kilo'].setValue(this.editData.production.kilo);
    }
  }

  saveProduction(){
    if(this.editData.production == null){
      if(this.productionForm.valid){
        this.productionsService.save(this.editData.idFarm,this.editData.idPlot, this.productionForm.value)
        .subscribe({
          next:(res)=>{
            this.productionForm.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            this.onError('Erro ao salvar produção');
          }
        })
      }
    }else{
      this.updateProduction();
    }
  }

  updateProduction() {
    this.productionsService.update(
      this.editData.idFarm, 
      this.editData.idPlot, 
      this.editData.production.id,
      this.productionForm.value)
    .subscribe({
      next:(res)=>{
        this.productionForm.reset();
        this.dialogRef.close('update');

      },
      error:()=>{
        this.onError('Erro ao atualizar a produção');
      }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

}
