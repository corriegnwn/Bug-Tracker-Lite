import { Component } from '@angular/core';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugFormComponent } from './bug-form/bug-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [BugListComponent, BugFormComponent]
})
export class AppComponent {
  title = 'Bug Tracker Lite';
}
