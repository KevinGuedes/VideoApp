import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-tag-vp',
  templateUrl: './video-tag-vp.component.html',
  styleUrls: ['./video-tag-vp.component.scss']
})
export class VideoTagVpComponent implements OnInit {

  @Input() src!: SafeUrl | string;
  @Input() mimeType: string = "video/mp4";
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
