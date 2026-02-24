import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

          @if (loading) {
            @for (i of skeletons; track i) {
              <div class="col-lg-4 col-md-6" style="padding-bottom: 10px;">
                <div class="single-staff-box skeleton-box">
                  <div class="staff-photo skeleton-photo"></div>
                  <div class="staff-content">
                    <div class="skeleton-line skeleton-name"></div>
                    <div class="skeleton-line skeleton-title"></div>
                  </div>
                </div>
              </div>
            }
          }

          @if (!loading) {
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
          }

        </div>

      </div>
    </div>
  `,
  styles: [`
    .staff-area { position: relative; }

    .section-title { text-align: center; margin-bottom: 35px; }
    .section-title h2 { margin: 0; }

    .single-staff-box {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,0.06);
      height: 100%;
    }

    .staff-photo {
      width: 100%;
      aspect-ratio: 3 / 4;
      background: #f3f3f3;
      overflow: hidden;
    }

    .staff-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .staff-content {
      padding: 18px 18px 20px;
      text-align: center;
    }

    .staff-content h3 {
      margin: 0 0 6px;
      font-size: 20px;
    }

    .staff-content .title {
      margin: 0;
      opacity: 0.8;
      font-size: 15px;
    }

    /* Skeleton */
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }

    .skeleton-photo {
      background: linear-gradient(90deg, #ececec 25%, #e0e0e0 50%, #ececec 75%);
      background-size: 800px 100%;
      animation: shimmer 1.4s infinite linear;
    }

    .skeleton-line {
      border-radius: 4px;
      background: linear-gradient(90deg, #ececec 25%, #e0e0e0 50%, #ececec 75%);
      background-size: 800px 100%;
      animation: shimmer 1.4s infinite linear;
      margin: 0 auto 8px;
    }

    .skeleton-name  { height: 18px; width: 65%; }
    .skeleton-title { height: 14px; width: 45%; margin-bottom: 0; }
  `]
})
export class StaffComponent implements OnInit {
  staff: Staff[] = [];
  loading = true;
  skeletons = Array(10);

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getStaff().subscribe(data => {
      this.staff = data;
      this.loading = false;
    });
  }
}
