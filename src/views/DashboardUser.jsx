import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardMenuUser from "../components/DashboardMenuUser";
import DashboardCardUser from "../components/DashboardCardUser";
import DashboardCardProductUser from '../components/DashboardCardProductUser';
import DashboardCardProductUserReview from '../components/DashboardCardProductUserReview';
import axios from 'axios';

import profile_user from "../assets/img/profile_user.png"
import imageBack from "../assets/img/imageBack.png";

import styles from "../assets/styles/components/views/DashboardUser.module.css";

const DashboardUser = () => {
  const cartProducs = useSelector((state) => state.cart);
  const [selectedOption, setSelectedOption] = useState('');
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [productsSaved, setProductsSaved] = useState([]);
  const [filteredProductsSaved, setFilteredProductsSaved] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const idUser = user.id;

  const getPurchasedProducts = async () => {
    try {
      const { data } = await axios.get(`/purchased/${idUser}`);
      setPurchasedProducts(data.data);
      await fetchProductDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const productDetails = await Promise.all(
        purchasedProducts.map(async (el) => {
          const { data } = await axios.get(`/both_drinks/?id=${el.product_id}`);
          return data.data;
        })
      );
      setProductsSaved(productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const getRatingByUser = async () => {
	try {
	  const { data } = await axios.get(`/rating/user/${idUser}`);
	  const userRatings = data.data.map((rating) => rating.search.id);
	  const filteredProducts = productsSaved.filter((product) => {
		return !userRatings.includes(product.id);
	  });
	  setFilteredProductsSaved(filteredProducts);
	} catch (error) {
	  console.log(error);
	}
  };
  

  const handleMenu = (option) => {
    setSelectedOption(option);
    if (option === 'purchasedProducts') {
      getAllInformation();
    }
  };

  const getAllInformation = async () => {
    await getPurchasedProducts();
    await fetchProductDetails();
    if (selectedOption === 'purchasedProducts') {
      await getRatingByUser();
    }
  };

  useEffect(() => {
    getAllInformation();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <button className={styles.botonBack} onClick={() => navigate('/')}>
          <img className={styles.imageBack} src={imageBack} alt="Volver" />
        </button>
        <DashboardMenuUser onClick={handleMenu} />
      </div>
      {selectedOption && (
        <div className={styles.cardContainer}>
          {selectedOption === 'profile' && (
            <DashboardCardUser
              profile_user={profile_user}
              name="Pedro Romero"
              email="pedro@gmail.com"
              password="**********"
            />
          )}
          {selectedOption === 'purchasedProducts' && (
            filteredProductsSaved.map((product) => (
              <DashboardCardProductUser
                key={product.id}
                product={product}
              />
            ))
          )}
          {selectedOption === 'updatedReview' && (
            <DashboardCardProductUserReview />
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
