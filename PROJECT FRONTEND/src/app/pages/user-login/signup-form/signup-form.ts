import { Component, effect, ElementRef, inject, input, Input, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {form , maxLength, minLength, pattern, required, schema } from '@angular/forms/signals';
import { AuthService } from '../../../services/auth-service';
import { FormField, FormRoot } from '@angular/forms/signals';
@Component({
    imports: [FormField, FormRoot],
    selector: 'app-signup-form',
    styleUrl: './signup-form.css',
    templateUrl: './signup-form.html'
})
export class SignupForm {

   authService = inject(AuthService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  errorMessage = signal<string>('');



  signupModel=signal({
    Name:'',
    email:'',
    password:'',
    phone:'',
    imageUrl:null
  })

  signupForm= form(this.signupModel,
    (schema)=>{

   

    required(schema.Name,{message:'last name is required'})
    minLength(schema.Name,2,{message:'min name characters is 2'})
    maxLength(schema.Name,50,{message:'max name characters is 50'})

    required(schema.email,{message:'email is required'})
    pattern(schema.email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:'invalid email'})
  
    required(schema.password,{message:'password is required'})
    minLength(schema.password,8,{message:'password must be 8 nums at least'})

    pattern(schema.phone,/^\+?[0-9]{10,15}$/,{message:'invalid phone number'})

  },

   {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');

          console.log(field().value());

          const formValues = field().value();

          const formData = new FormData();

          formData.append('Name', formValues.Name);
          formData.append('email', formValues.email);
          formData.append('password', formValues.password);
          formData.append('phone', formValues.phone);

          if (this.fileSelected) {
            formData.append('imageUrl', this.fileSelected);
          }

          this.authService.signup(formData).subscribe({
            next: (res) => {
              console.log(res);

              this.signupModel.set({
                Name: '',
                email: '',
                password: '',
                phone: '',
                imageUrl: null,
              });
              this.fileSelected = null;

              if (this.fileInput && this.fileInput.nativeElement) {
                this.fileInput.nativeElement.value = '';
              }
              field().reset();
            },
            error: (err) => {
              this.errorMessage.set('Failed to create account, Please try again later.');
              console.error(err);
            },
          });
        },
      },
    },
  );

  constructor() {
    effect(() => {
      console.log(this.signupForm().value());
    });
  }

  fileSelected: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input && input.files && input.files.length > 0) {
      this.fileSelected = input.files[0];
    }
  }
}