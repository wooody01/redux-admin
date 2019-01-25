import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _as: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    this._as.login(data.email, data.password);
  }

}
