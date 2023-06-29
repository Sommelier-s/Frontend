import React from 'react';

//import components
import Footer from '../components/Footer';

//import images
import linkedin from '../assets/img/Linkedin_color.png';
import github from '../assets/img/Github_logo_blanco.png';
import logo from '../assets/img/Logo Blanco.webp';

import styles from '../assets/styles/components/views/About.module.css';
const About = () => {
	const integrantes = [
		{
			nombre: 'Miguel Fernandez',
			linkedin:
				'https://www.linkedin.com/in/miguel-agustin-fernandez-aa1596248/',
			github: 'https://github.com/Fer-Mig-Agus',
			image: 'https://avatars.githubusercontent.com/u/98432911?v=4',
		},
		{
			nombre: 'Gonzalo Medina',
			linkedin:
				'https://www.linkedin.com/in/gonzalo-medina-borsotto-7565b9263/',
			github: 'https://github.com/gonzam77',
			image: 'https://avatars.githubusercontent.com/u/115995020?v=4',
		},
		{
			nombre: 'Pedro Romero',
			linkedin:
				'https://www.linkedin.com/in/pedro-fabian-romero-osorio-b77601116/',
			github: 'https://github.com/pedrofaro1512',
			image: 'https://avatars.githubusercontent.com/u/108835699?v=4',
		},
		{
			nombre: 'Jesse McCallums',
			linkedin: 'https://www.linkedin.com/in/jesse-mccallums-7225a4237',
			github: 'https://github.com/Jessemccallums',
			image: 'https://avatars.githubusercontent.com/u/101757754?v=4',
		},
		{
			nombre: 'Diego Ibañez',
			linkedin: 'https://www.linkedin.com/in/diego-iba%C3%B1ez-09202822a/',
			github: 'https://github.com/DiegoLIbanez',
			image: 'https://avatars.githubusercontent.com/u/102572546?v=4',
		},
		{
			nombre: 'Gonzalo Suarez',
			linkedin: 'https://www.linkedin.com/in/gonzalo-suarez-7bab9a206/',
			github: 'https://github.com/gonzasuarez96',
			image:
				'https://media.licdn.com/dms/image/C4E03AQGEp99xpMzopA/profile-displayphoto-shrink_800_800/0/1613604632711?e=2147483647&v=beta&t=1uRF_gLVtBm0Ee7SmjM46-6_h4qY8Pz28Gt0clm8HWI',
		},
		{
			nombre: 'Vicente De Blasi',
			linkedin: 'https://www.linkedin.com',
			github: 'https://github.com/VicenteDeBlasi',
			image: 'https://avatars.githubusercontent.com/u/103010932?v=4',
		},
		{
			nombre: 'Andrea Rincon',
			linkedin: 'https://www.linkedin.com/in/andrea-rincon-a846a5265/',
			github: 'https://github.com/AndreaRiG',
			image:
				'https://avatars.githubusercontent.com/u/109623452?s=400&u=d7790ab54491fea76debb70164815f1d9930da80&v=4',
		},
	];

	const tecnologias = [
		{
			program: 'express',
			logo: ' https://icongr.am/devicon/express-original-wordmark.svg?size=148&color=ffffff',
			link: 'https://es.wikipedia.org/wiki/Express.js',
		},
		{
			program: 'sequelize',
			logo: 'https://icongr.am/devicon/sequelize-original.svg?size=148&color=ffffff',
			link: 'https://sequelize.org/',
		},
		{
			program: 'node js',
			logo: 'https://icongr.am/devicon/nodejs-original.svg?size=148&color=a72f2f',
			link: 'https://blog.soyhenry.com/que-es-node-js-y-para-que-se-utiliza/',
		},
		{
			program: 'postgreSQL',
			logo: 'https://icongr.am/devicon/postgresql-original-wordmark.svg?size=148&color=f7f7f7',
			link: 'https://es.wikipedia.org/wiki/PostgreSQL',
		},
		{
			program: 'React ',
			logo: 'https://icongr.am/devicon/react-original-wordmark.svg?size=148&color=f7f7f7',
			link: 'https://es.wikipedia.org/wiki/React',
		},
		{
			program: 'Redux',
			logo: 'https://cdn.iconscout.com/icon/free/png-256/free-redux-3521674-2945118.png',
			link: 'https://es.wikipedia.org/wiki/Redux_(JavaScript)',
		},
		{
			program: 'Javascript ',
			logo: 'https://icongr.am/devicon/javascript-original.svg?size=148&color=currentColor',
			link: 'https://es.wikipedia.org/wiki/JavaScript',
		},
		{
			program: 'Git ',
			logo: 'https://icongr.am/devicon/git-original.svg?size=148&color=f7f7f7',
			link: 'https://es.wikipedia.org/wiki/Git',
		},

		{
			program: 'cloudinary',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzS0-Dgvl2afQwqpC1MmC_rQcmZssP0CuusXS2MIMTjK90TN6grVxlxwkXZe158GDgOMY&usqp=CAU',
			link: 'https://en.wikipedia.org/wiki/Cloudinary',
		},

		{
			program: 'google',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327',
			link: 'https://cloud.google.com/docs/authentication?hl=es-419',
		},
	];

	return (
		<>
			<h1 className={styles.title1}>NUESTRO OBJETIVO</h1>

			<div className={styles.MainContainer}>
				<div className={styles.contentimg}>
					<img src={logo} alt={logo} className={styles.logoPagina} />
				</div>

				<div className={styles.contentparrafo}>
					<p className={styles.parrafo}>
						Nos esforzamos por brindarte una experiencia de compra excepcional.
						Descubre descripciones detalladas de cada producto y encuentra
						recomendaciones personalizadas para ayudarte a elegir la opción
						perfecta. Además, nuestro equipo de expertos está siempre disponible
						para responder tus preguntas y asesorarte en tu recorrido.
					</p>
				</div>
			</div>

			<div></div>
			<h1 className={styles.title}>NUESTRO EQUIPO</h1>

			<div className={styles.TeamContainer}>
				<ul className={styles.integrantes}>
					{integrantes.map((integrante) => (
						<li key={integrante.nombre} className={styles.item}>
							<div>
								<img
									src={integrante.image}
									alt={integrante.image}
									className={styles.image}
								></img>
								<p>{integrante.nombre}</p>
								<a href={integrante.linkedin} target="_blank">
									<img
										src={linkedin}
										alt="LinkedIn"
										className={styles.linkedinLogo}
									/>
								</a>
								<a href={integrante.github} target="_blank">
									<img
										src={github}
										alt="Github"
										className={styles.githubLogo}
									/>
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h1 className={styles.title}>TECNOLOGÍAS</h1>
			</div>
			<div className={styles.tecnologiasContainer}>
				<ul className={styles.tecnologias}>
					{tecnologias.map((tecnologia) => (
						<li key={tecnologia.program}>
							<a href={tecnologia.link} target="_blank">
								<img
									src={tecnologia.logo}
									alt={tecnologia.program}
									className={styles.logos}
								/>
							</a>
						</li>
					))}
				</ul>
			</div>

			<div>
				<Footer />
			</div>
		</>
	);
};

export default About;
