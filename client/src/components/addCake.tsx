import { useState, FormEvent } from "react";
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

interface FormData {
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number | null; // null because Rating can be null initially
}

function AddCake() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: "",
    comment: "",
    yumFactor: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBack = (): void => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYumFactorChange = (event, newValue: number | null) => {
    setFormData((prevData) => ({
      ...prevData,
      yumFactor: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);

    console.log("Form data to submit:", formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
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
            required
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
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
            required
          />

          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <Typography component="legend" sx={{ mr: 2 }}>
              Yum Factor:
            </Typography>
            <Rating
              name="yumFactor"
              value={formData.yumFactor}
              onChange={handleYumFactorChange}
              precision={1}
              size="large"
              required
            />
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
        </form>
      </Paper>
    </Container>
  );
}

export default AddCake;
