import React from "react";
import Wine from "../utils/Wine.json";
import CardWine from "./CardWine";
import styles from "../assets/styles/components/CardsContainer.module.css";

const CardsContainerWine = () => {
  const wines = Wine;

  return (
    <div className={styles.carrusel}>
      {wines?.map((wine) => {
        return <div className={styles.carruselItem} key={wine.id}>
          <CardWine
            id={wine.id}
            name={wine.name}
            description={wine.description}
            price={wine.price}
            picture={wine.picture}
            variety={wine.variety}
            stock={wine.stock}
            isActive={wine.isActive}
          />
        </div>
      })}
    </div>
  );
}

export default CardsContainerWine;

