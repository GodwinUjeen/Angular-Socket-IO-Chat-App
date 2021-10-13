import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Websocket Angular client ';

  userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.listen('typing').subscribe((data) => this.updateFeedback(data))
    this.socketService.listen('chat').subscribe((data) => this.updateMessage(data))
  }

  updateMessage(data: any): void {
    this.feedback = '';
    if (!!!data) return;
    this.output.push(data);
  }

  updateFeedback(data: any): void {
    console.log(data.message)
    this.feedback = `${data} is typing a message...`
    // this.feedback=data.message
  }

  messageTyping(): void {
    console.log(`${this.userName} is typing...`);
    this.socketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    console.log({
      message: this.message,
      handle: this.userName
    });
    this.socketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });

    this.message = "";
  }
}
