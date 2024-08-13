import { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import { Box, Typography, Paper, Container } from "@mui/material";
// Components
import Card from "./Card";

// Context
import { CardContext } from "../contexts/CardContextProvider";

const ShopCard = () => {
  const { state, dispatch } = useContext(CardContext);

  return (
    <Container>
      <Box
        component="div"
        sx={{ p: 4, backgroundColor: "#f0f8ff", borderRadius: 4 }}
      >
        {state.itemsCounter > 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#e3f2fd",
              borderLeft: `6px solid #1976d2`,
            }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body1" color="primary" fontWeight={700}>
                Total Items:
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={400}
              >
                {state.itemsCounter}
              </Typography>
            </Box>

            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body1" color="primary" fontWeight={700}>
                Total Payments:
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={400}
              >
                ${state.total}
              </Typography>
            </Box>

            <Box component="div" sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => dispatch({ type: "CHECKOUT" })}
                sx={{ mr: 2, px: 4 }}
              >
                Check Out
              </Button>
              <Button
                variant="outlined"
                onClick={() => dispatch({ type: "CLEAR" })}
                color="error"
                sx={{ fontWeight: "bold", px: 4 }}
              >
                Clear
              </Button>
            </Box>
          </Paper>
        )}

        {state.checkout &&
          (swal({
            text: "Checked Out Successfully!",
            icon: "success",
          }),
          (
            <Paper
              elevation={3}
              sx={{ p: 4, backgroundColor: "#e8f5e9", textAlign: "center" }}
            >
              <Typography variant="h4" color="primary" fontWeight={700} mb={2}>
                Checked Out Successfully!
              </Typography>
              <Link
                to="/products"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Back to Shop
              </Link>
            </Paper>
          ))}

        {!state.checkout && state.itemsCounter === 0 && (
          <Paper
            elevation={3}
            sx={{ p: 4, backgroundColor: "#ffebee", textAlign: "center" }}
          >
            <Typography variant="h4" color="primary" fontWeight={700} mb={2}>
              Your cart is empty!
            </Typography>
            <Link
              to="/products"
              style={{
                textDecoration: "none",
                color: "#d32f2f",
                fontWeight: "bold",
              }}
            >
              Back to Shop
            </Link>
          </Paper>
        )}

        <Box component="div" sx={{ mt: 4 }}>
          {state.selectedItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                mb: 3, // Slightly smaller margin
                padding: 2, // Add some padding
                "&:hover": {
                  boxShadow: 3, // Subtle shadow effect
                  transform: "translateY(-3px)", // Slight lift on hover
                  transition: "all 0.2s ease-in-out", // Quick transition
                },
              }}
            >
              <Box sx={{ transform: "scale(0.95)" }}>
                {" "}
                {/* Smaller size */}
                <Card data={item} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ShopCard;
