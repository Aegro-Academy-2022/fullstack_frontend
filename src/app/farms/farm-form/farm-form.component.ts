import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Farm } from '../model/farm';
import { FarmsService } from '../services/farms.service';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.scss']
})
export class FarmFormComponent implements OnInit {

  farm$!: Observable <Farm>;
  farmForm !: FormGroup;
  actionBtn : string = "Salvar"

  constructor(
    private formBuilder : FormBuilder,
    private farmsService: FarmsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: Farm,
    private dialogRef: MatDialogRef<FarmFormComponent>) { }

  ngOnInit(): void {
    this.farmForm = this.formBuilder.group({
      name : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.farmForm.controls['name'].setValue(this.editData.name);
    }
  }

  saveFarm(){
    if(!this.editData){
      if(this.farmForm.valid){
        this.farmsService.save(this.farmForm.value)
        .subscribe({
          next:(res)=>{
            this.farmForm.reset();
            this.dialogRef.close('save');
  
          },
          error:(err)=>{
            this.onError(err.error.message);
          }
        })
      }
    }
    this.updateFarm();
  }

  updateFarm() {
    this.farmsService.update(this.farmForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        this.farmForm.reset();
        this.dialogRef.close('update');

      },
      error:(err)=>{
        this.onError(err.error.message);
      }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

}
