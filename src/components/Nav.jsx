import React from 'react';

import { Link } from 'react-router-dom';

import styles from '../assets/styles/components/Nav.module.css';

const Nav = () => {
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
				
			</ul>
		</div>
	);
};

export default Nav;
