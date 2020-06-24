import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-supplier-list-table',
  templateUrl: './supplier-list-table.component.html',
  styleUrls: ['./supplier-list-table.component.scss']
})
export class SupplierListTableComponent implements OnInit {

  @Input()
  items: Supplier[]=[];
  public columns: object[]=[];
  constructor() { }

  ngOnInit() {
    this.columns = this.getColumns();
  }

  private getColumns(): object [] {
    return [
      {
        name: "Id",
        flexGrow: 0.5,
        prop: "id"
      },
      {
        name: "Company_Name",
        prop: "companyName",
        flexGrow: 1
      },
      {
        name: "contact_Name",
        prop: "contactName",
        flexGrow: 1
      },
      {
        name: "city",
        prop: "city",
        flexGrow: 1
      }
    ]
  }
}
