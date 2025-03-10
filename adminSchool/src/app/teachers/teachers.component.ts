import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEdit,
  faTrash,
  faEye,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachers',
  imports: [
    NgMultiSelectDropDownModule,
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent {
  faEdit = faEdit; faTrash = faTrash; faEye = faEye; faSearch = faSearch; currentStep: number = 1;

  classList: any = []; classSelectedItems: any = [];
  subjectList: any = []; subjectSelectedItems: any = [];
  dropdownSettings: any = {};

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.getTeacherValue();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  nextStep() {
    if (this.currentStep < 2) { this.currentStep++; }}
  prevStep() {
    if (this.currentStep > 1) { this.currentStep--; }}

  // API

  teacherForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), ]), // Adjust as needed
    userId: new FormControl('', [Validators.required]),
    emailPhone: new FormControl('', [Validators.required]),
    dob: new FormControl(),
    gender: new FormControl('', [Validators.required]),
    identityVerified: new FormControl(false),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]), // Add password validation
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
  });

  TeacherValue: any[] = [];
  NoOfTeacher: number = 0;
  filteredTeachers: any; // To hold the filtered teacher data
  searchQuery: string = '';
  constructor(private http: HttpClient) {}
  
  getTeacherValue(){
    this.http.get("http://localhost:3000/DAVBHAGALPUR1").subscribe((res:any)=>{
      this.TeacherValue = res.Teacher;
      this.NoOfTeacher = res.Teacher.length;
      this.filteredTeachers = this.TeacherValue;
    })
  }
  filterTeachers() {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.filteredTeachers = this.TeacherValue.filter(teacher => {
        const firstName = teacher.first_Name.toLowerCase();
        const lastName = teacher.last_Name.toLowerCase();
        const id = teacher.id.toString();
        return firstName.includes(query) || lastName.includes(query) || id.includes(query);
      });
    } else {
      this.filteredTeachers = [...this.TeacherValue]; // Reset to all teachers if no search
    }
  }
  getDisplayedTeachers() {
    return this.searchQuery ? this.filteredTeachers : this.TeacherValue;
  }

  addTeachers() {
    if (this.teacherForm.valid) {
      const teacherData = {
        id: Number(this.teacherForm.get('userId')?.value),
        first_Name: this.teacherForm.get('name')?.value,
        userId: this.teacherForm.get('userId')?.value,
        email: this.teacherForm.get('emailPhone')?.value,
        dob: this.teacherForm.get('dob')?.value,
        gender: this.teacherForm.get('gender')?.value,
        identityVerified: this.teacherForm.get('identityVerified')?.value,
        password: this.teacherForm.get('password')?.value,
        address: this.teacherForm.get('address')?.value,
        city: this.teacherForm.get('city')?.value,
        state: this.teacherForm.get('state')?.value,
        // Add any other properties you need
      };

      this.http.post('http://localhost:3000/DAVBHAGALPUR1/Teacher', teacherData).subscribe(
        (response) => {
          console.log('Teacher added successfully:', response);
          this.getTeacherValue(); 
          document.getElementById('exampleModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
          this.teacherForm.reset();
          this.currentStep = 1;
        },
        (error) => {
          console.error('Error adding teacher:', error);
          // Handle the error (e.g., show an error message)
        }
      );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
