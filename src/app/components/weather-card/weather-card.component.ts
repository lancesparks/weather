import { Component, Input, OnInit } from "@angular/core";
import { Images } from "../shared/getImages";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.scss"],
})
export class WeatherCardComponent implements OnInit {
  constructor() {}

  @Input() temp!: string;
  @Input() day!: string;
  @Input() condition!: string;
  @Input() rain!: any;
  @Input() isCurrentForecast!: boolean;
  @Input() isLast!: boolean;
  @Input() shrink: boolean = false;
  @Input() unitType!: string;

  public weatherImage!: string;

  ngOnInit(): void {
    let image =
      Images[this.condition?.toLowerCase() as keyof typeof Images] === null
        ? "../../assets/images/weather_bug.png"
        : Images[this.condition?.toLowerCase() as keyof typeof Images];
    this.weatherImage = image;
  }
}
