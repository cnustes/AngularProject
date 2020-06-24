import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatDialogModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, 
  MatButtonModule, 
  MatToolbarModule,
  MatSidenavModule} from '@angular/material';

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
    MatSidenavModule
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
    MatSidenavModule    
  ],
  declarations: []
})
export class MaterialModule { }
