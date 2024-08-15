import { useContext, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import "../assets/styles/components/_store.scss";

// Context
import { ProductContext } from "../contexts/ProductContextProvider";

// Components
import Products from "./common/Products";

// Services
import { GetAllCategories } from "../services/getAllCategories";

const Store = () => {
  const products = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await GetAllCategories();
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const filterProducts = (category) =>
    products.filter((product) => product.category === category);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f8fb", // Light blue background
        }}
      >
        <CircularProgress sx={{ color: "#0073e6" }} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        backgroundColor: "#f5f8fb", // Light blue background
        minHeight: "100vh", // Full height page
        paddingBottom: "40px",
      }}
    >
      <Grid container spacing={4}>
        {categories.length ? (
          categories.map((category) => (
            <Grid item xs={12} key={category} className="Category-Section">
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundColor: "#ffffff", // White background for the paper section
                  borderLeft: `6px solid #0073e6`,
                  "&:hover": { backgroundColor: "#ff00ff00" }, // Hover effect
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.1)", // Soft shadow
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#0073e6", // Blue color for category titles
                  }}
                >
                  {category}
                </Typography>
                {filterProducts(category).length > 0 ? (
                  <Grid container spacing={3}>
                    {filterProducts(category).map((product) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product.id}
                        sx={{
                          "&:hover": {
                            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", // Hover shadow for product cards
                            transition: "all 0.3s ease-in-out",
                            transform: "translateY(-5px)", // Hover lift effect
                          },
                        }}
                      >
                        <Products productData={product} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      color: "#808080",
                      textAlign: "center",
                    }}
                  >
                    No products available
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f8fb", // Keep consistent background
              }}
            >
              <CircularProgress sx={{ color: "#0073e6" }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Store;
