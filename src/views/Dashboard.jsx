import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWine, getAllLiquor, getAllDrinks } from '../redux/actions';
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
import ProductOffer from "../components/ProductOffer";
import ProductMonth from "../components/ProductMonth";
import axios from 'axios';

export default function Dashboard() {

	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState('profile'); // Estado para almacenar la opción seleccionada del menú
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [showProductMonth, setShowProductMonth] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const allWine = useSelector((state) => state.wine);
	const allLiquor = useSelector((state) => state.liquor);
	const user = useSelector((state) => state.user);
	const offer = useSelector((state) => state.offer);
	const allDrink = useSelector((state) => state.allDrinks);
	const [users, setUsers] = useState([]);

	const getAllUsers = async () => {
		try {
			const { data } = await axios.get(`/auth/user/?id=${user.id}`);
			setUsers(data.data);
		} catch (error) {
			console.log(error);
		}
	};


	const navigate = useNavigate();
	useEffect(() => {
		if (!user.isAdmin) {
			navigate('/');
		}
		dispatch(getAllWine());
		dispatch(getAllLiquor());
		dispatch(getAllDrinks());
		getAllUsers();

		if (
			selectedOption === 'wine' ||
			selectedOption === 'liquor' ||
			selectedOption === 'users' ||
			selectedOption === 'productMonth'
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
		case 'discountedProducts':
			filteredData = offer;
			break;
		default:
			filteredData = [];
	}

	const handleMenu = (option) => {
		setSelectedOption(option);

		if (option === 'productMonth') {
			setShowProductMonth(true);
		} else {
			setShowProductMonth(false);
		}
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
							{users.length !== 0 ? (
								users.map((user) => (
									<DashboardCardAdminUsers
										id={user.id}
										key={user.id}
										profile_picture={user.profile_picture}
										name={`${user.first_name} ${user.last_name}`}
										email={user.email}
										date_birth={user.date_birth}
										isAdmin={user.is_Admin}
										isActive={user.isActive}
									/>
								))
							) : (
								<div>
									<h2>
										No hay usuarios registrados, tu no estas incluido en la
										lista
									</h2>
								</div>
							)}
						</div>
					)}
				</div>

				<div className={styles.cardsContainer}>
					{selectedOption !== 'users' && selectedOption !== 'discountedProducts' && filteredData.length > 0 && (
						<div className={styles['dashboard-card-container']}>
							{
								console.log(filteredData)}
							{
								filteredData
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
					{selectedOption === 'productMonth' && showProductMonth && (
						<div className={styles['dashboard-card-container']}>
							{allDrink
								.filter((item) =>
									item.name.toLowerCase().includes(searchValue.toLowerCase()),
								)
								.map((item) => (
									<ProductMonth
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

					{selectedOption === 'discountedProducts' && (
						<div className={styles['dashboard-card-container']}>
							{offer
								.map((item) => (
									<ProductOffer
										id={item.id}
										product_id = {item.product_id}
										key={item.id}
										product_name={item.product_name} // Propiedad "name" desde el estado
										image={item.image} // Propiedad "picture" desde el estado
										price={item.price}
										discount={item.discount}
										id_picture={item.picture}
										is_product_month={item.is_product_month}
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
