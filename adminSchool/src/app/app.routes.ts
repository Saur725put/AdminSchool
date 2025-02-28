import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';

export const routes: Routes = [
    {
        path: "",
        component: TeachersComponent
    },
    {
        path: "student",
        component: StudentsComponent
    },
    {
        path: "subject",
        component: SubjectsComponent
    },
    {
        path: "class",
        component: ClassesComponent
    }
];
