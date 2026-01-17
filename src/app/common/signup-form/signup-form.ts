import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { SimpleMail } from '../../models/mail.model';

interface FamilyMember {
  name: string;
  age: number | null;
}

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  referralSource: string;
  familyMembers: FamilyMember[];
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss'
})
export class SignupFormComponent {
  formData: SignupForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    referralSource: '',
    familyMembers: []
  };

  submitting = false;
  success = false;
  error = false;

  constructor(private mailService: MailService) {}

  isFormValid(): boolean {
    return this.formData.firstName.trim() !== '' &&
           this.formData.lastName.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.email.includes('@');
  }

  addFamilyMember(): void {
    this.formData.familyMembers.push({ name: '', age: null });
  }

  removeFamilyMember(index: number): void {
    this.formData.familyMembers.splice(index, 1);
  }

  submitForm(): void {
    if (!this.isFormValid()) return;

    this.submitting = true;
    this.error = false;

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    const familyMembersHtml = this.formData.familyMembers.length > 0
      ? this.formData.familyMembers.map((member, i) => `
        <tr>
          <td style="color: #666; font-size: 14px; padding: 4px 0;">Family Member ${i + 1}:</td>
          <td style="color: #333; font-size: 14px; padding: 4px 0;">${member.name || 'Not provided'}${member.age ? ` (Age: ${member.age})` : ''}</td>
        </tr>
      `).join('')
      : '<tr><td colspan="2" style="color: #666; font-size: 14px; padding: 4px 0;">No family members listed</td></tr>';

    const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Membership Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e5631 0%, #2e7d32 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Membership Inquiry</h1>
              <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 16px;">Someone wants to join PFSA!</p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #f0f5f0; border-radius: 8px; border-left: 4px solid #2e7d32;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Contact Information</h2>
                    <table cellpadding="6" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 30%;">Name:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;">${this.formData.firstName} ${this.formData.lastName}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px;">Email:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;"><a href="mailto:${this.formData.email}" style="color: #2e7d32;">${this.formData.email}</a></td>
                      </tr>
                      ${this.formData.phone ? `<tr>
                        <td style="color: #666; font-size: 14px;">Phone:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;">${this.formData.phone}</td>
                      </tr>` : ''}
                      ${this.formData.address || this.formData.city || this.formData.state || this.formData.zip ? `<tr>
                        <td style="color: #666; font-size: 14px;">Address:</td>
                        <td style="color: #333; font-size: 14px;">
                          ${this.formData.address ? this.formData.address + '<br>' : ''}
                          ${this.formData.city ? this.formData.city + ', ' : ''}${this.formData.state || ''} ${this.formData.zip || ''}
                        </td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What brought you to PFSA -->
          ${this.formData.referralSource ? `
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #fff8e1; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">What Brought Them to PFSA?</h2>
                    <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">${this.formData.referralSource.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}

          <!-- Family Members -->
          <tr>
            <td style="padding: 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Family Members</h2>
                    <table cellpadding="6" cellspacing="0" border="0" width="100%">
                      ${familyMembersHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #dee2e6;">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 12px; line-height: 1.5;">
                <strong>Submission Details:</strong><br>
                Date & Time: ${timestamp}
              </p>
              <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 11px;">
                This email was generated from the PFSA Membership Sign-Up Form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const mailData: SimpleMail = {
      to: 'membership@morrisdev.com',
      from: 'noreply@mypfsa.com',
      subject: `New Membership Inquiry - ${this.formData.firstName} ${this.formData.lastName}`,
      message: htmlMessage
    };

    this.mailService.sendEmail(mailData).subscribe({
      next: () => {
        this.submitting = false;
        this.success = true;
        this.resetForm();
      },
      error: (err) => {
        this.submitting = false;
        this.error = true;
        console.error('Error sending email:', err);
      }
    });
  }

  resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      referralSource: '',
      familyMembers: []
    };
  }
}
