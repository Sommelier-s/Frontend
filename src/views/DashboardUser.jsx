import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DashboardMenuUser from '../components/DashboardMenuUser';
import DashboardCardUser from '../components/DashboardCardUser';
import DashboardCardProductUser from '../components/DashboardCardProductUser';
import DashboardCardProductUserReview from '../components/DashboardCardProductUserReview';

import profile_user from '../assets/img/profile_user.png';
import imageBack from '../assets/img/imageBack.png';

import styles from '../assets/styles/components/views/DashboardUser.module.css';

import axios from 'axios';
const DashboardUser = () => {
	const cartProducs = useSelector((state) => state.cart);
	const [selectedOption, setSelectedOption] = useState('profile');
	const [purchasedProducts, setPurchasedProducts] = useState([]);
	const [productsSaved, setProductsSaved] = useState([]);
	const [filteredProductsSaved, setFilteredProductsSaved] = useState([]);
	const [userRatings, setUserRatings] = useState([]);
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
				}),
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
			setUserRatings(userRatings);
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
		getRatingByUser();
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
					{selectedOption === 'purchasedProducts' &&
						(filteredProductsSaved.length > 0
							? filteredProductsSaved.map((product) => {
									const isRatedByUser = userRatings.includes(product.id);
									return !isRatedByUser ? (
										<DashboardCardProductUser
											key={product.id}
											product={product}
										/>
									) : null;
							  })
							: productsSaved.map((product) => {
									const isRatedByUser = userRatings.includes(product.id);
									return !isRatedByUser ? (
										<DashboardCardProductUser
											key={product.id}
											product={product}
										/>
									) : null;
							  }))}

					{selectedOption === 'updatedReview' && (
						<DashboardCardProductUserReview />
					)}
				</div>
			)}
		</div>
	);
};

export default DashboardUser;
