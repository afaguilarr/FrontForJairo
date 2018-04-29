import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TopicsToTeachComponent } from './topicsToTeach/topicsToTeach.component';
import { TopicsToLearnComponent } from './topicsToLearn/topicsToLearn.component';
import { HttpClientModule } from '@angular/common/http';
import { TopicsToTeachService } from './topicsToTeach.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddDialogComponent } from './Dialog/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './Dialog/delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from './Dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    TopicsToTeachComponent,
    TopicsToLearnComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule, 
    MatAutocompleteModule,
    MatTooltipModule,
  ],
  entryComponents: [
    AddDialogComponent,
    DeleteDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [TopicsToTeachService],
  bootstrap: [TopicsToTeachComponent, TopicsToLearnComponent]
})
export class TopicsModule { }
