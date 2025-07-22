import { FormData, FormErrors } from "../types/types";

export const formLogic = (data: FormData): FormErrors => {
  //this
  // console.log('inside formlogic');
  //function that has the logic to give out the right error message to the right label
  //ERROR FUNC
  const errors: FormErrors = {};

  //  if(data.name === "already named cake"){
  //   fill logic
  //  }

  if (!data.name) {
    errors.name = "Name: Required";
  }
  if (!data.imageUrl) {
    errors.imageUrl = "URL required";
  }
  if (!data.comment) {
    errors.comment = "Comment required";
  }
  if (data.comment.length > 0 && data.comment.length < 5) {
    errors.comment = "Minimum length is 5 characters";
  } else if (data.comment.length > 200) {
    errors.comment = "Maximum length is 200 characters";
  }
  if (!data.yumFactor) {
    errors.yumFactor = "Rating Required";
  }

  return errors;
};
