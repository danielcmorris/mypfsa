import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../models/staff.model';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="staff-area pt-100 pb-70" id="staff">
      <div class="container">

        <div class="section-title">
          <h2>Meet the PFSA Staff</h2>
        </div>

        <div class="row justify-content-center">
          @for (s of staff; track s.staffID) {
            <div class="col-lg-4 col-md-6" style="padding-bottom: 10px;">
              <div class="single-staff-box">
                <div class="staff-photo">
                  <img [src]="s.imgUri" [alt]="s.firstName + ' ' + s.lastName" loading="lazy" decoding="async" />
                </div>

                <div class="staff-content">
                  <h3>{{ s.firstName }} {{ s.lastName }}</h3>
                  <p class="title">{{ s.title }}</p>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    .staff-area { position: relative; }

    .section-title { text-align: center; margin-bottom: 35px; }
    .section-title h2 { margin: 0; }

    .single-staff-box{
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,0.06);

      height: 100%;

    }

    .staff-photo{
      width: 100%;
      aspect-ratio: 3 / 4;
      background: #f3f3f3;
      overflow: hidden;
    }

    .staff-photo img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .staff-content{
      padding: 18px 18px 20px;
      text-align: center;
    }

    .staff-content h3{
      margin: 0 0 6px;
      font-size: 20px;
    }

    .staff-content .title{
      margin: 0;
      opacity: 0.8;
      font-size: 15px;
    }
  `]
})
export class StaffComponent implements OnInit {
  staff: Staff[] = [];

  private platformId = inject(PLATFORM_ID);

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.staffService.getStaff().subscribe(data => {
        this.staff = data;
      });
    }
  }
}
