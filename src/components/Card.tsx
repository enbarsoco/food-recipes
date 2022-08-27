import React from "react";

interface PropsFunction {
  recipe: any;
}

const Card: React.FC<PropsFunction> = ({ recipe }) => {
  return (
    <div>
      <section>
          <img src={recipe.image}/>
          {recipe.label}
      </section>
    </div>
  );
};

export default Card;
