import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  imports: [NgMultiSelectDropDownModule, FormsModule, FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {
  faSearch = faSearch;

  studentList: any = [];
  studentSelectedItems: any = [];

  subjectList: any = [];
  subjectSelectedItems: any = [];

  dropdownSettings: any = {};
  classForm: FormGroup = new FormGroup({
    className: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    selectedSubjects: new FormControl([], Validators.required),
    selectedStudents: new FormControl([], Validators.required),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    this.getStudentAndSubjectList();
    this.getClasses();
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  classes: any[] = [];
  filteredClasses: any[] = []; // To hold filtered classes
  searchQuery: string = '';
  filterClass() {
    if (!this.searchQuery) {
      this.filteredClasses = [...this.classes]; // Reset to all classes if search is empty
      return;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    this.filteredClasses = this.classes.filter(classItem =>
      classItem.class_Name.toLowerCase().includes(lowerCaseQuery) ||
      classItem.section.toLowerCase().includes(lowerCaseQuery)
    );
  }

  
  getStudentAndSubjectList() {
    this.http.get('http://localhost:3000/DAVBHAGALPUR1').subscribe((res: any) => {
      // Populate studentList
      this.studentList = res.Student.map((student: any, index: number) => ({
        item_id: index + 1,
        item_text: `${student.first_Name} (${student.id})`,
        studentId: student.id,
      }));
      // Populate subjectList
      this.subjectList = res.subject.map((subject: any, index: number) => ({
        item_id: index + 1,
        item_text: subject.subject_Name,
        subjectName: subject.subject_Name,
      }));
    });
  }

  getClasses() {
    this.http.get<any>('http://localhost:3000/DAVBHAGALPUR1').subscribe((res) => {
      this.classes = res.class || []; // Assign classes from db.json, or empty array if not found
      this.filteredClasses = [...this.classes];
      this.filterClass();
    });
  }

  addClass() {
    if (this.classForm.valid) {
      const formData = this.classForm.value;
      const selectedStudentNames = formData.selectedStudents.map(
        (item: any) => item.item_text
      );
      const selectedSubjectNames = formData.selectedSubjects.map(
        (item: any) => item.item_text
      );

      const newClass = {
        class_Name: formData.className,
        section: formData.section,
        subject: selectedSubjectNames,
        student: selectedStudentNames,
      };

      this.http.get('http://localhost:3000/DAVBHAGALPUR1').subscribe((res: any) => {
        const updatedClasses = res.class ? [...res.class, newClass] : [newClass];

        this.http
          .put('http://localhost:3000/DAVBHAGALPUR1', { ...res, class: updatedClasses })
          .subscribe(
            (response) => {
              console.log('Class added successfully:', response);
              this.classForm.reset();
              this.getStudentAndSubjectList();
            },
            (error) => {
              console.error('Error adding class:', error);
            }
          );
      });
    } else {
      console.log('Form is invalid');
    }
  }
}