import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private formBuilder : FormBuilder,
    private farmsService: FarmsService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<FarmFormComponent>) { }

  ngOnInit(): void {
    this.farmForm = this.formBuilder.group({
      name : ['', Validators.required]
  })
  }

  saveFarm(){
    if(this.farmForm.valid){
      this.farmsService.save(this.farmForm.value)
      .subscribe({
        next:(res)=>{
          this.farmForm.reset();
          this.dialogRef.close('save');

        },
        error:()=>{
          this.onError('Erro ao savar a fazenda');
        }
      })
    }
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

}
