import axios from "axios";
import { useEffect, useState, SyntheticEvent, FormEvent,ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { FormData, Cake, FormErrors } from "../types/types";
import { Typography, IconButton, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formLogic } from "../components/formError";
import CakeForm from "../components/cakeForm";

function EditCake() {
  const navigate = useNavigate();
  const { cakeid } = useParams<string>();
  const [getCake, setGetCake] = useState<Cake>(); //will stay here
  const [loading, setLoading] = useState<boolean>(true); //will stay here
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
      const individualCake: Cake = response.data.cake;
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

  const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYumFactorChange = (
    e: SyntheticEvent,
    newValue: number | null
  ) => {
    console.log(e.target);//only making sure e is delcared for CICD
    
    setFormData((prevData) => ({
      ...prevData,
      yumFactor: newValue,
    }));
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
      console.log('done 1');
      
  await axios.put(
        `http://localhost:3001/cakes/${cakeid}`,
        formData
      );
      console.log('done');
      
      setSuccessMsg(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response){
        setFormErr({ name: error.response.data.message });
      }
    } finally {
      console.log("finally");
      setIsSubmitting(false);
    }
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
}

export default EditCake;
