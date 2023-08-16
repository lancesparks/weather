import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./components/modules/search.module").then((m) => m.SearchModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
