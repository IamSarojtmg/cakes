import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
  Grid,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

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

function CakeList() {
  const [getCakesApi, setGetCakesApi] = useState<Cake[]>([]);
  const getCakes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cakes");
      const fetchedCakes = response.data.cakes;
      setGetCakesApi(fetchedCakes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCakes();
  }, []);
 

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mb={4}
        alignItems="center"
      >
        <Typography variant="h4">View all cakes</Typography>
        <Box display="flex" gap={2}>
          <Link to={"/add-cake"}>
            <Button variant="contained">Add cake</Button>
          </Link>
          <Button variant="outlined">Favourites cakes</Button>
        </Box>
      </Box>

      <Grid container justifyContent="center" spacing={3}>
        {getCakesApi.map((cake) => (
          <Link to={`/cakes/${cake._id}`}>
          <Grid key={cake._id} width="300px">
            <Card elevation={3}>
              <CardActionArea>
                <CardMedia component="img" image={cake.imageUrl} height="140" />
                <CardContent>
                  <Typography variant="h5">{cake.name}</Typography>
                  <Typography variant="body2">
                    {"⭐".repeat(cake.yumFactor)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
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