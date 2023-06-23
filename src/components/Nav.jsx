import React from 'react';
import { useState, useEfecct } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

//Importación de Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//Importación del componente cart
import Cart from '../components/Cart';

//Importación logo carrito
import carro from '../assets/img/Carro.png';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/Nav.module.css';

const Nav = () => {
	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);

	const navigate = useNavigate();

	const user = useSelector((state) => state.user);

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};

	const handleLogOut = (event) => {
		event.preventDefault();
		alert('Saliste');
		navigate('/');
	};

	const handleLogIn = (event) => {
		event.preventDefault();
		alert('Fuiste al login');
		navigate('/about');
	};

	const showSetting = () => {
		if (user.id && user.isAdmin)
			return (
				<Link className={styles.item} to={`/dashboard/${user.id}`}>
					Admin
				</Link>
			);
		if (user.id)
			return (
				<Link className={styles.item} to={`/dashboard_user/${user.id}`}>
					User
				</Link>
			);
		else return <Link className={styles.item} to={'/'}></Link>;
	};
	return (
		<div className={styles.content}>
			<ul className={styles.menu}>
				<Link className={styles.item} to={'/'}>
					Inicio
				</Link>
				<Link className={styles.item} to={'/about'}>
					Nosotros
				</Link>
				<Link className={styles.item} to={'/buy'}>
					Comprar
				</Link>

				<div className={styles.cart}>
					<Tippy
						placement={'bottom'}
						offset={[0, 20]}
						delay={200}
						interactive={true}
						content={<Cart />}
					>
						<div className={styles.contentImage}>
							<img src={carro} className={styles.carro} alt="carro" />
						</div>
					</Tippy>
				</div>
				{/* Esto luego se eliminara cuando esten las rutas protegidas para usuarios y admin */}
				{showSetting()}
				{!user.id ? (
					<button onClick={handleLogIn} className={styles.button}>
						Iniciar sesión
					</button>
				) : (
					<button onClick={handleLogOut} className={styles.button}>
						Cerrar sesión
					</button>
				)}
			</ul>
		</div>
	);
};

export default Nav;
