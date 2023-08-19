import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import {COMPONENTS, MODULES, PROVIDERS} from "./app.imports";
import { HomeComponent } from './_components/home/home.component';
import { BoardComponent } from './_components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
