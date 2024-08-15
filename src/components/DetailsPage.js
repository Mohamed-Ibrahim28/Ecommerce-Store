import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Chip,
  IconButton,
  Typography,
  Container,
  Grid,
  Rating,
  CardActions,
  Button,
  Box,
} from "@mui/material";
// functions
import { isSelected, quantityCount } from "../helper/functions";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// context
import { CardContext } from "../contexts/CardContextProvider";
// components
import Loading from "./Loading";
import { GetSingleProducts } from "../services/getSingleProducts";

const DetailsPage = () => {
  const { state, dispatch } = useContext(CardContext);
  const [currentProduct, setCurrentProduct] = useState([]);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchAPI = async () => {
      setCurrentProduct(await GetSingleProducts(id));
    };
    fetchAPI();
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 4,
        backgroundColor: "#f5f8fb", // Soft light blue background
        minHeight: "100vh", // Full height page
        paddingBottom: "40px",
      }}
    >
      <Grid container>
        {currentProduct.id ? (
          <Box
            display="flex"
            alignItems="center"
            mt={10}
            sx={{
              margin: "auto",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Grid item xs={12} md={6} mt={10}>
              <Box
                component="div"
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 3px 15px rgba(0, 0, 0, 0.1)",
                  width: "300px",
                  margin: "auto",
                  backgroundColor: "#ffffff", // White background for the image container
                  padding: "20px", // Padding around the image
                }}
              >
                <img
                  src={currentProduct.image}
                  alt={`product/${id}`}
                  width={"100%"}
                  style={{
                    borderRadius: "12px",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} my={7} md={6}>
              <Box
                component="div"
                mt={5}
                sx={{
                  border: "solid 1px #e0e0e0",
                  borderRadius: "12px",
                  padding: "25px",
                  backgroundColor: "#ffffff", // White background for the text container
                  "&:hover": {
                    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  fontWeight="600"
                  mb={3}
                  sx={{ color: "#0073e6" }} // Blue color for product title
                >
                  {currentProduct.title}
                </Typography>

                <Box component="div" display="flex" mb={2}>
                  <Typography
                    component="p"
                    variant="body1"
                    color="primary"
                    fontWeight={700}
                    mr={1}
                  >
                    Info:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {currentProduct.description}
                  </Typography>
                </Box>

                <Box component="div" display="flex" alignItems="center" mb={2}>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight={700}
                    mr={1}
                  >
                    Category:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {currentProduct.category}
                  </Typography>
                </Box>

                <Box component="div" display="flex" alignItems="center" mb={2}>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight={700}
                    mr={1}
                  >
                    Price:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${currentProduct.price}
                  </Typography>
                </Box>

                <Box component="div" display="flex" alignItems="center" mb={2}>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight={700}
                    mr={1}
                  >
                    Rate:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {currentProduct.rating.rate}
                  </Typography>
                  <Rating
                    sx={{ marginLeft: 1 }}
                    name="half-rating-read"
                    defaultValue={currentProduct.rating.rate}
                    precision={0.1}
                    readOnly
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={3}
                  sx={{ fontWeight: 500 }}
                >
                  {currentProduct.rating.count} items left in stock.
                </Typography>

                <CardActions>
                  {quantityCount(state, currentProduct.id) > 1 && (
                    <IconButton
                      onClick={() =>
                        dispatch({
                          type: "DECREASE",
                          payload: currentProduct,
                        })
                      }
                      aria-label="RemoveCircleIcon"
                      size="medium"
                    >
                      <RemoveCircleIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {quantityCount(state, currentProduct.id) === 1 && (
                    <IconButton
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: currentProduct,
                        })
                      }
                      color="error"
                      aria-label="delete"
                      size="medium"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {quantityCount(state, currentProduct.id) > 0 && (
                    <Chip
                      size="small"
                      variant="outlined"
                      color="info"
                      sx={{ ml: 1 }}
                      label={quantityCount(state, currentProduct.id)}
                    />
                  )}
                  {isSelected(state, currentProduct.id) ? (
                    <IconButton
                      aria-label="AddCircleIcon"
                      size="medium"
                      onClick={() =>
                        dispatch({
                          type: "INCREASE",
                          payload: currentProduct,
                        })
                      }
                    >
                      <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#0073e6", color: "#fff" }} // Blue button with white text
                      onClick={() =>
                        dispatch({
                          type: "ADD_ITEM",
                          payload: currentProduct,
                        })
                      }
                    >
                      Add to cart
                    </Button>
                  )}
                </CardActions>
                <Link
                  to="/products"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#0073e6", // Blue color for the back link
                    marginTop: "20px",
                  }}
                >
                  <ArrowBackIosIcon />
                  <Typography>Back to store</Typography>
                </Link>
              </Box>
            </Grid>
          </Box>
        ) : (
          <Grid item xs={12}>
            <Loading />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DetailsPage;
