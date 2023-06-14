import React from 'react';
import styles from '../assets/styles/components/views/NotFound.module.css';

import image from "../assets/img/Logo Negro.webp";

const NotFound = () => {
	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Page Not Found</h1>
			<div className={styles.contentImage}>
				<img src={image} alt="logo" />
			</div>
		</div>
	);

};

export default NotFound;
