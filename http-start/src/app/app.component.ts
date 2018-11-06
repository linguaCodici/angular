import { Component } from '@angular/core';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serversService.getAppName();

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serversService: ServersService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSave() {
    this.serversService.storeServers(this.servers)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (rej) => {
          console.log(rej);
        }
      );
  }

  onGet() {
    this.serversService.getServers()
      .subscribe(
        (servers: any[]) => {
          this.servers = servers;
        }
      );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
