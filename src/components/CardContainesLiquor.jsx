import React from "react";

//Importación de json
import Liguor from "../utils/Liquor.json";

//Importación de la Card de vino
import CardLiquor from "./CardWine";

//Importación de estilos
import styles from "../assets/styles/components/CardsContainer.module.css";

const CardsContainerLiquor = () => {
  const liquors = Liguor;

  return (
    <div className={styles.carrusel}>
      {liquors?.map((liquor) => {
        return <div className={styles.carruselItem} key={liquor.id}>
          <CardLiquor
            id={liquor.id}
            name={liquor.name}
            descriptión={liquor.description}
            price={liquor.price}
            picture={liquor.picture}
            variety={liquor.variety}
            graduation={liquor.graduation}
            stock={liquor.stock}
            isActive={liquor.isActive}
          />
        </div>
        })}
    </div>
  );
}

export default CardsContainerLiquor;
