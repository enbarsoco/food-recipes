import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useGetRecipesMutation } from "./services/recipeApi";

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
      {data?.hits?.map((item: any, index: any) => (
        <Card key={index} recipe={item.recipe} />
      ))}
    </div>
  );
}

export default App;
