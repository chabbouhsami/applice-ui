import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit {
  @Input() messageModal: string;

  constructor() {}

  ngOnInit(): void {}
}
