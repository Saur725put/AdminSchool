import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  openModel(){
    const modelDiv = document.getElementById("exampleModal");
    if(modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }
  closeModel(){
    const modelDiv = document.getElementById('exampleModal');
    if(modelDiv!= null) modelDiv.style.display = 'none';
  }
}
