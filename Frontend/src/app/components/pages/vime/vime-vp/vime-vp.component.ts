import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vime-vp',
  templateUrl: './vime-vp.component.html',
  styleUrls: ['./vime-vp.component.scss']
})
export class VimeVpComponent implements OnInit {

  @Input() src!: SafeUrl;
  @Input() mimeType: string = "video/mp4";
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
