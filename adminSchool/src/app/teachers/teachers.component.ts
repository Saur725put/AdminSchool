import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers',
  imports: [],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

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
