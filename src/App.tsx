import ImageCard from "./components/ImageCard";
import { useEffect, useState } from "react";
import { useGetRecipesMutation } from "./services/recipeApi";
import {Container} from "@mui/material";

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

const containerStyle = {
  display:'grid',
  gridTemplateColumns:'repeat(4,1fr)',
  gap:'2em'
}

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

  const handleSearchClick = () => {
    setQuery(value);
    setValue("");
  };

  const handleSelect = (e: any) => {
    setHealth(e.target.value);
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={"text"}
      />
      <button onClick={handleSearchClick}>Search</button>
      <select onChange={handleSelect}>
        {options.map((option, index) => (
          <option value={option.value || ""} key={index}>
            {option.label}
          </option>
        ))}
      </select>
      <Container maxWidth={"lg"} style={containerStyle}>
          {data?.hits?.map((item: any, index: any) => (
              <ImageCard key={index} recipe={item.recipe} />
          ))}
      </Container>

    </div>
  );
}

export default App;
