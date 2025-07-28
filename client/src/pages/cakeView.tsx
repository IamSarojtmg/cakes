import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Cake } from "../types/types";
import DeleteIcon from "@mui/icons-material/Delete";

function IndividualCake() {
  const navigate = useNavigate();

  const handleBack = (): void => {
    navigate(-1);
  };
  const { cakeid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [getCakeApi, setGetCakesApi] = useState<Cake | null>(null);
  const getCake = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/cakes/${cakeid}`);
      const fetchedCake = response.data;
      setGetCakesApi(fetchedCake);
    } catch (error) {
      //add error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCake();
  }, []);

  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!cakeid) {
      setDeleteStatus(`No cake found`);
      return;
    }
    if (!window.confirm("Are you sure you want to delete the cake")) {
      return;
    }
    setDeleteStatus("Deleting..."); // Provide feedback

    try {
      await axios.delete(`http://localhost:3001/cakes/${cakeid}`);
      setDeleteStatus("Cake has been deleted");

      setTimeout(() => {
        navigate("/cakes");
      }, 3000);
    } catch (error) {
      console.error(error);
      //Code errors later
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
        <Typography ml={2}>Loading cake details...</Typography>
      </Container>
    );
  }
  if (getCakeApi) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" mb={1} alignItems="center">
          <IconButton
            onClick={handleBack}
            sx={{ color: "primary.main", mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, textAlign: "center", ml: 1, mr: 1 }}
          >
            {getCakeApi.name}
          </Typography>
          <IconButton
            sx={{
              color: "transparent",
              pointerEvents: "none",
              visibility: "hidden",
              mr: 1,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box>
          <Card>
            <CardMedia
              component="img"
              image={getCakeApi.imageUrl}
              height={400}
              sx={{ objectFit: "cover" }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                border: "solid red",
              }}
            >
              <Typography sx={{ mb: 1 }} variant="body1">
                {getCakeApi.comment}
              </Typography>
              <Typography variant="body2">
                {"⭐".repeat(getCakeApi.yumFactor)}
              </Typography>
              <Box>
                <Link to={`/cakes/edit/${cakeid}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>

                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
                {deleteStatus && (
                  <Alert sx={{ mt: 2 }}>
                    <Typography>{deleteStatus}</Typography>
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }
}

export default IndividualCake;
