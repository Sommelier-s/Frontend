import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWine, getAllLiquor } from '../redux/actions';
import DashboardMenu from '../components/DashboardMenu';
import DashboardCard from '../components/DashboardCard';
import DashboardCardAdmin from '../components/DashboardCardAdmin';
import DashboardCardAdminUsers from '../components/DashboardCardAdminUsers';
//import DashboardCardPendings from '../components/DashboardCardPendings'
import styles from '../assets/styles/components/views/Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import CreateCategory from '../components/CreateCategory';
import imageBack from '../assets/img/imageBack.png';
import AddCategoryForm from '../components/AddCategoryForm';
import Create from '../views/Create';
import PendingShipments from '../components/PendingShipments';
import CompletedShipments from '../components/CompletedShipments';
import axios from 'axios';

export default function Dashboard() {
	const users = [
		{
			id: 'd7f80a8b-8d53-498a-95ab-46ba10775264',
			first_name: 'Andrea',
			last_name: 'Rincon',
			date_birth: '1983-11-27',
			email: 'andrea@gmail.com',
			profile_picture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
			isAdmin: false,
		},
		{
			id: 'd7f80a8b-8d53-498a-95ab-46ba10775264',
			first_name: 'Miguel',
			last_name: 'Fernandez',
			date_birth: '1983-11-27',
			email: 'miguel2711@gmail.com',
			profile_picture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
			isAdmin: false,
		},
		{
			id: 'd7f80a8b-8d53-498a-95ab-46ba10775264',
			first_name: 'Gonzalo',
			last_name: 'Suarez',
			date_birth: '1983-11-27',
			email: 'gonzalo@gmail.com',
			profile_picture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
			isAdmin: false,
		},
		{
			id: 'd7f80a8b-8d53-498a-95ab-46ba10775264',
			first_name: 'Pedro',
			last_name: 'Romero',
			date_birth: '1983-11-27',
			email: 'pedrofaro2711@gmail.com',
			profile_picture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
			isAdmin: false,
		},
	];

	const product = [
		{
			id: 'f6a654cc-7448-41a7-9eee-668b01d06904',
			name: 'Vino Pedro',
			description: 'Es un vino dulce y de buen sabor',
			price: 100,
			picture:
				'https://www.sodivin.co.uk/24016-large_default/gaffeliere-la-1985.jpg',
			stock: 5,
			isActive: true,
			createdAt: '2023-06-23T01:32:23.688Z',
			updatedAt: '2023-06-23T01:32:23.688Z',
			Wine_categoryId: 'f34ce926-7d0e-4c93-9831-a945c1f50590',
			wine_category: {
				id: 'f34ce926-7d0e-4c93-9831-a945c1f50590',
				name: 'Vino Tinto',
				createdAt: '2023-06-19T20:45:52.244Z',
				updatedAt: '2023-06-19T20:45:52.244Z',
			},
		},
	];

	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState('profile'); // Estado para almacenar la opción seleccionada del menú
	const [showSearchBar, setShowSearchBar] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const allWine = useSelector((state) => state.wine);
	const allLiquor = useSelector((state) => state.liquor);
	const user = useSelector((state) => state.user);
	// const [deliveryPending, setDeliveryPending] = useState();
	// const [deliveryRealized, setDeliveryRealized] = useState();

	// const getAllDeliveryPending = async () => {
	// 	try {
	// 		const { data } = await axios.get(`/delivery/pending`);
	// 		setDeliveryPending(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const getAllDeliveryRealized = async () => {
	// 	try {
	// 		const { data } = await axios.get(`/delivery/realized`);
	// 		setDeliveryRealized(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const navigate = useNavigate();
	useEffect(() => {
		

		if (!user.isAdmin) {
			navigate('/');
		}
		dispatch(getAllWine());
		dispatch(getAllLiquor());

		if (
			selectedOption === 'wine' ||
			selectedOption === 'liquor' ||
			selectedOption === 'users'
		) {
			setShowSearchBar(true);
		} else {
			setShowSearchBar(false);
		}
	}, [selectedOption]);

	let filteredData;
	switch (selectedOption) {
		case 'wine':
			filteredData = allWine;
			break;
		case 'liquor':
			filteredData = allLiquor;
			break;
		case 'monthlyProduct':
			filteredData = product;
			break;
		case 'discountedProducts':
			filteredData = product;
			break;
		
		// case 'users':
		// 	filteredData = users;
		// 	break;
		default:
			filteredData = [];
	}

	const handleMenu = (option) => {
		setSelectedOption(option);
	};

	//Manejador para la searchBar
	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
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
			<div className={styles.mainContainerCards}>
				<div>
					{showSearchBar && (
						<div className={styles.searchBar}>
							<input
								type="text"
								placeholder="Buscar..."
								value={searchValue}
								onChange={handleSearchChange}
							/>
							{/* <button type="submit">Buscar</button> */}
						</div>
					)}
				</div>
				<div className={styles.cardProfile}>
					{selectedOption === 'profile' && (
						<DashboardCardAdmin
							profile_picture={user.profile_picture}
							name={`${user.first_name} ${user.last_name}`}
							email={user.email}
							date_birth={user.date_birth}
							password="**********"
						/>
					)}
				</div>
				<div className={styles.cardProfileUser}>
					{selectedOption === 'users' && (
						<div>
							{users
								.filter((item) =>
									`${item.first_name} ${item.last_name}`
										.toLowerCase()
										.includes(searchValue.toLowerCase()),
								)
								.map((user) => (
									<DashboardCardAdminUsers
										key={user.id}
										profile_picture={user.profile_picture}
										name={`${user.first_name} ${user.last_name}`}
										email={user.email}
										date_birth={user.date_birth}
									/>
								))}
						</div>
					)}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption !== 'users' && filteredData.length > 0 && (
						<div className={styles['dashboard-card-container']}>
							{filteredData
								.filter((item) =>
									item.name.toLowerCase().includes(searchValue.toLowerCase()),
								)
								.map((item) => (
									<DashboardCard
										id={item.id}
										key={item.id}
										name={item.name} // Propiedad "name" desde el estado
										description={item.description} // Propiedad "description" desde el estado
										stock={item.stock} // Propiedad "stock" desde el estado
										picture={item.picture} // Propiedad "picture" desde el estado
										isActive={item.isActive}
										price={item.price}
										id_picture={item.picture}
										graduation={item.graduation}
									/>
								))}
						</div>
					)}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption === 'pendingShipments' && <PendingShipments />}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption === 'completedShipments' && <CompletedShipments />}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption === 'load new category' && <AddCategoryForm />}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption === 'create' && <Create />}
				</div>
			</div>
		</div>
	);
}
