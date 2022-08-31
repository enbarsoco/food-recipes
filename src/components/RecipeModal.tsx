import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

interface PropsFunction {
  recipe: any;
  setShow: any;
  show: boolean;
}

const cardStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};

const RecipeModal: React.FC<PropsFunction> = ({
  recipe,
  show,
  setShow,
}) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={() => setShow(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Card sx={cardStyle}>
            <CardHeader title={recipe.label} />
            <CardMedia
              component="img"
              alt={recipe.label}
              height="200"
              image={recipe.image}
              title={recipe.label}
            />
            <CardContent>
              <h5>Calories: {parseInt(recipe.calories)}</h5>
              <h5>Ingredients:</h5>
              {recipe.ingredientLines.map((item: any, index: any) => (
                <Typography key={index} variant={"subtitle2"}>
                  {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default RecipeModal;
