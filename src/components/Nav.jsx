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
import {
	logOutUer,
	removeFromCart,
	updateCartEmptyStatus,
} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/Nav.module.css';
import axios from 'axios';

const Nav = () => {
	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
	const cart = useSelector((state) => state.cart);
	const [cartBack, setCartBack] = useState();
	const [cartCount, setCartCount] = useState(0);
	const amount = useSelector((state) => state.amount);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const thereIsACart = async () => {
		try {
			const { data } = await axios.get(`/cart/?id=${user.id}`);
			setCartBack(data.data);
		} catch (error) {
			
		}
	};

	useEffect(() => {
		setCartCount(cart.length);
		thereIsACart();
	}, [cart]);

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};

	const handleLogOut = async (event) => {
		thereIsACart();
		
		if (cart.length !== 0) {
			const updateCartForBack = {
				cart: cart,
				amount: amount,
			};
			try {
				const { data } = await axios.put(
					`/cart/?id=${user.id}`,
					updateCartForBack,
				);
				setCartBack(data.data);
			} catch (error) {
				try {
					const { data } = await axios.post(
						`/cart/?id=${user.id}`,
						updateCartForBack,
					);
				} catch (error) {}
			}
		}

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
				<div className={styles.contentProfile}>
					<div className={styles.contentPicture}>
						<img src={user.profile_picture} alt="" />
					</div>
					<Link className={styles.item} to={`/dashboard/${user.id}`}>
						Perfil
					</Link>
				</div>
			);
		if (user.id)
			return (
				<div className={styles.contentProfile}>
					<div className={styles.contentPicture}>
						<img src={user.profile_picture} alt="" />
					</div>
					<Link className={styles.item} to={`/dashboard_user/${user.id}`}>
						Perfil
					</Link>
				</div>
			);
		else return <Link className={styles.item} to={'/'}></Link>;
	};

	return (
		<div className={styles.container}>
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
		</div>
	);
};

export default Nav;
