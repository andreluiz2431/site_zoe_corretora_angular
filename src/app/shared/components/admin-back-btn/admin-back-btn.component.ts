import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-back-btn',
  standalone: true,
  templateUrl: './admin-back-btn.component.html',
  styleUrls: ['./admin-back-btn.component.css']
})
export class AdminBackBtnComponent {
  goToAdmin() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/admin';
    }, 150);
  }
}
