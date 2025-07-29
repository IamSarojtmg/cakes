import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function Header() {
  return (
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
  );
}

export default Header;
