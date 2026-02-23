import { Component } from '@angular/core';

type StaffMember = {
  name: string;
  title: string;
  imageUrl: string;
  alt: string;
};

type CtaCard = {
  title: string;
  href: string;
  iconClass: string;
  text: string;
};

@Component({
  selector: 'app-staff',
  standalone: true,
  template: `
    <div class="staff-area pt-100 pb-70" id="staff">
      <div class="container">

        <div class="section-title">
          <h2>Meet the PFSA Staff</h2>
        </div>

        <div class="row justify-content-center">
          @for (s of staff; track s.name) {
            <div class="col-lg-4 col-md-6" style="padding-bottom: 10px;">
              <div class="single-staff-box">
                <div class="staff-photo">
                  <img [src]="s.imageUrl" [alt]="s.alt" loading="lazy" decoding="async" />
                </div>

                <div class="staff-content">
                  <h3>{{ s.name }}</h3>
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

    .clickable { cursor: pointer; }
    .clickable:focus { outline: 2px solid rgba(30,115,190,0.35); outline-offset: 3px; }
  `]
})
export class StaffComponent {
  staff: StaffMember[] = [
     {
      name: 'Miriam Ramos',
      title: 'Accounts Payable',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Miriam-Ramos-CFMO-2-1-680x1024.jpg',
      alt: 'Miriam Ramos'
    },
    {
      name: 'Bernice Armas-Martinez',
      title: 'Chief Executive Officer',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Bernice-Armas-Martinez-CEO-683x1024.png',
      alt: 'Bernice Armas-Martinez'
    },
    {
      name: 'Jerry Escobar',
      title: 'Chief Marketing Officer',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Jerry-Escobar-CMO-683x1024.png',
      alt: 'Jerry Escobar'
    },
    {
      name: 'Helen Crockett',
      title: 'Senior Accountant',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2024/07/helen-crockett.png',
      alt: 'Helen Crockett'
    },
    {
      name: 'Addie Medeiros',
      title: 'Senior Membership Services',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Addie-Medeiros-683x1024.png',
      alt: 'Addie Medeiros'
    },
    {
      name: 'Carley Azevedo',
      title: 'New Business/Publisher',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Carley-Azevedo-683x1024.png',
      alt: 'Carley Azevedo'
    },
    {
      name: 'Billy Gonzales',
      title: 'Accounting Clerk/Agent',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Billy-Gonzales-683x1024.png',
      alt: 'Billy Gonzales'
    },
   
    {
      name: 'Maricarmen Aguilar',
      title: 'Data Entry Clerk',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Maricarmen-Aguilar_-1-683x1024.jpg',
      alt: 'Maricarmen Aguilar'
    }
    ,
    {
      name: 'Hailey Magana',
      title: 'Data Entry Clerk',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Hailey-Magana-683x1024.png',
      alt: 'Hailey Magana'
    }
    ,
    {
      name: 'Erica Calderon',
      title: 'Data Entry Clerk',
      imageUrl: 'https://www.mypfsa.org/wp-content/uploads/2026/02/Erica-Calderon-683x1024.png',
      alt: 'Erica Calderon'
    }
  ];

  

  open(url: string): void {
    window.open(url, '_self');
  }
}
