import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  cargando: boolean;
  
  subscription: Subscription;

  constructor(public _as: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
   this.subscription = this.store.select('ui').subscribe(ui => {
     console.log(ui);
     
      this.cargando = ui.isLoading;
    })
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSubmit(data: any) {
    this._as.login(data.email, data.password);
  }

}
