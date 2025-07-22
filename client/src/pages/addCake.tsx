import { useState, FormEvent } from "react";
import { Typography, IconButton, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormData, FormErrors } from "../types/types";
import { formLogic } from "../components/formError";
import CakeForm from "../components/cakeForm";

function AddCake() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: "",
    comment: "",
    yumFactor: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [formErr, setFormErr] = useState<FormErrors>({}); //ERROR

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYumFactorChange = (event, newValue: number | null) => {
    //this
    // console.log('inside yumfactor');
    setFormData((prevData) => ({
      ...prevData,
      yumFactor: newValue,
    }));
  };
  //add page loading

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    // console.log('inside handlesubmit');
    const validationErrors = formLogic(formData); //need this to pass the current saved variables in the formdata which only populates if anything added to the form box(through onchange also know as controlled component)

    setFormErr(validationErrors);

    // console.log(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMsg(false);
      return; // STOP HERE if validation fails
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/cakes",
        formData
      );
      console.log(response);
      setSuccessMsg(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "primary.main", mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Add Cake
        </Typography>
      </Box>

      <CakeForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        formErr={formErr}
        handleYumFactorChange={handleYumFactorChange}
        successMsg={successMsg}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
}

export default AddCake;
