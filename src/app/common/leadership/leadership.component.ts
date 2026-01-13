import { Component } from '@angular/core';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [],
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss'
})
export class LeadershipComponent {

  leadershipSets: any[] = [];




  constructor() {

    let board = {
      title: 'PFSA Board of Directors',
      imgPath: '/img/leadership/board.jpg',
      caption: 'John P. Camara, Al Furtado, Robert A. Bertao, Ted A. Pedrozo, Duane S. Oliveira, Stephanie M. Koch, Melanie M. Santos',
      members: [
        { order: 1, name: 'John P. Camara', position: 'Chairman of the Board', councilNumber: 46, councilName: 'Tulare' },
        { order: 2, name: 'Robert A. Bertao', position: 'Vice-Chairman of the Board', councilNumber: 21, councilName: 'Los Banos-Dos Palos' },
        { order: 3, name: 'Melanie M. Santos', position: 'Secretary of the Board', councilNumber: 20, councilName: 'Merced' },
        { order: 4, name: 'Duane S. Oliveira', position: 'Director of the Board', councilNumber: 51, councilName: 'Sacramento' },
        { order: 5, name: 'Stephanie M. Koch', position: 'Director of the Board', councilNumber: 3, councilName: 'Eureka' },
        { order: 6, name: 'Al Furtado', position: 'Director of the Board', councilNumber: 44, councilName: 'San Jose' },
        { order: 6, name: 'Ted A. Pedrozo', position: 'Director of the Board', councilNumber: 20, councilName: 'Merced' },
        { order: 6, name: 'Joseph Pinheiro', position: 'Director of the Board Ex-Officio', councilNumber: 8, councilName: 'Santa Mariaa' },
      ]
    }
    this.leadershipSets.push(board);

    let eo = {
      title: 'Executive Officers',
      imgPath: '/img/leadership/executive-officers.jpg',
      caption: 'Bernice Armas-Martinez, Jerry Escobar',
      members: [
        { order: 1, name: '	Bernice Armas-Martinez', position: 'Chief Executive Officer', councilNumber: 26, councilName: 'Stevinson/Turlock/Hilmar' },
        { order: 2, name: '	Jerry Escobar', position: 'Chief Marketing Officer', councilNumber: 14, councilName: 'Mt. View' },

      ]
    }

    this.leadershipSets.push(eo);



    let supremeCouncil = {
      title: 'Supreme Council Officers',
      imgPath: '/img/leadership/supreme-council-officers2.jpg',
      caption: 'Donald Costa, Rui Rodriguez, Lisa Simmons Kross, Mark Rocha, Nizia Hogan',
      members: [
        { order: 1, name: 'Donald Costa', position: 'Supreme President', councilNumber: '26', councilName: 'Stevinson/Turlock/Hilmar' },
        { order: 2, name: 'Rui Rodrigues', position: 'Supreme Vice-President', councilNumber: '14', councilName: 'Mt. View' },
        { order: 2, name: 'Lisa Simons Kross,', position: 'Supreme Master of Ceremonies', councilNumber: '14', councilName: '' },
        { order: 2, name: 'Mark Rocha,', position: 'Supreme Marshal', councilNumber: '5/36', councilName: 'Hayward' },
        { order: 2, name: '	Nizia Hogan', position: 'Supreme Guard', councilNumber: '200', councilName: 'Lathrop' },
      ]
    }



    this.leadershipSets.push(supremeCouncil);

    let supreme2030Officers = {
      title: 'SUPREME 20-30\'s OFFICERS',
      imgPath: '/img/leadership/supreme-council-20-30-officers.jpg',
      caption: `Top Row: Andrew Gamez, Danae Underwood, Madison Pinheiro, Angela Azevedo, Carley Azevedo, Kayleigh Gilbert, Miriam Work, Suzie Lourenco - 
      Bottom Row: Angela Seamas, Maria Helena Lopez, Arielle Costa, Danielle Seamas`,
      members: [
        { order: 2, name: 'Miriam Work', position: 'Supreme 20-30’s President', councilNumber: '99', councilName: 'Lompoc' },
        { order: 2, name: 'Maria Helena Lopez,', position: 'Supreme 20-30’s Vice President', councilNumber: '54', councilName: 'Bencia/Vallejo' },
        { order: 2, name: 'Carley Azevedo', position: 'Supreme 20-30’s Secretary', councilNumber: '100', councilName: 'Oakdale, Escalon, Riverbank' },
        { order: 2, name: 'Danae Underwood', position: 'Supreme 20-30’s Treasurer', councilNumber: '200', councilName: 'Lathrop' },
        { order: 2, name: 'Kayleigh Gilbert', position: 'Supreme 20-30’s Mistress of Ceremonies', councilNumber: '100', councilName: 'Oakdale, Escalon, Riverbank' },
        { order: 2, name: 'Madison Pinheiro', position: 'Supreme 20-30’s Marshal', councilNumber: '8', councilName: 'Santa Maria' },
        { order: 2, name: 'Arielle Costa', position: 'Supreme 20-30’s Guard', councilNumber: '21', councilName: 'Los Banos/Dos Palos' },
        { order: 2, name: 'Angela Azevedo', position: 'Supreme 20-30’s Director', councilNumber: '100', councilName: 'Oakdale, Escalon, Riverbank' },
        { order: 2, name: 'Danielle Seamas', position: 'Supreme 20-30’s Director', councilNumber: '200', councilName: 'Lathrop' },
        { order: 2, name: 'Andrew Gamez', position: 'Supreme 20-30’s Director', councilNumber: '200', councilName: 'Lathrop' },
        { order: 2, name: 'Angela Seamas', position: 'Supreme 20-30’s Director', councilNumber: '200', councilName: 'Lathrop' },
        { order: 2, name: 'Suzie Lourenco', position: 'Supreme 20-30’s Director', councilNumber: '76', councilName: 'Artesia' },


      ]
    }

    this.leadershipSets.push(supreme2030Officers);

    let supremeYouth = {
      title: 'Supreme Youth Officers',
      imgPath: '/img/leadership/supreme-youth-officers.jpg',
      caption: `Top Row: Lisa Simons Kross, Paula Silva, Kayden Kross, Joseph Reyes Jr., Mia Silva, Claire Vallance, Madison Pinheiro<br>
      Bottom Row: Cash Koch, Ruby Love Koch, Marissa Geston, Xavier Vallance`,
      members: [
        { order: 1, name: 'Joseph Reyes Jr.', position: 'Supreme Youth President', councilNumber: '44', councilName: 'San Jose' },
        { order: 2, name: 'Mia Silva', position: 'Supreme Youth Vice President', councilNumber: '26', councilName: 'Stevinson/Turlock/Hilmar' },
        { order: 3, name: 'Claire Vallance', position: 'Supreme Youth Secretary', councilNumber: '38', councilName: 'Modesto' },
        { order: 4, name: 'Kaden Kross', position: 'Supreme Youth Master of Ceremonies', councilNumber: '5/36', councilName: 'Hayward' },
        { order: 5, name: 'Marissa Geston', position: 'Supreme Youth Marshal', councilNumber: '66', councilName: 'Visalia' },
        { order: 6, name: 'Ruby Love Koch', position: 'Supreme Youth Guard', councilNumber: '3', councilName: 'Eureka' },
        { order: 7, name: 'Cash Koch', position: 'Supreme Youth Director', councilNumber: '3', councilName: 'Eureka' },
        { order: 8, name: 'Xavier Vallance', position: 'Supreme Youth Director', councilNumber: '38', councilName: 'Modesto' },
        { order: 9, name: 'Paula Silva', position: 'State Youth Director', councilNumber: '16', councilName: 'Newark' },
        { order: 10, name: 'Lisa Simons Kross', position: 'Youth Advisor', councilNumber: '5/36', councilName: 'Hayward' },
        { order: 11, name: 'Madison Pinheiro', position: 'Youth Advisor', councilNumber: '8', councilName: 'Santa Maria' }
      ]
    }

    this.leadershipSets.push(supremeYouth);

    let activities = {
      title: 'FRATERNAL ACTIVITIES COMMITTEE',
      imgPath: '/img/leadership/fraternal-activities.jpg',
      caption: 'Joseph Pinheiro, Donald J. Costa, Deolinda Faria-Pauley, Michael Fraga, Juanita Pedrozo, Jerry Escobar Terra Nessler, Angela Seamas, Bernice Armas-Martinez, Lisa Simons',
      members: [
        { order: 1, name: 'Jerry Escobar', position: 'Chairman', councilNumber: '14', councilName: 'Mountain View' },
        { order: 2, name: 'Angela Seamas', position: 'Supreme President', councilNumber: '200', councilName: 'Lathrop' },
        { order: 3, name: 'Donald J. Costa', position: 'Supreme Vice-President', councilNumber: '46', councilName: 'Tulare' },
        { order: 4, name: 'Terra Nessler', position: 'Supreme Master of Ceremonies', councilNumber: '99', councilName: 'Lompoc' },
        { order: 5, name: 'Angela Azevedo', position: 'Supreme 20-30s President', councilNumber: '100', councilName: 'Oakdale, Escalon, Riverbank' },
        { order: 6, name: 'Lisa Simons', position: 'Supreme Marshal', councilNumber: '5/36', councilName: 'Hayward' },
        { order: 7, name: 'Juanita Pedrozo', position: 'Past Supreme President', councilNumber: '20', councilName: 'Merced' },
        { order: 8, name: 'Michael Fraga', position: 'Past Supreme President', councilNumber: '4', councilName: 'Arcata' },
        { order: 9, name: 'Bernice Armas-Martinez', position: 'Chief Executive Officer', councilNumber: '26', councilName: 'Stevinson/Turlock/Hilmar' },
        { order: 10, name: 'Deolinda Faria-Pauley', position: 'Member', councilNumber: '13', councilName: 'Tracy' }
      ]
    }

    this.leadershipSets.push(activities);

    let scholarship = {
      title: 'SCHOLARSHIP FOUNDATION DIRECTORS',
      imgPath: '/img/leadership/PFSA-Scholarship-Foundation.jpg',
      caption: 'Kathleen George, Maria A. Bertao, Donald J. Costa, Luisiana S. Drumonde, Mary G. Medeiros, Antoinette F. Duarte, Fran V. Carvalho',
      members: [
        { order: 1, name: 'Antoinette F. Duarte', position: 'Chairman', councilNumber: '118', councilName: 'Elk Grove' },
        { order: 2, name: 'Mary G. Medeiros', position: 'Vice-Chairman', councilNumber: '13', councilName: 'Tracy' },
        { order: 3, name: 'Frances V. Carvalho', position: 'Secretary', councilNumber: '38', councilName: 'Modesto' },
        { order: 4, name: 'Isolete Facão-Grácio', position: 'Treasurer', councilNumber: '24', councilName: 'San Leandro' },
        { order: 5, name: 'Luisiana S. Drumonde', position: 'Assistant Treasurer', councilNumber: '7', councilName: 'Gustine/Newman' },
        { order: 6, name: 'Maria A Bertao', position: 'Director', councilNumber: '21', councilName: 'Los Banos-Dos Palos' },
        { order: 7, name: 'Donald J. Costa', position: 'Director', councilNumber: '46', councilName: 'Tulare' },
        { order: 8, name: 'Kathleen Georg', position: 'Director', councilNumber: '38', councilName: 'Modesto' },

      ]
    }

    this.leadershipSets.push(scholarship);



  }
}
//  {order: 6, name:'',position:'President', councilNumber: 46, councilName:'123, Modesto Council' },
