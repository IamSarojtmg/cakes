import axios from "axios";
import {
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
  FormEvent,
} from "react";
import { useParams } from "react-router-dom";
import { FormData, Cake, FormErrors } from "../types/types";
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
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formLogic } from "../components/formError";


function EditCake() {
  const navigate = useNavigate();
  const { cakeid } = useParams<string>();
  const [getCake, setGetCake] = useState<Cake>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: "",
    comment: "",
    yumFactor: null,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [formErr, setFormErr] = useState<FormErrors>({}); //ERROR

  const cakeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/cakes/${cakeid}`);
      const individualCake: Cake = response.data;
      setGetCake(individualCake);

      setFormData({
        name: individualCake.name,
        imageUrl: individualCake.imageUrl,
        comment: individualCake.comment,
        yumFactor: individualCake.yumFactor,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cakeDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYumFactor = (e: SyntheticEvent, newValue: number | null) => {
    setFormData((prevData) => ({
      ...prevData,
      yumFactor: newValue,
    }));
  };


  const handleUpdate = async (event: FormEvent): Promise<void> => {
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
      const response = await axios.put(
        `http://localhost:3001/cakes/${cakeid}`,
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

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (getCake) {
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
            Edit Cake
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <form onSubmit={handleUpdate}>
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
                onChange={handleYumFactor}
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
              {isSubmitting ? "Updating..." : "Update Cake"}
            </Button>
            <div>{successMsg ? "Cake updated successfully" : ""}</div>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default EditCake;
