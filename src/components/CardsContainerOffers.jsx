import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

// Importación de estilos
import styles from "../assets/styles/components/Offers.module.css";

// Importación de imágenes de ofertas
import LicorPromo1 from '../assets/img/LicorPromo1.png';
import LicorPromo2 from '../assets/img/LicorPromo2.png';
import LicorPromo3 from '../assets/img/LicorPromo3.png';
import Promo from '../assets/img/Promo.png';

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
    console.log(offer);
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



