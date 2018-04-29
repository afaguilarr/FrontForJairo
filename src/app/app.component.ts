import { Component } from '@angular/core';
import { GlobalVariables } from './shared/globalVariables'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamOneBitches';
  tabId = 0;

  changeTab(id:number){
    this.tabId = id;
  }

  checkSelected(id:number){
    return this.tabId === id;
  }
}
