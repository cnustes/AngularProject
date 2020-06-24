import { Component, OnInit, Inject } from '@angular/core';
import { EditCustomerService } from './edit-customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { whiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidators';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  providers: [EditCustomerService]
})
export class EditCustomerComponent implements OnInit {
  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;

  constructor(private fb: FormBuilder, private service: EditCustomerService,
    public dialogRef: MatDialogRef<EditCustomerService>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.customerRetrived(data.id);
    }

  ngOnInit() {
    this.buildNewCustomerForm();
  }

  buildNewCustomerForm():void {
    this.newCustomerForm = this.fb.group({
      firstName:['',[Validators.required, whiteSpaceValidator.cannotContainSpace]],
      lastName:['',Validators.compose([Validators.required, whiteSpaceValidator.cannotContainSpace])],
      city:['',Validators.compose([Validators.required, whiteSpaceValidator.cannotContainSpace])],
      country:['',Validators.compose([Validators.required, whiteSpaceValidator.cannotContainSpace])],
      phone:['',Validators.compose([Validators.required, whiteSpaceValidator.cannotContainSpace])],
    })
  }
  customerRetrived(id:number):void {
    this.service.getCustomerById(id).subscribe(response => {
      this.customer = response;
      this.newCustomerForm.patchValue({
        firstName:response.firstName,
        lastName:response.lastName,
        city:response.city,
        country:response.country,
        phone:response.phone
      })
    })
  }

  save():void {
    if(this.newCustomerForm && this.newCustomerForm.valid) {
      const p = Object.assign({}, this.customer,this.newCustomerForm.value);
      p.id = this.data.id;
      this.service.editCustomer(p).subscribe(response => {
        this.dialogRef.close();
      });
    }else if(!this.newCustomerForm.dirty) {
      this.newCustomerForm.reset();
    }
  }

}
