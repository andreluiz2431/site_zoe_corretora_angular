import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlidesSocialmediasComponent } from './pages/slides.socialmedias/slides.socialmedias.component';
import { SocialMediaPostComponent } from './shared/components/social-media-post/social-media-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SlidesSocialmediasComponent,
    SocialMediaPostComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
})
export class AppModule { }