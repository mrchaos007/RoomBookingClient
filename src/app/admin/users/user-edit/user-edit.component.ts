import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User;

  formUser: User;

  message: string;

  password: string;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    // this is a copy not a reference. Rather than having a reference to the object,
    // we'll be copying all of th data from an object to another
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit() {
    console.log('we need to save the user');
    console.log(this.formUser);
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    }
  }
}
