import React from 'react';

import styles from '../assets/styles/components/views/About.module.css';
const About = () => {
	const integrantes = [
		{ nombre: "Miguel Fernandez", linkedin: "https://www.linkedin.com" },
		{ nombre: "Gonzalo Medina", linkedin: "https://www.linkedin.com" },
		{ nombre: "Pedro Romero", linkedin: "https://www.linkedin.com/in/pedro-fabian-romero-osorio-b77601116/" },
		{ nombre: "Jesse McCallums", linkedin: "https://www.linkedin.com" },
		{ nombre: "Diego Ibañez", linkedin: "https://www.linkedin.com/" },
		{ nombre: "Gonzalo Suarez", linkedin: "https://www.linkedin.com" },
		{ nombre: "Vicente De Blasi", linkedin: "https://www.linkedin.com" },
		{ nombre: "Andrea Rincon", linkedin: "https://www.linkedin.com/" },
	];

	const tecnologias = ["Javascript", "React", "Redux", "Express", "Mercado Pago", "Postgress", "Auth0"];




	return (
		<>
			<div>
				<h1 className={styles.title}>Nuestro objetivo</h1>

				<p className={styles.parrafo}>Brindar una experiencia memorable cuando compras en nuestra tienda en línea. Queremos ofrecerte productos de excelencia con un servicio al cliente de alta calidad. </p>
			</div>

			<div>
				<h1 className={styles.title}>Nuestro Equipo</h1>
			</div>

			<div>
			<ul className={styles.integrantes}>
				{integrantes.map((integrante) => (
					<li key={integrante.nombre}>
						{integrante.nombre} - <a href={integrante.linkedin}>LinkedIn</a>
					</li>
				))}
			</ul>
			</div>
			<div>
                <h1 className={styles.title}>Tecnologías</h1>
            </div>


			<div className={styles.copy}>
                <p>© 2023 Copyright: Henry-Sommeliers - All rights reserved.</p>
            </div>


			{/* <div className={styles.circle}></div> */}
		</>
		

	);
};

export default About;
