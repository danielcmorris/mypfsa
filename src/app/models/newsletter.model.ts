export interface Newsletter {
  newsletterID: number;
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
