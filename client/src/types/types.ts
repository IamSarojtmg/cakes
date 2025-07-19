export interface FormData{
      name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number | null;
}

export interface FormErrors {
  //error
  name?: string;
  imageUrl?: string;
  comment?: string;
  yumFactor?: string; //saving error message not the value of yumfactor
}

export interface Cake {
  _id: string;
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}