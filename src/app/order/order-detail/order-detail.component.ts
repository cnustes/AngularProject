import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OrderDetailService } from './order-detail.service';
import { OrderList } from '../models/order-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService]
})
export class OrderDetailComponent implements OnInit, AfterViewInit {

  orderId: number;
  orderItem: OrderList = new OrderList();
  public detailColumns: object[] = [];

  constructor(private service: OrderDetailService, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }
  
  ngAfterViewInit(): void {
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params.id;
      this.getOrderById(this.orderId);
    });
  }

  getOrderById(orderId: number): void {
    this.service.getOrderById(orderId).subscribe(response => {
      this.orderItem = response;
    })
  }

  private getDetailsColumns(): object[] {
    return [
      {
        name: "Product",
        flexGrow: 0.5,
        prop: "productName"
      },
      {
        name: "Unit price",
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
