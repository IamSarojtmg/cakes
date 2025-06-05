import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface cakesInfo {
  name: string;
  imageURL: string;
  rating: number;
}

const cakeData: cakesInfo[] = [
  {
    name: "carrot cake",
    imageURL:
    "https://static01.nyt.com/images/2020/11/01/dining/Carrot-Cake-textless/Carrot-Cake-textless-jumbo.jpg?quality=75&auto=webp",
    rating: 5,
  },
  {
    name: "red velvet",
    imageURL:
    "https://www.allrecipes.com/thmb/h3tLDtMD7GgjIKOqATYemkacrMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9295_redvelvetcake_ddmfs_step3_4x3_1091-9dfdff5a4bc8404697202d166d493200.jpg",
    rating: 3,
  },
];

function CakeList() {
  const [cakes, setCakes] = useState(cakeData);
  
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mb={4}
        >
        <Typography variant="h4">View all cakes</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained">Add cake</Button>
          <Button variant="outlined">Favourites cakes</Button>
        </Box>
      </Box>

      <Grid container direction="column" spacing={3}>
        {cakes.map((cake, i) => (
          <Grid item key={i}>
            <Card sx={{ display: 'flex', flexDirection: 'row', border:"solid red"}}>
              <CardMedia
                component="img"
                image={cake.imageURL}
                alt={cake.name}
                sx={{ width: 160, height: 160, objectFit: "cover", border:"solid"}}
                />
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", border:"solid blue" }}>
                <Typography variant="h6">{cake.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {"⭐".repeat(cake.rating)}
                </Typography>
                <Button variant="contained" sx={{ mt: 2, width: "fit-content" }}>
                  Add to Fav
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CakeList;









// import { useState } from "react";

// interface cakesInfo {
//   name: string;
//   imageURL: string;
//   rating: number;
// }

// const cakeData: cakesInfo[] = [{
//   name: "carrot cake",
//   imageURL:
//     "https://static01.nyt.com/images/2020/11/01/dining/Carrot-Cake-textless/Carrot-Cake-textless-jumbo.jpg?quality=75&auto=webp",
//   rating: 5,
// },

//  {
//   name: "red velvet",
//   imageURL:
//     "https://www.allrecipes.com/thmb/h3tLDtMD7GgjIKOqATYemkacrMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9295_redvelvetcake_ddmfs_step3_4x3_1091-9dfdff5a4bc8404697202d166d493200.jpg",
//   rating: 3,
// }];



// function CakeList() {

//   const [cakes, setCakes] = useState<cakesInfo[]>(cakeData);

//   return (
//     <>
//       <header>
//         <h1>View all cakes</h1>
//         <div>
//           <button>Add cake</button>
//           <button>Favourites cakes</button>
//         </div>
//       </header>
//       <main className="cakelist-cont">

//           {cakes.map((cake, i) => (
//             <div className="each-cake" key={i}>
//               <div>{cake.name}</div>
//               <img src={cake.imageURL} alt="image of the cake" />
//               <div>{"⭐".repeat(cake.rating)}</div>
//               <button>Add to Fav</button>
//             </div>
//           ))}

//       </main>
//     </>
//   );
// }

// export default CakeList;