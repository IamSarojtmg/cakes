import { FormEvent, ChangeEvent, SyntheticEvent } from "react";
export interface FormData {
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

export interface CakeFormTypes {
  formData: FormData;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formErr: FormErrors;
  handleYumFactorChange: (
    event: SyntheticEvent,
    newValue: number | null
  ) => void;
  successMsg: boolean;
  isSubmitting: boolean;
}

