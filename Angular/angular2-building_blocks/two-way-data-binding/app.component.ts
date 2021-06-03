import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  //Define your name object with first and last properties
  firstName = 'John';
  lastName = 'Smith';
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  //Define your name object with first and last properties
name = {
  first: 'John',
  last: 'Smith'
}
}
