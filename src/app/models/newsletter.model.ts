export interface Newsletter {
  type: string;
  releaseDate: string;
  imageUrl: string;
  title: string;
  fileUrl: string;
}

export interface NewslettersByYear {
  year: number;
  newsletters: Newsletter[];
}
