import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  imports: [NgMultiSelectDropDownModule, FormsModule,CommonModule, FontAwesomeModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
    faEdit = faEdit; faTrash = faTrash; faEye = faEye; faSearch = faSearch;
    currentStep: number = 1;

    nextStep() {
      if (this.currentStep < 2) { this.currentStep++; }}
    prevStep() {
      if (this.currentStep > 1) { this.currentStep--; }}

    // API
    studentValue: any[] = [];
    NoOfStudent: number = 0;
    constructor(private http: HttpClient) {}
    ngOnInit(){
      this.getStudentValue();
    }
    getStudentValue(){
      this.http.get("http://localhost:3000/DAVBHAGALPUR1").subscribe((res:any)=>{
        this.studentValue = res.Student;
        this.NoOfStudent = res.Student.length;
      })
    }
}
