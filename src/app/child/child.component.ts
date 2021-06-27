import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  showDashboard = false;
  showFirstPanel = false;
  showSecondPanel = false;
  constructor() { }

  ngOnInit(): void {
    console.log('new div loaded')
    this.authenticate_loop()
  }
  authenticate_loop() {
    setTimeout (() => {
     // $('#child1').hide().fadeIn(1500);
      $('#child').hide().delay(2000).fadeIn(300);

      //$("#child").hide();
      //$("#child").delay(1000).fadeIn(100);
    }, 500)
    setTimeout (() => {
      
      //$("#child1").hide(4000).fadeIn(4000);
      $("#child1").delay(200).fadeIn(200);
    }, 1500)
    setTimeout (() => {
    this.showDashboard = true
    this.showFirstPanel = true
    this.showSecondPanel = true
    }, 1501)
    
    // $("#child1").show().delay(500).fadeOut();
    // $("#child").show().delay(1000).fadeOut()

    //$("#child").fadeIn('slow').animate({opacity: 1.0}, 1500).effect("pulsate", { times: 2 }, 800).fadeOut('slow'); 


  }

  

}
