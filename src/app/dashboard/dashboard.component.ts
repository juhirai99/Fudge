import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { User } from '../model/user.model';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';
import { PagerService } from '../services/pager.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http : HttpClient , private pagerService: PagerService) { }
  
  users: User[] = [];
  post : Post[] = [];
  comment : Comment[] = [];
  allComment : Comment[] = [];
  public lineChartData : ChartDataSets[]= [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Weekly' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Monthly' },
    { data: [28, 80, 100, 40, 49, 89, 120], label: 'Yearly' },
    { data: [180, 200, 770, 90, 300, 270, 400], label: 'All Time', yAxisID: 'y-axis-1' }
  ];

  public lineChartLabels : Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: (ChartOptions ) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  ngOnInit(): void {
  this.getUsers()
  this.getPost()
  this.getAllComment()
  }

  getUsers(){
    this.http.get('http://localhost:3000/users').subscribe((users : User[])=>{
      this.users = users
      console.log('ss',this.users)
    })
  };
  getAllComment(){
    this.http.get('http://localhost:3000/comments').subscribe( (allComment : Comment[])=>{
    this.allComment = allComment
  })
  }
  getCommentById(id:number){
  this.http.get('http://localhost:3000/posts/'+id+'/comments').subscribe( (comment : Comment[])=>{
    this.comment = comment
  })
  };

  getPost(){ 
  this.http.get('http://localhost:3000/posts').subscribe( (post: Post[])=>{
    this.post = post;
    this.setPage(1)
  }); 
 }; 
 setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
      return;
  }

  // get pager object from service
  this.pager = this.pagerService.getPager(this.post.length, page);

  // get current page of items
  this.pagedItems = this.post.slice(this.pager.startIndex, this.pager.endIndex + 1);
};



// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

// public hideOne(): void {
//   const isHidden = this.chart.isDatasetHidden(1);
//   this.chart.hideDataset(1, !isHidden);
// }

// public pushOne(): void {
//   this.lineChartData.forEach((x, i) => {
//     const num = this.generateNumber(i);
//     const data: number[] = x.data as number[];
//     data.push(num);
//   });
//   this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
// }

// private generateNumber(i: number): number {
//   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
// }

public changeColor(): void {
  this.lineChartColors[2].borderColor = 'green';
  this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
}


}
