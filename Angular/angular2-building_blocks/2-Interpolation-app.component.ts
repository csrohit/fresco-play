import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>{{message}}</h1>`
})
export class AppComponent {
  message = 'hey there';
}
