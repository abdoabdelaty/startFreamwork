import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css', 
})
export class NavbarComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      if (window.scrollY > 0) {
        navbar.style.padding = '8px';
      } else {
        navbar.style.padding = '24px';
      }
    }
  }
}
