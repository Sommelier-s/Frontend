import React from 'react';
import { useSelector } from 'react-redux';

//Importación del componente CardWine
import CardWine from './CardWine';

//Importación de estilos
import styles from '../assets/styles/components/CardsContainer.module.css';

const CardsContainerWine = () => {
	const wines = useSelector((state) => state.wine);
	// const wines = Wine;

	let contador = 0;

	return (
		<div className={styles.carrusel}>
			{wines?.map((wine) => {
				contador++;
				if (contador < 6) {
					return (
						<div className={styles.carruselItem} key={wine.id}>
							<CardWine
								id={wine.id}
								name={wine.name}
								description={wine.description}
								price={wine.price}
								picture={wine.picture}
								//wine_category={wine.wine_category.name}
								stock={wine.stock}
								isActive={wine.isActive}
							/>
						</div>
					);
				} else {
					return;
				}
			})}
		</div>
	);
};

export default CardsContainerWine;
