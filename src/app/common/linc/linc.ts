import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { SimpleMail } from '../../models/mail.model';

interface IDebt {
  credit: number;
  car: number;
  mortgage: number;
  other: number;
}

interface IExpenses {
  final: number;
  funeral: number;
  other: number;
}

interface IEducation {
  children: number;
  costPerChild: number;
}

interface IIncome {
  monthly: number;
  years: number;
}

interface IAssets {
  insurance: number;
  liquid: number;
  investments: number;
  other: number;
}

interface IUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-linc',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './linc.html',
  styleUrl: './linc.scss'
})
export class LincComponent implements OnInit {
  debt: IDebt = {
    credit: 0,
    car: 0,
    mortgage: 0,
    other: 0
  };

  expense: IExpenses = {
    final: 0,
    funeral: 0,
    other: 0
  };

  edu: IEducation = {
    children: 0,
    costPerChild: 0
  };

  income: IIncome = {
    monthly: 0,
    years: 0
  };

  assets: IAssets = {
    insurance: 0,
    liquid: 0,
    investments: 0,
    other: 0
  };

  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  // Bar heights (percentages)
  debtHeight = 0;
  cashNeedsHeight = 0;
  educationHeight = 0;
  incomeHeight = 0;
  insuranceHeight = 0;
  assetHeight = 0;

  submitting = false;
  success = false;

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
    this.calculate();
  }

  getDebtsTotal(): number {
    return this.debt.credit + this.debt.car + this.debt.mortgage + this.debt.other;
  }

  getCashNeedsTotal(): number {
    return this.expense.final + this.expense.funeral + this.expense.other;
  }

  getEducationTotal(): number {
    return this.edu.children * this.edu.costPerChild;
  }

  getIncomeTotal(): number {
    return this.income.monthly * this.income.years * 12;
  }

  getAssetsTotal(): number {
    return this.assets.insurance + this.assets.liquid + this.assets.investments + this.assets.other;
  }

  getTotalNeeds(): number {
    return this.getDebtsTotal() + this.getCashNeedsTotal() +
      this.getEducationTotal() + this.getIncomeTotal();
  }

  getInsuranceNeeded(): number {
    const needs = this.getTotalNeeds();
    const assets = this.getAssetsTotal();
    const gap = needs - assets;
    return gap > 0 ? gap : 0;
  }

  isFormValid(): boolean {
    return this.userInfo.firstName.trim() !== '' &&
           this.userInfo.email.trim() !== '' &&
           this.userInfo.email.includes('@');
  }

  calculate(): void {
    const cn = this.getCashNeedsTotal();
    const db = this.getDebtsTotal();
    const ed = this.getEducationTotal();
    const inc = this.getIncomeTotal();
    const total = cn + db + ed + inc;

    if (total === 0) {
      this.debtHeight = 0;
      this.cashNeedsHeight = 0;
      this.educationHeight = 0;
      this.incomeHeight = 0;
      this.insuranceHeight = 0;
      this.assetHeight = 0;
      return;
    }

    // Calculate percentages with minimum 10% for visibility
    let dHeight = (db / total) * 100 + 10;
    let cHeight = (cn / total) * 100 + 10;
    let eHeight = (ed / total) * 100 + 10;
    let iHeight = (inc / total) * 100 + 10;

    // Normalize to 100%
    const sum = dHeight + cHeight + eHeight + iHeight;
    this.debtHeight = (dHeight / sum) * 100;
    this.cashNeedsHeight = (cHeight / sum) * 100;
    this.educationHeight = (eHeight / sum) * 100;
    this.incomeHeight = (iHeight / sum) * 100;

    // Calculate coverage bar
    const needs = this.getTotalNeeds();
    const assets = this.getAssetsTotal();
    const insurance = this.getInsuranceNeeded();
    const coverageTotal = assets + insurance;

    if (coverageTotal > 0) {
      this.assetHeight = (assets / coverageTotal) * 100;
      this.insuranceHeight = (insurance / coverageTotal) * 100;
    } else {
      this.assetHeight = 0;
      this.insuranceHeight = 0;
    }
  }

  getDetailedQuote(): void {
    this.submitting = true;

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

    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Life Insurance Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Life Insurance Quote Request</h1>
              <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 16px;">LINC Analysis Results</p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #f0f5ff; border-radius: 8px; border-left: 4px solid #667eea;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Contact Information</h2>
                    <table cellpadding="6" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 30%;">Name:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;">${this.userInfo.firstName} ${this.userInfo.lastName}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px;">Email:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;">${this.userInfo.email}</td>
                      </tr>
                      ${this.userInfo.phone ? `<tr>
                        <td style="color: #666; font-size: 14px;">Phone:</td>
                        <td style="color: #333; font-weight: 600; font-size: 14px;">${this.userInfo.phone}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Section -->
          <tr>
            <td style="padding: 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                    <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px;">Insurance Needs Summary</h2>
                    <table cellpadding="8" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; padding: 8px 0;">Total Needs:</td>
                        <td align="right" style="color: #333; font-weight: 600; font-size: 16px; padding: 8px 0;">$${this.getTotalNeeds().toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px; padding: 8px 0;">Existing Assets:</td>
                        <td align="right" style="color: #333; font-weight: 600; font-size: 16px; padding: 8px 0;">$${this.getAssetsTotal().toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 2px solid #dee2e6;">
                        <td style="color: #333; font-weight: 600; font-size: 16px; padding: 12px 0 8px 0;">Insurance Gap:</td>
                        <td align="right" style="color: #667eea; font-weight: 700; font-size: 20px; padding: 12px 0 8px 0;">$${this.getInsuranceNeeded().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Detailed Breakdown -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px;">Detailed Breakdown</h2>

              <!-- Debts -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #fff5f5; padding: 15px; border-radius: 6px; border-left: 3px solid #dc3545;">
                    <h3 style="margin: 0 0 12px 0; color: #dc3545; font-size: 16px;">💳 Outstanding Debts</h3>
                    <table cellpadding="4" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Credit Card:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.debt.credit.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Car Loan:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.debt.car.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Mortgage:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.debt.mortgage.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Other:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.debt.other.toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 1px solid #dc3545;">
                        <td style="color: #333; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">Total:</td>
                        <td align="right" style="color: #dc3545; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">$${this.getDebtsTotal().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Cash Needs -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #fff9f0; padding: 15px; border-radius: 6px; border-left: 3px solid #fd7e14;">
                    <h3 style="margin: 0 0 12px 0; color: #fd7e14; font-size: 16px;">💰 Immediate Cash Needs</h3>
                    <table cellpadding="4" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Final Expenses:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.expense.final.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Funeral:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.expense.funeral.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Other:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.expense.other.toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 1px solid #fd7e14;">
                        <td style="color: #333; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">Total:</td>
                        <td align="right" style="color: #fd7e14; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">$${this.getCashNeedsTotal().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Education -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; border-left: 3px solid #0dcaf0;">
                    <h3 style="margin: 0 0 12px 0; color: #0dcaf0; font-size: 16px;">🎓 Education Planning</h3>
                    <table cellpadding="4" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Number of Children:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">${this.edu.children}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Cost per Child:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.edu.costPerChild.toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 1px solid #0dcaf0;">
                        <td style="color: #333; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">Total:</td>
                        <td align="right" style="color: #0dcaf0; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">$${this.getEducationTotal().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Income Replacement -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f0f5ff; padding: 15px; border-radius: 6px; border-left: 3px solid #0d6efd;">
                    <h3 style="margin: 0 0 12px 0; color: #0d6efd; font-size: 16px;">🏠 Income Replacement</h3>
                    <table cellpadding="4" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Monthly Income:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">$${this.income.monthly.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 13px; padding: 4px 0;">Years to Replace:</td>
                        <td align="right" style="color: #333; font-size: 13px; padding: 4px 0;">${this.income.years} years</td>
                      </tr>
                      <tr style="border-top: 1px solid #0d6efd;">
                        <td style="color: #333; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">Total:</td>
                        <td align="right" style="color: #0d6efd; font-weight: 600; font-size: 14px; padding: 8px 0 4px 0;">$${this.getIncomeTotal().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 6px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6;">
                      <strong>Ready to protect your family's future?</strong><br>
                      Contact us to discuss life insurance options to cover this gap.
                    </p>
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
                Date & Time: ${timestamp}<br>
                Browser: ${userAgent}<br>
                Platform: ${platform}<br>
                Language: ${language}<br>
                Screen Resolution: ${screenResolution}
              </p>
              <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 11px;">
                This email was generated automatically from the PFSA Life Insurance Needs Calculator.
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
      to: 'sales@mypfsa.com',
      from: 'noreply@mypfsa.com',
      subject: `Life Insurance Quote Request - ${this.userInfo.firstName} ${this.userInfo.lastName}`,
      message: htmlMessage
    };

    this.mailService.sendEmail(mailData).subscribe({
      next: () => {
        this.submitting = false;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error: (err) => {
        this.submitting = false;
        console.error('Error sending email:', err);
        alert('There was an error submitting your request. Please try again or contact us directly at sales@mypfsa.com');
      }
    });
  }
}
