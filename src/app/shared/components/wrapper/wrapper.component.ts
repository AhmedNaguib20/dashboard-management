import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  standalone: true,
})
export class WrapperComponent {}
