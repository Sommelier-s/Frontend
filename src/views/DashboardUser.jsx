import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardMenuUser from "../components/DashboardMenuUser";
import DashboardCardUser from "../components/DashboardCardUser";
import DashboardCardProductUser from '../components/DashboardCardProductUser';
import axios from 'axios';


import profile_user from "../assets/img/profile_user.png"
import imageBack from "../assets/img/imageBack.png";

import styles from "../assets/styles/components/views/DashboardUser.module.css";

const DashboardUser = () => {
	const cartProducs = useSelector((state) => state.cart);
	const [selectedOption, setSelectedOption] = useState('');
	const [purchasedProducts, setPurchasedProducts] = useState([]);
	const [productsSaved, setProductsSaved] = useState([]);
	const navigate = useNavigate();
	const userID = 'e2450f22-c955-4399-8d51-944db3703f07';
	
	useEffect(() => {
		getPurchasedProducts();
	}, []);
	
	const getPurchasedProducts = async () => {
		try {
			const { data } = await axios.get(`http://localhost:3001/purchased/${userID}`);
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
					const { data } = await axios.get(`http://localhost:3001/wine/${el.product_id}`);
					return data.data;
				})
				);
				setProductsSaved(productDetails);
			} catch (error) {
				console.log(error);
			}
		};
		
		const handleMenu = (option) => {
			setSelectedOption(option);
		};
		
		console.log(productsSaved);
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
						productsSaved.map((product) => (
							<DashboardCardProductUser
								key={product.id}
								product={product}
							/>
						))
						
					)}
				</div>
			)}
		</div>
	);
};

export default DashboardUser;
