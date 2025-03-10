import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TeaHeaderComponent } from './teacherFolder/tea-header/tea-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,TeaHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminSchool';
}
