import React, { useState, FormEvent } from "react";
import {
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Rating,
  Container,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number | null;
}

interface FormErrors {
  //error
  name?: string;
  imageUrl?: string;
  comment?: string;
  yumFactor?: string; //saving error message not the value of yumfactor
}

function AddCake() {
  // console.log('inside addcake');

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

  const handleBack = (): void => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    // console.log('inside handle input');
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYumFactorChange = (event, newValue: number | null) => {
    // console.log('inside yumfactor');
    setFormData((prevData) => ({
      ...prevData,
      yumFactor: newValue,
    }));
  };

  const formLogic = (data: FormData): FormErrors => {
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

    //     setTimeout(() => {
    // setIsSubmitting(true);
    // }, 2000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ color: "primary.main", mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Add Cake
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!formErr.name}
            helperText={formErr.name}
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!formErr.imageUrl}
            helperText={formErr.imageUrl}
          />

          <TextField
            label="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            error={!!formErr.comment}
            helperText={formErr.comment}
          />

          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <Typography
              component="legend"
              sx={{ mr: 2 }}
              color={!!formErr.yumFactor ? "error" : "black"}
            >
              Yum Factor:
            </Typography>
            <Rating
              name="yumFactor"
              value={formData.yumFactor}
              onChange={handleYumFactorChange}
              precision={1}
              size="large"
            />
            {formErr.yumFactor && (
              <Typography color="error" sx={{ ml: 1 }}>
                {formErr.yumFactor}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Cake"}
          </Button>
          <div>{successMsg ? "Cake added successfully" : ""}</div>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCake;
