import React from "react";

export const PokemonCard = ({ name, src }: { name: string; src: string }) => {
  return (
    <div>
      {name}
      <img src={src}></img>
    </div>
  );
};
