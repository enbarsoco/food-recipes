import React from "react";
import { Card, CardHeader, CardMedia } from "@mui/material";

interface PropsFunction {
  toggleShow: (item: any) => void;
  recipe: any;
}

const ImageCard: React.FC<PropsFunction> = ({ recipe, toggleShow }) => {
  return (
    <Card className={"card-style"} sx={{ transition: "0.35s ease-in-out" }} onClick={()=> toggleShow(recipe)}>
      <CardHeader
        titleTypographyProps={{
          fontSize: "1.1rem",
          lineHeight: "1.5",
          letterSpacing: "2.14px",
          fontWeight: 400,
        }}
        style={{ backgroundColor: "aliceblue" }}
        title={recipe.label}
        sx={{ textAlign: "center", height: "60px", fontSize: "50px" }}
      />
      <CardMedia
        component="img"
        alt={recipe.label}
        height="200"
        image={recipe.image}
        title={recipe.label}
      />
    </Card>
  );
};

export default ImageCard;
