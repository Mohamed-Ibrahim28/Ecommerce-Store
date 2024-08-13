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
        }}
      >
        <CircularProgress sx={{ color: "#1976d2" }} />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {categories.length ? (
          categories.map((category) => (
            <Grid item xs={12} key={category} className="Category-Section">
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#f0f8ff",
                  borderLeft: `6px solid #1976d2`,
                  "&:hover": { backgroundColor: "#e0f7fa" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#1976d2",
                  }}
                >
                  {category}
                </Typography>
                {filterProducts(category).length > 0 ? (
                  <Grid container spacing={3}>
                    {filterProducts(category).map((product) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
              }}
            >
              <CircularProgress sx={{ color: "#1976d2" }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Store;
