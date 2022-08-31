import ImageCard from "./components/ImageCard";
import { useEffect, useState } from "react";
import { useGetRecipesMutation } from "./services/recipeApi";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Container,
  InputAdornment,
  Link,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import RecipeModal from "./components/RecipeModal";
import Loader from "./components/Loader";
import Error from "./components/Error";

const options = [
  {
    label: "Vegan",
    value: "vegan",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
  {
    label: "Paleo",
    value: "paleo",
  },
  {
    label: "Dairy Free",
    value: "dairy-free",
  },
  {
    label: "Low Sugar",
    value: "low-sugar",
  },
  {
    label: "Egg Free",
    value: "egg-free",
  },
];

function App() {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("vegan");
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({});

  const [getRecipes, { data, isError, error, isLoading }] =
    useGetRecipesMutation();
  useEffect(() => {
    getFoodRecipes();
  }, [query, health]);

  const getFoodRecipes = async () => {
    await getRecipes({ query, health });
  };

  const handleSelect = (e: any) => {
    setHealth(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setQuery(value);
    setValue("");
  };

  const toggleShow = (recipe: any) => {
    setShow(!show);
    setRecipe(recipe);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }
  return (
    <>
      <AppBar position={"static"} style={{ backgroundColor: "aliceblue" }}>
        <Toolbar>
          <Typography variant={"h5"}>
            <Link underline={"none"} href="/" style={{ color: "#868686" }}>
              Edamam Recipes
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          gap: "5em",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <TextField
            placeholder={"Search for recipe..."}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type={"text"}
          />

          <Button
            type={"submit"}
            variant={"contained"}
            sx={{ height: "55px" }}
            className={"button-style"}
          >
            Search
          </Button>
        </div>
        <Select
          native
          value={health}
          onChange={handleSelect}
          style={{ float: "right" }}
        >
          {options.map((option, index) => (
            <option value={option.value || ""} key={index}>
              {option.label}
            </option>
          ))}
        </Select>
      </Box>
      <Container
        maxWidth={"lg"}
        sx={{ display: "grid" }}
        className={"container-style"}
      >
        {data?.hits?.map((item: any, index: any) => (
          <ImageCard toggleShow={toggleShow} key={index} recipe={item.recipe} />
        ))}
        {show && <RecipeModal recipe={recipe} setShow={setShow} show={show} />}
      </Container>
    </>
  );
}

export default App;
