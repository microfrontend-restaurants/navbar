import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  orderItemCount: number = 0;

  orderItemCountMapping:
  {[k: string]: string} = {'=0': 'No items', '=1': '1 item', 'other': '# items'};

  constructor(
    titleService: Title
  ) {
    titleService.setTitle("Restaurants");
  }

  ngOnInit() {
    let items = localStorage.getItem("checkout");
    this.orderItemCount = items == null ? 0 : (JSON.parse(items) as number[]).length;

    // const channel = new BroadcastChannel("restaurant_channel");
    // channel.onmessage = e => {
    //   if(e.data.type === "order:item_added") {
    //     console.log(`Id of added item: ${e.data.id}`);
    //     this.orderItemCount++;
    //     //...
    //   }
    // };

    window.addEventListener("order:item_added", e =>{
      console.log(`Id of added item: ${JSON.stringify((<CustomEvent>e).detail)}`);
      this.orderItemCount++;
    });

    window.addEventListener("order:orderCount_updated", (e: any) => {
      this.orderItemCount = e.detail.count;
    });
  }
}
