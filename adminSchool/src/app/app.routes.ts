import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { ProfileComponent } from './profile/profile.component';
import { AnnouncementComponent } from './announcement/announcement.component';

import { TeaAssignmentComponent } from './teacherFolder/tea-assignment/tea-assignment.component';
import { TeaAnnouncementComponent } from './teacherFolder/tea-announcement/tea-announcement.component';
import { TeaAttendanceComponent } from './teacherFolder/tea-attendance/tea-attendance.component';
export const routes: Routes = [
    {
        path: '', redirectTo: 'teacher', pathMatch: 'full' 
    },
    {
        path: "teacher",
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
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "announcement",
        component: AnnouncementComponent
    }

    // {
    //     path: '', redirectTo: '/teacher/assignment', pathMatch: 'full'
    // },
    // {
    //     path: 'teacher/assignment', component: TeaAssignmentComponent
    // },
    // {
    //     path: 'teacher/announcement', component: TeaAnnouncementComponent
    // },
    // {
    //     path: 'teacher/attendance', component: TeaAttendanceComponent
    // }
];
