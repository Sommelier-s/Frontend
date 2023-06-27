import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWine, getAllLiquor } from '../redux/actions';
import DashboardMenu from '../components/DashboardMenu';
import DashboardCard from '../components/DashboardCard';
import DashboardCardAdmin from '../components/DashboardCardAdmin';
import DashboardCardAdminUsers from '../components/DashboardCardAdminUsers';
import styles from '../assets/styles/components/views/Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import CreateCategory from '../components/CreateCategory';
import imageBack from "../assets/img/imageBack.png";

export default function Dashboard() {
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState('profile'); // Estado para almacenar la opción seleccionada del menú

	const allWine = useSelector((state) => state.wine);
	const allLiquor = useSelector((state) => state.liquor);
	const user = useSelector((state) => state.user);

	const navigate = useNavigate();
	useEffect(() => {
		if (!user.isAdmin) {
			navigate('/');
		}
		dispatch(getAllWine());
		dispatch(getAllLiquor());
	}, []);

	let filteredData;
	switch (selectedOption) {
		case 'wine':
			filteredData = allWine;
			break;
		case 'liquor':
			filteredData = allLiquor;
			break;
		case 'monthlyProducts':
			filteredData = allLiquor;
			break;
		case 'discountedProducts':
			filteredData = allLiquor;
			break;
		case 'users':
			filteredData = [user];
			break;
		default:
			filteredData = [];
	}
	console.log('seleccion:', selectedOption);

	const handleMenu = (option) => {
		setSelectedOption(option);
	};

	const displayCreateCategory = (event) => {
		event.preventDefault();
		return navigate(`/create_category/${user.id}`);
	};

	return (
		<div className={styles['dashboard-container']}>
			<div className={styles['dashboard-menu-container']}>

				<button className={styles.botonBack} onClick={() => navigate('/')}>
					<img className={styles.imageBack} src={imageBack} alt="Volver" />
				</button>
				
				<DashboardMenu onClick={handleMenu} />
				
			</div>
			{selectedOption === 'profile' && (
				<DashboardCardAdmin
					profile_picture = {user.profile_picture}
					name={`${user.first_name} ${user.last_name}`}
					email = {user.email}
					date_birth = {user.date_birth}
					password = "**********"
				/>
			)}
			{selectedOption === 'users' && ( // Renderiza las cards solo si se ha seleccionado una  opción
				<DashboardCardAdminUsers
					profile_picture = {user.profile_picture}
					name={`${user.first_name} ${user.last_name}`}
					email = {user.email}
					date_birth = {user.date_birth}
				/>
			)}	
			{selectedOption !== "users" && filteredData.length > 0 && (
				<div className={styles['dashboard-card-container']}>
					{filteredData.map((item) => (
						<DashboardCard
							key={item.id}
							name={item.name} // Propiedad "name" desde el estado
							description={item.description} // Propiedad "description" desde el estado
							stock={item.stock} // Propiedad "stock" desde el estado
							picture={item.picture} // Propiedad "picture" desde el estado
						/>
					))}
				</div>
			)}
		</div>
	);
}
