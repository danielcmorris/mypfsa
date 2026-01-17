import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Festa, FestaEvent, FestaManager } from '../../models/festa.model';

@Component({
  selector: 'app-festa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './festa-form.html',
  styleUrl: './festa-form.scss'
})
export class FestaFormComponent implements OnInit {
  festaForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  currentYear = new Date().getFullYear();
  years = [this.currentYear, this.currentYear + 1, this.currentYear + 2];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.festaForm = this.fb.group({
      organizationName: ['', [Validators.required, Validators.minLength(2)]],
      festaName: [''],
      councilNumber: [''],
      city: ['', Validators.required],
      state: ['CA', Validators.required],
      year: [this.currentYear, Validators.required],

      // Contact Info
      contactInfo: this.fb.group({
        hall: [''],
        address: [''],
        mailingAddress: [''],
        phone: [''],
        email: ['', Validators.email]
      }),

      // Schedule (FormArray)
      schedule: this.fb.array([this.createScheduleItem()]),

      // Additional fields
      additionalNotes: [''],
      eventLink: [''],
      internalComments: [''],

      // Managers (FormArray)
      managers: this.fb.array([])
    });
  }

  createScheduleItem(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      time: [''],
      event: ['', Validators.required]
    });
  }

  createManagerItem(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      position: ['']
    });
  }

  get scheduleArray(): FormArray {
    return this.festaForm.get('schedule') as FormArray;
  }

  get managersArray(): FormArray {
    return this.festaForm.get('managers') as FormArray;
  }

  addScheduleItem(): void {
    this.scheduleArray.push(this.createScheduleItem());
  }

  removeScheduleItem(index: number): void {
    if (this.scheduleArray.length > 1) {
      this.scheduleArray.removeAt(index);
    }
  }

  addManager(): void {
    this.managersArray.push(this.createManagerItem());
  }

  removeManager(index: number): void {
    this.managersArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.festaForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const formValue = this.festaForm.value;

    const festa: Partial<Festa> = {
      organizationName: formValue.organizationName,
      festaName: formValue.festaName || undefined,
      councilNumber: formValue.councilNumber || undefined,
      city: formValue.city,
      state: formValue.state,
      year: formValue.year,
      contactInfo: {
        hall: formValue.contactInfo.hall || undefined,
        address: formValue.contactInfo.address || undefined,
        mailingAddress: formValue.contactInfo.mailingAddress || undefined,
        phone: formValue.contactInfo.phone || undefined,
        email: formValue.contactInfo.email || undefined
      },
      schedule: formValue.schedule.filter((s: FestaEvent) => s.date && s.event),
      additionalNotes: formValue.additionalNotes || undefined,
      eventLink: formValue.eventLink || undefined,
      internalComments: formValue.internalComments || undefined,
      managers: formValue.managers.length > 0 ? formValue.managers.filter((m: FestaManager) => m.firstName && m.lastName) : undefined
    };

    // Simulate form submission (in a real app, this would call a service)
    console.log('Festa submission:', festa);

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
    }, 1000);
  }

  markFormGroupTouched(): void {
    Object.keys(this.festaForm.controls).forEach(key => {
      const control = this.festaForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(innerKey => {
          control.get(innerKey)?.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            Object.keys(arrayControl.controls).forEach(innerKey => {
              arrayControl.get(innerKey)?.markAsTouched();
            });
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.festaForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  isNestedFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.festaForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && field.touched : false;
  }

  isArrayFieldInvalid(arrayName: string, index: number, fieldName: string): boolean {
    const array = this.festaForm.get(arrayName) as FormArray;
    const field = array.at(index)?.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  goBack(): void {
    this.router.navigate(['/festa-schedule']);
  }

  resetForm(): void {
    this.festaForm.reset({
      state: 'CA',
      year: this.currentYear
    });
    this.scheduleArray.clear();
    this.scheduleArray.push(this.createScheduleItem());
    this.managersArray.clear();
    this.submitSuccess = false;
    this.submitError = '';
  }
}
