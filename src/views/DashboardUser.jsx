import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardMenuUser from "../components/DashboardMenuUser";
import DashboardCardUser from "../components/DashboardCardUser";
import DashboardCardProductUser from '../components/DashboardCardProductUser';

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
				<DashboardMenuUser onClick={handleMenu} />
				<div>
					<button className={styles.boton} onClick={() => navigate('/')}>Volver</button>
				</div>
			</div>
			{selectedOption && (
				<div className={styles.cardContainer}>
					{selectedOption === 'profile' && (
						<DashboardCardUser
						name = "Pedro Romero"
						email = "pedro@gmail.com"
						password = "**********"
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
