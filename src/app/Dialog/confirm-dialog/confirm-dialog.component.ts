import { Component,Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(public dialog: MatDialog, 
              private dialogRef: MatDialogRef<ConfirmDialogComponent>
             ) { 
  }
  
  answer(ans:boolean){
    this.dialogRef.close(ans);     
  }

  ngOnInit() {
  }

}
