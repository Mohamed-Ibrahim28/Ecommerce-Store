import { useContext } from "react";
import { Container, Grid } from "@mui/material";
import "../assets/styles/components/_store.scss";
// context
import { ProductContext } from "../contexts/ProductContextProvider";
// components
import Products from "./common/Products";
import Loading from "./Loading";
import { GetAllCategories } from "../services/getAllCategories";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Store = () => {
  const products = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    setCategories(await GetAllCategories());
    console.log("Get all categories", categories);
    setLoading(false);
  };

  const filterProducts = (category) => {
    return products.filter((product) => product.category === category);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <Grid container>
        {categories.length ? (
          categories.map((category) => (
            <Grid item xs={12} key={category} className="Category-Section">
              <Typography variant="h4" sx={{ mt: 4 }}>
                {category}
              </Typography>
              {filterProducts(category).length > 0 ? (
                <Grid container spacing={2} mt={2}>
                  {filterProducts(category).map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Products productData={product} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="h6" sx={{ mt: 4 }}>
                  No products available
                </Typography>
              )}
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Loading />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Store;
