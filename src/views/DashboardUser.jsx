import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardMenuUser from "../components/DashboardMenuUser";
import DashboardCardUser from "../components/DashboardCardUser";
import DashboardCardProductUser from '../components/DashboardCardProductUser';

import profile_user from "../assets/img/profile_user.png"
import imageBack from "../assets/img/imageBack.png";

import styles from "../assets/styles/components/views/DashboardUser.module.css";

const DashboardUser = () => {
	const cartProducs = useSelector((state) => state.cart);
	const [selectedOption, setSelectedOption] = useState('');
	const navigate = useNavigate();

	const handleMenu = (option) => {
		setSelectedOption(option);
	};

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
						cartProducs.map((product) => (
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
