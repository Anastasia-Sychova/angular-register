import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contentLoaded = false;

  ngOnInit() {
    this.contentLoaded = true;
  }
}
