import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from "../search/search.component";
import { SearchRoutingModule } from "./search.routing.module";
import { WeatherCardComponent } from "../weather-card/weather-card.component";
import { WeatherConditionsComponent } from "../weather-conditions/weather-conditions.component";

@NgModule({
  imports: [SearchRoutingModule, CommonModule, ReactiveFormsModule],
  declarations: [
    SearchComponent,
    WeatherCardComponent,
    WeatherConditionsComponent,
  ],
})
export class SearchModule {}
