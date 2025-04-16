import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BugService } from '../bug.service';
import { Bug } from '../../../../shared/bug.model'; // ... perfekt

@Component({
  selector: 'app-bug-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bug-form.component.html',
  styleUrl: './bug-form.component.css'
})

export class BugFormComponent {

  // Formular mit drei Feldern, alle Pflicht
  form = new FormGroup({
    title: new FormControl('', Validators.required), 
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required)
  });

  constructor(private bugService: BugService) {} // Dependency Injection

  // Methode zum Absenden des Formulars
  submit() {
    if (this.form.valid) {
      const newBug: Bug = {
        ...this.form.value, // holt sich die Werte aus dem Formular
      } as Bug;

      this.bugService.createBug(newBug).subscribe(() => {
        this.form.reset(); // Formular zurücksetzen
        window.location.reload(); // Seite refreshen (vielleicht nicht ideal)
      });
    }
  }
}