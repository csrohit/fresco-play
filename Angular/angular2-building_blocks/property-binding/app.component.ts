import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'   // refer app.component.html for adding message value using property binding
})
export class AppComponent {
    message = "hey there";
//Define your message with hey there 
}
