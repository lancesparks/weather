import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-weather-conditions",
  templateUrl: "./weather-conditions.component.html",
  styleUrls: ["./weather-conditions.component.scss"],
})
export class WeatherConditionsComponent implements OnInit {
  constructor() {}

  @Input() feelsLike!: string;
  @Input() wind!: number;
  @Input() humidity!: number;
  @Input() maxTemp!: number;
  @Input() unitType!: string;
  ngOnInit(): void {}
}
