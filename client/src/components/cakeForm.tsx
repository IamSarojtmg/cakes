import {
  Typography,
  TextField,
  Button,
  Box,
  Rating,
  Paper,
} from "@mui/material";
import { CakeFormTypes } from "../types/types";

function CakeForm({
  handleSubmit,
  formData,
  handleInputChange,
  formErr,
  handleYumFactorChange,
  successMsg,
  isSubmitting,
}: CakeFormTypes) {
  return (
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
  );
}

export default CakeForm;
