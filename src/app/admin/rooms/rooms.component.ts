import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );
    // this.route.snapshot.queryParams['id'];
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          // + is a shortcut to convert a string into a number
          this.selectedRoom = this.rooms.find( room => room.id === +id);
        }
      }
    );
  }

  setRoom(id: number) {
    // Every time we click on one of those 'view' buttons, we change the url, and an event is being
    // fired, which our subscription (this.route.queryParams.subscribe(...)) is able to handle.
    // So that's how the selected room is changing automatically whenever we do the navigation.
    // this.router.navigate(['admin', 'rooms'], { queryParams : { id : id } });
    // with shortcut:
    this.router.navigate(['admin', 'rooms'], { queryParams : { id } });
  }
}
