import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FestaEvent, FestaManager, ApiFestaRequest, ApiFestaSchedule, ApiFestaManager, ApiFestaResponse } from '../../models/festa.model';
import { FestaService } from '../../services/festa.service';

@Component({
  selector: 'app-festa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './festa-form.html',
  styleUrl: './festa-form.scss'
})
export class FestaFormComponent implements OnInit {
  @Input() festaId?: number;

  festaForm!: FormGroup;
  isSubmitting = false;
  isLoadingData = false;
  submitSuccess = false;
  submitError = '';

  get isEditMode(): boolean { return !!this.festaId; }

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
    private router: Router,
    private festaService: FestaService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.festaId) {
      this.loadFesta(this.festaId);
    }
  }

  initForm(): void {
    this.festaForm = this.fb.group({
      organizationName: ['', [Validators.required, Validators.minLength(2)]],
      festaName: [''],
      councilNumber: [''],
      city: ['', Validators.required],
      state: ['CA', Validators.required],
      year: [this.currentYear, Validators.required],

      contactInfo: this.fb.group({
        hall: [''],
        address: [''],
        mailingAddress: [''],
        phone: [''],
        email: ['', Validators.email]
      }),

      schedule: this.fb.array([this.createScheduleItem()]),
      additionalNotes: [''],
      eventLink: [''],
      internalComments: [''],
      managers: this.fb.array([])
    });
  }

  loadFesta(id: number): void {
    this.isLoadingData = true;
    this.festaService.getFestaById(id).subscribe({
      next: (festa) => {
        this.populateForm(festa);
        this.isLoadingData = false;
      },
      error: (err) => {
        this.submitError = err?.error?.error || 'Failed to load festa data.';
        this.isLoadingData = false;
      }
    });
  }

  populateForm(festa: ApiFestaResponse): void {
    this.festaForm.patchValue({
      organizationName: festa.organization,
      festaName: festa.festaName !== festa.organization ? festa.festaName : '',
      councilNumber: festa.councilCode ?? '',
      city: festa.city ?? '',
      state: festa.state ?? 'CA',
      year: festa.eventYear,
      contactInfo: {
        hall: festa.locationName ?? '',
        address: festa.streetAddress ?? '',
        mailingAddress: festa.mailingAddress ?? '',
        phone: festa.phone ?? '',
        email: festa.email ?? ''
      },
      additionalNotes: festa.publicNotes ?? '',
      eventLink: festa.eventLink ?? '',
      internalComments: festa.internalNotes ?? ''
    });

    // Rebuild schedule array
    this.scheduleArray.clear();
    if (festa.schedules && festa.schedules.length > 0) {
      for (const s of festa.schedules) {
        this.scheduleArray.push(this.fb.group({
          date: [this.toDateInputValue(s.eventDate), Validators.required],
          time: [this.toTimeInputValue(s.eventTime)],
          event: [s.description, Validators.required]
        }));
      }
    } else {
      this.scheduleArray.push(this.createScheduleItem());
    }

    // Rebuild managers array
    this.managersArray.clear();
    for (const m of festa.managers ?? []) {
      this.managersArray.push(this.fb.group({
        firstName: [m.firstName, Validators.required],
        lastName: [m.lastName, Validators.required],
        phone: [m.phone],
        email: [m.email, Validators.email],
        position: [m.position]
      }));
    }
  }

  private toDateInputValue(isoStr: string): string {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  private toTimeInputValue(isoStr: string | null): string {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return '';
    return d.toTimeString().slice(0, 5); // HH:MM
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
    const councilCode = formValue.councilNumber || null;
    const councilId = councilCode ? (parseInt(councilCode, 10) || null) : null;

    const schedules: ApiFestaSchedule[] = formValue.schedule
      .filter((s: FestaEvent) => s.date && s.event)
      .map((s: FestaEvent) => ({
        festaID: this.festaId ?? 0,
        eventDate: s.date,
        eventTime: s.time ? `${s.date}T${s.time}:00` : null,
        description: s.event,
        createdByID: 1,
        updatedByID: 1
      }));

    const managers: ApiFestaManager[] = formValue.managers
      .filter((m: FestaManager) => m.firstName && m.lastName)
      .map((m: FestaManager) => ({
        festaID: this.festaId ?? 0,
        firstName: m.firstName,
        lastName: m.lastName,
        phone: m.phone || '',
        email: m.email || '',
        position: m.position || '',
        createdByID: 1,
        updatedByID: 1
      }));

    const request: ApiFestaRequest = {
      organization: formValue.organizationName,
      festaName: formValue.festaName || formValue.organizationName,
      councilID: councilId,
      councilCode: councilCode,
      city: formValue.city || null,
      state: formValue.state || null,
      eventYear: formValue.year,
      locationName: formValue.contactInfo.hall || formValue.city,
      streetAddress: formValue.contactInfo.address || null,
      mailingAddress: formValue.contactInfo.mailingAddress || null,
      phone: formValue.contactInfo.phone || null,
      email: formValue.contactInfo.email || null,
      eventLink: formValue.eventLink || null,
      publicNotes: formValue.additionalNotes || null,
      internalNotes: formValue.internalComments || null,
      createdByID: 1,
      updatedByID: 1,
      schedules,
      managers
    };

    const op$ = this.isEditMode
      ? this.festaService.updateFesta(this.festaId!, request)
      : this.festaService.createFesta(request);

    op$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = err?.error?.error || 'An error occurred while saving. Please try again.';
      }
    });
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
    if (this.isEditMode) {
      this.router.navigate(['/account/festas']);
    } else {
      this.router.navigate(['/festa-schedule']);
    }
  }

  resetForm(): void {
    if (this.isEditMode && this.festaId) {
      this.submitSuccess = false;
      this.submitError = '';
      this.loadFesta(this.festaId);
    } else {
      this.festaForm.reset({ state: 'CA', year: this.currentYear });
      this.scheduleArray.clear();
      this.scheduleArray.push(this.createScheduleItem());
      this.managersArray.clear();
      this.submitSuccess = false;
      this.submitError = '';
    }
  }
}
