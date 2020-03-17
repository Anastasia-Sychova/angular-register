import { Component, OnInit, ElementRef } from '@angular/core';
import { Status } from '@interfaces/status.interface';
import { AuthService} from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contentLoaded = false;
  token: string;
  constructor(
    public authService: AuthService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.token = this.elementRef.nativeElement.getAttribute('token');
    this.authService.setToken(this.token)
      .subscribe((response: Status) => {
        this.authService.setStatus(response);
        this.contentLoaded = true;
      }, () => {
        this.contentLoaded = false;
      });
  }
}
