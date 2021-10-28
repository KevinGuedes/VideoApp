import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videogular-vp',
  templateUrl: './videogular-vp.component.html',
  styleUrls: ['./videogular-vp.component.scss']
})
export class VideogularVpComponent implements OnInit {

  @Input() src!: SafeUrl | string;
  @Input() mimeType: string = "video/mp4";
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
