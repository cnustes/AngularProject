import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { whiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidators';
import { NewCustomerService } from './new-customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
  providers: [NewCustomerService]
})
export class NewCustomerComponent implements OnInit {
  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;

  constructor(private fb: FormBuilder, private service: NewCustomerService,
    public dialogRef: MatDialogRef<NewCustomerComponent>) { }

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
  save():void {
    const p = Object.assign({}, this.customer, this.newCustomerForm.value);
    if(this.newCustomerForm.dirty && this.newCustomerForm.valid) {
      const p = Object.assign({}, this.customer, this.newCustomerForm.value);
      this.service.saveCusomer(p).subscribe(response => {
        this.dialogRef.close();
      });
    } else if(!this.newCustomerForm.dirty) {
      this.newCustomerForm.reset();
    }
  }
}
