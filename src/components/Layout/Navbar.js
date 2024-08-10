import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Toolbar,
  AppBar,
  Badge,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CardContext } from "../../contexts/CardContextProvider";

// Import your logo image
import logo from "../../assets/img/retail-shop.png";

const Navbar = () => {
  const { state } = useContext(CardContext);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "#282c33", // Solid background color for a modern look
        color: "#ffffff", // White text color
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem", // Adequate padding for spacing
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={logo}
                alt="Store Logo"
                style={{ height: "40px", marginRight: "1rem" }}
              />
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#ffffff",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Store
            </Link>
          </Box>
          <Link to="/cards" style={{ color: "inherit" }}>
            <IconButton color="inherit">
              <Badge badgeContent={state.itemsCounter} color="secondary">
                <ShoppingCartIcon
                  sx={{
                    fontSize: "30px",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
