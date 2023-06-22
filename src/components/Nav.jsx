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

import styles from '../assets/styles/components/Nav.module.css';

const Nav = () => {
	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};
	return (
		<div className={styles.content}>
			<ul className={styles.menu}>
				<Link className={styles.item} to={'/home'}>
					Inicio
				</Link>
				<Link className={styles.item} to={'/about'}>
					Nosotros
				</Link>
				<Link className={styles.item} to={'/buy'}>
					Comprar
				</Link>
				<Link className={styles.item} to={'/create'}>
					Crear
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
			</ul>
		</div>
	);
};

export default Nav;
