export interface Magazine {
  type: string;
  releaseDate: string;
  imageUrl: string;
  title: string;
  fileUrl: string;
}

export interface MagazinesByYear {
  year: number;
  magazines: Magazine[];
}
