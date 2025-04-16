import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugService } from '../bug.service';
import { Bug } from '../../../../shared/bug.model'; 

@Component({
  selector: 'app-bug-list',
  imports: [CommonModule],
  templateUrl: './bug-list.component.html',
  styleUrl: './bug-list.component.css'
})

export class BugListComponent {

  // alle Bugs hier
  bugs: Bug[] = [];

  constructor(private bugService: BugService) {} // Dependency Injection

  ngOnInit() { // wird automatisch aufgerufen, wenn die Komponente bereit ist (nach Konstruktor)
    this.loadBugs();
  }

  // Bugs vom Server holen und in bugs speichern
  loadBugs() {
    this.bugService.getBugs().subscribe(bugs => {
      this.bugs = bugs;
    });
  }
}