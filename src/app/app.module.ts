import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {COMPONENTS, MODULES, PROVIDERS} from "./app.imports";
import { JobComponent } from './_components/job/job.component';
import { FeedbackComponent } from './_components/feedback/feedback.component';



@NgModule({
  declarations: [
    COMPONENTS,
    FeedbackComponent,
    
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
