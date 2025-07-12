import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Cake {
  _id: string;
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCake();
  }, []);

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
              sx={{ display: "flex", flexDirection: "column", p: 3 }}
            >
              <Typography sx={{ mb: 1 }} variant="body1">
                {getCakeApi.comment}
              </Typography>
              <Typography variant="body2">
                {"⭐".repeat(getCakeApi.yumFactor)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }
}

export default IndividualCake;
