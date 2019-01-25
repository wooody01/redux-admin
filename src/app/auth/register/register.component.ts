import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public _as: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data: any){
    this._as.crearUsuario(data.nombre, data.email, data.password);    
  }

}
