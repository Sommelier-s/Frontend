import React from 'react';

import styles from '../assets/styles/components/views/About.module.css';
const About = () => {
	const integrantes = [
		{
			nombre: "Miguel Fernandez",
			linkedin: "https://www.linkedin.com/in/miguel-agustin-fernandez-aa1596248/",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Gonzalo Medina",
			linkedin: "https://www.linkedin.com/in/gonzalo-medina-borsotto-7565b9263/",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"

		},
		{
			nombre: "Pedro Romero",
			linkedin: "https://www.linkedin.com/in/pedro-fabian-romero-osorio-b77601116/",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Jesse McCallums",
			linkedin: "https://www.linkedin.com/in/jesse-mccallums-7225a4237",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Diego Ibañez",
			linkedin: "https://www.linkedin.com/in/diego-iba%C3%B1ez-09202822a/",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Gonzalo Suarez",
			linkedin: "https://www.linkedin.com",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Vicente De Blasi",
			linkedin: "https://www.linkedin.com",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
		{
			nombre: "Andrea Rincon",
			linkedin: "https://www.linkedin.com/in/andrea-rincon-a846a5265/",
			image: "https://e7.pngegg.com/pngimages/885/573/png-clipart-futurama-character-illustration-futurama-philip-j-fry-leela-bender-mom-futurama-fry-face-hat.png"
		},
	];



	const tecnologias = [
		{
			program: "Javascript",
			logo: " https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-4.png"
		},
		{
			program: "React",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6azrtSrZnUk0cBWWRpJQ3u5T0ORU-HHrn-7RWq_QGg&s"
		},
		{
			program: "Redux",
			logo: "https://cdn.iconscout.com/icon/free/png-256/free-redux-3521674-2945118.png"
		},
		{
			program: "Node",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIbZxC8sBYAaTBVok2rDFKkP-xor82M3zdADAfXzm1XMKp_rY3z56vLYYXZ0cWUdOLG8&usqp=CAU"
		},
		{
			program: "Postgress",
			logo: "https://w7.pngwing.com/pngs/441/460/png-transparent-postgresql-plain-wordmark-logo-icon.png"
		},
	];




	return (
		<>
			<div>
				<h1 className={styles.title}>Nuestro objetivo</h1>

				<p className={styles.parrafo}>Nos enorgullece ofrecer un proceso de compra sencillo y seguro, con entrega rápida y eficiente para poder disfrutar de los vinos favoritos en la comodidad del hogar.

					Te invitamos a descubrir nuestra selección de vinos y dejarte llevar por el apasionante mundo vinícola.</p>
			</div>

			<div>

			</div>
			<h1 className={styles.title}>Nuestro Equipo</h1>

			<div>
				<ul className={styles.integrantes}>
					{integrantes.map((integrante) => (
						<li key={integrante.nombre} className={styles.item}>
							<div>
								<img src={integrante.image} alt={integrante.image} className={styles.image}></img>
								<p>{integrante.nombre}</p>
								<a href={integrante.linkedin}>LinkedIn</a>

							</div>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h1 className={styles.title}>Tecnologías</h1>
			</div>
			<div>
				<ul className={styles.tecnologias}>
					{tecnologias.map((tecnologia) => (
						<li key={tecnologia.program}>
						<img src={tecnologia.logo} alt={tecnologia.logo} className={styles.logos}></img>
						</li>
						
					))}
				</ul>
			</div>







		</>


	);
};

export default About;
