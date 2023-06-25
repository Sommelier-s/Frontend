import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

//Importación de Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//Importación del componente cart
import Cart from '../components/Cart';

//Importación logo carrito
import carro from '../assets/img/Carro.png';
import { logOutUer, removeFromCart, updateCartEmptyStatus } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/Nav.module.css';

const Nav = () => {
	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
	const cart = useSelector((state) => state.cart);

	const [cartCount, setCartCount] = useState(0);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};

	const handleLogOut = (event) => {
		event.preventDefault();
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
		dispatch(logOutUer());
		navigate('/');
	};

	const handleLogIn = (event) => {
		event.preventDefault();
		return navigate('/login');
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

	useEffect(() => {
		setCartCount(cart.length);
	}, [cart]);

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
					<div className={styles.cartContainer}>
						<Tippy
							placement={'bottom'}
							offset={[0, 20]}
							delay={200}
							interactive={true}
							content={<Cart />}
						>
							<div className={styles.contentImage}>
								<img src={carro} className={styles.carro} alt="carro" />
								{cartCount >= 0 && (
									<div className={styles.cartCount}>{cartCount}</div>
								)}
							</div>
						</Tippy>
					</div>
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
