import React from "react";

export const PokemonCard = ({
  name,
  src,
  types,
}: {
  name: string;
  src: string;
  types: string[];
}) => {
  return (
    <div className="pokemon-card">
      <img src={src} alt={name}></img>
      <h4>{name}</h4>
      <div className="pokemon-types">
        {types.map((type, index) => (
          <span key={index} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
