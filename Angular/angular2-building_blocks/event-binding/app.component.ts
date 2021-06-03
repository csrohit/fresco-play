import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' //// refer app.component.html for property binding
})
export class AppComponent {
  //Define your name and show variables here
  //Define your welcomeMe(username) method here
  name = 'John'
  show = false;


  welcomeMe(userName: string){
    this.name = userName;
    this.show = true
  }
}
