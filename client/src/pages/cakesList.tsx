import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
  Grid,
  Typography,
  CardActions,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { Cake } from "../types/types";

import Header from "../components/header";

function CakeList() {
  const [getCakesApi, setGetCakesApi] = useState<Cake[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCakes = async () => {
    try {
      setLoading(true);
      setError(null); 

      const response = await axios.get("http://localhost:3001/cakes");
      const fetchedCakes = response.data.cakes;
      setGetCakesApi(fetchedCakes);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 404) {
            setError(err.response.data.message);
          }
        } else if (err.request) {
          setError("Network error, could not connect to the Backend");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCakes();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
        <Typography>Loading</Typography>
      </Container>
    );
  }

  if (error) {
    if (error === "No cakes found or cakes list not available") {
      return (
        <Container sx={{ mt: 4 }}>
          <Header />
          <Alert severity="error">
            <Typography>{error}</Typography>
          </Alert>
        </Container>
      );
    } else {
      return (
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">
            <Typography>{error}</Typography>
          </Alert>
        </Container>
      );
    }
  }

  return (
    <Container>
      <Header />
      <Grid container justifyContent="center" spacing={3}>
        {getCakesApi.map((cake) => (
          <Link to={`/cakes/${cake._id}`}>
            <Grid key={cake._id} width="300px">
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={cake.imageUrl}
                    height="140"
                  />
                  <CardContent>
                    <Typography variant="h5">{cake.name}</Typography>
                    <Typography variant="body2">
                      {"⭐".repeat(cake.yumFactor)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

export default CakeList;
