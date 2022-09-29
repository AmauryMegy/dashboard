import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/app/models/stat';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstStats!: Stat;

  saleData = [
    { name: "Mobiles", value: 10 },
    { name: "Laptop", value: 10 },
    { name: "AC", value: 50 },
    { name: "Headset", value: 50 },
    { name: "Fridge", value: 1 }
  ];

  constructor(private statService: StatService) { 
  }

  ngOnInit(): void {
    this.statService.getStat().subscribe(data => {
      this.firstStats = data;
    })
  }

}
