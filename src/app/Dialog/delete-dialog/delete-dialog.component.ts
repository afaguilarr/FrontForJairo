import { Component,Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  constructor(public dialog: MatDialog, 
              private dialogRef: MatDialogRef<DeleteDialogComponent>
             ) { 
  }
  
  answer(ans:boolean){
    this.dialogRef.close(ans);     
  }

  ngOnInit() {
  }

}
