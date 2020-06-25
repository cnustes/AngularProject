import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatDialogModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, 
  MatButtonModule, 
  MatToolbarModule,
  MatSidenavModule,
  MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule 
  ],
  declarations: []
})
export class MaterialModule { }
