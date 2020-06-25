import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OrderContainerService } from './order-container.service';
import { OrderList } from '../models/order-list';
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss'],
  providers: [OrderContainerService]
})
export class OrderContainerComponent implements OnInit, AfterViewInit {

  items: OrderList[]=[];
  public columns: object[] = [];
  public detailColumns: object[] = [];
  @ViewChild("tableView") tableView: TableViewComponent<any>;
  @ViewChild("orderIdCellTemplate") private orderIdCellTemplate: TemplateRef<any>;
  @ViewChild("orderNumberCellTemplate") private orderNumberCellTemplate: TemplateRef<any>;

  numberOfRecords = 0;
  pageSizeOptions: number[]=[10,20,30];
  pageSize = 10;
  pageIndex = 0;
  isVisible: boolean = false;
  constructor(private ref: ChangeDetectorRef, private service: OrderContainerService) { }
  
  ngAfterViewInit(): void {
    this.columns = this.getColumn();
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.getOrders(1,10);    
  }

  getOrders(page: number, rows: number): void {
    this.isVisible = true;
    this.service.getOrderList(page, rows).subscribe(response => {
      this.isVisible = false;
      this.items = response;
      this.numberOfRecords = response[0].totalRecords;
    })
  }

  changePage(event: any): void{
    this.getOrders((event.pageIndex + 1), event.pageSize);
  }

  toggleExpandRow(row) {
    this.tableView.toggleExpandRow(row);
    this.ref.detectChanges();
  }

  private getColumn(): object[] {
    return [
      {
        name: "Id",
        flexGrow: 0.5,
        cellTemplate: this.orderIdCellTemplate
      },
      {
        name: "Customer",
        prop: "customer",
        flexGrow: 1
        
      },
      {
        name: "Total",
        prop: "totalAmount",
        flexGrow: 0.5
        
      },{
        name: "# Order",
        cellTemplate:this.orderNumberCellTemplate,
        flexGrow: 0.5        
      }
    ];
  }

  private getDetailsColumns(): object[] {
    return [
      {
        name: "Product",
        flexGrow: 0.5,
        prop: "productName"
      },
      {
        name: "Price",
        prop: "unitPrice",
        flexGrow: 0.5
      },
      {
        name: "Quantity",
        prop: "quantity",
        flexGrow: 0.5
      }
    ]
  }
}
