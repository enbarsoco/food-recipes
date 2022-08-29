import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Application_ID = "ae07fe6a";
const Application_Keys = "c37ff75b41d900ee430f825bfd5ca535";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
  endpoints: (builder) => ({
    getRecipes: builder.mutation({
      query: ({ query, health }) => {

        return {
          url: `search?q=${query}&app_id=${Application_ID}&app_key=${Application_Keys}&&health=${health}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetRecipesMutation } = recipeApi;
