import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWine, getAllLiquor } from '../redux/actions';
import DashboardMenu from '../components/DashboardMenu';
import DashboardCard from '../components/DashboardCard';
import styles from '../assets/styles/components/views/Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import CreateCategory from '../components/CreateCategory';

export default function Dashboard() {
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState(''); // Estado para almacenar la opción seleccionada del menú

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

	// console.log('Vinos:', allWine);
	// console.log('Licores:', allLiquor);
	// console.log('Users:', allUsers);

	let filteredData;
	switch (selectedOption) {
		case 'wine':
			filteredData = allWine;
			break;
		case 'liquor':
			filteredData = allLiquor;
			break;
		case 'users':
			filteredData = user;
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
			<div>
				<button onClick={() => navigate('/')}>Volver</button>
			</div>
			<div className={styles['dashboard-menu-container']}>
				<DashboardMenu onClick={handleMenu} />
			</div>
			{selectedOption && ( // Renderiza las cards solo si se ha seleccionado una  opción
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
