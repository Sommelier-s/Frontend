import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Importación de estilos
import styles from "../assets/styles/components/Offers.module.css";

import Promo from '../assets/img/Promo.png';

import * as actions from '../redux/actions';

const CardsContainerOffers = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const offer = useSelector(state => state.offer)
  const dispatch = useDispatch();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    dispatch(actions.getOffer())
  }, [])

  const renderImages = () => {
    // const offers = [
    //   { image: LicorPromo1, name: 'Licor A', price: '$10' },
    //   { image: LicorPromo2, name: 'Licor B', price: '$15' },
    //   { image: LicorPromo3, name: 'Licor C', price: '$12' },
    // ];

    return offer.map((offer, index) => (
      <div
        key={index}
        className={`${styles.imageContainer} ${index === hoveredIndex ? styles.active : ''}`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <img src={offer.image} alt={`Offer ${index + 1}`} />
        <div className={styles.offerDetails}>
          <h3 className={styles.offerName}>{offer.name}</h3>
          <p className={styles.offerPrice}>${offer.price}</p>
        </div>
        <img src={Promo} alt="Discount" className={styles.offerDiscount} />
      </div>
    ));
  };


  return (
    <div className={styles.offer}>
      <div className={styles.carouselContainer}>
        {renderImages()}
      </div>
    </div>
  );
};

export default CardsContainerOffers;



