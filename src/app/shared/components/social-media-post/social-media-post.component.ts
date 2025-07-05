import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialMediaService } from '../../../core/services/social-media.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminBackBtnComponent } from '../admin-back-btn/admin-back-btn.component';

@Component({
  selector: 'app-social-media-post',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AdminBackBtnComponent
  ],
  templateUrl: './social-media-post.component.html',
  styleUrls: ['./social-media-post.component.css']
})
export class SocialMediaPostComponent {
  postForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private socialMediaService: SocialMediaService) {
    this.postForm = this.fb.group({
      image: [null],
      description: [''],
      instagram: [false],
      googleMyBusiness: [false]
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submitPost() {
    // Implementar chamada ao serviço
  }

  goToAdmin() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/admin';
    }, 150);
  }
}
