import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fudge';
  showChildComponet = false;
  showSecondChild = false;

  openChildComponent(){
  this.showChildComponet = true;
  }

  scrollOtherDiv(){
  this.showSecondChild = true;
  }
  showMainDiv(){
  if(this.showSecondChild){
    return "display : none"
  }
  else {
    return "display : block"
  }
  };

  showAnotherDiv(){
    if(this.showSecondChild){
      return "display : block"
    }
    else {
      return "display : none"
    }
  }
}
