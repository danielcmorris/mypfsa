export interface LeadershipMember {
  order: number;
  name: string;
  position: string;
  councilNumber: string;
  councilName: string;
}

export interface LeadershipSet {
  title: string;
  imgPath: string;
  caption: string;
  members: LeadershipMember[];
}
