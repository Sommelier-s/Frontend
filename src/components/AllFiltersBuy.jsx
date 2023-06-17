import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

// import {
// 	filterTemperaments,
// 	filterOrigen,
// 	filterOrden,
// 	filterPeso,
// } from '../redux/actions';
import styles from '../assets/styles/components/AllFiltersBuy.module.css';

const AllFiltersBuy = () => {
	const dispatch = useDispatch();

	//Trae todos los temperamentos
	const allTemperaments = [];

	const [search, setSearch] = useState('');

	//funcion para filtrar por el tipo de temperamento
	const handleChangeTemperament = (event) => {
		const value = event.target.value;
		//dispatch(filterTemperaments(value));
	};

	//funcion para filtrar por el origen (BDD / API)
	const handleChangeOrigen = (event) => {
		const value = event.target.value;
		let origen = '';
		switch (value) {
			case 'Default':
				origen = 'Default';
				break;
			case 'Creados':
				origen = 'DB';
				break;
			case 'Originales':
				origen = 'API';
				break;
			default:
				origen = 'Default';
		}
		//dispatch(filterOrigen(origen));
	};

	//funcion para ordenar alfabeticamente en orden Ascendente de Descendente
	const handleChangeOrden = (event) => {
		const value = event.target.value;
		let orden = '';
		switch (value) {
			case 'Default':
				orden = 'Default';
				break;
			case 'A-Z':
				orden = 'ascendente';
				break;
			case 'Z-A':
				orden = 'descendente';
				break;
			default:
				orden = 'Default';
		}

		//dispatch(filterOrden(orden));
	};

	//funcion para ordenar por el peso
	const handleChangePeso = (event) => {
		const value = event.target.value;
		let orden = '';
		switch (value) {
			case 'Default':
				orden = 'Default';
				break;
			case 'Máximo':
				orden = 'maximo';
				break;
			case 'Minimo':
				orden = 'minimo';
				break;
			default:
				orden = 'Default';
		}

		//dispatch(filterPeso(orden));
	};
	//funcion para recargar la pagina cuando precione restaurar
	const resetAll = (event) => {
		event.preventDefault();
		window.location.reload();
	};

	//para el input
	const handleValue = (event) => {
		setSearch(event.target.value);
	};

	//para el btn cuando hace click
	const handleSearch = (event) => {
		event.preventDefault();

		//dispatch(filterSearchByName(search));
	};

	return (
		<div className={styles.contentMain}>
			<div className={styles.containerSearch}>
				<div className={styles.contentSearch}>
					<input
						placeholder="Buscar vinos y licores..."
						onChange={handleValue}
						className={styles.input}
						type="text"
					/>
					<button className={styles.buttonSearch} onClick={handleSearch}>
						Buscar
					</button>
				</div>
			</div>
			<div className={styles.contentButtonFilters}>
				<div>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangeOrigen}
					>
						<option value="Default">Precio</option>
						<option value="Creados">Menor</option>
						<option value="Originales">Mayor</option>
					</select>
				</div>

				<div>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangeOrden}
					>
						<option value="Default">Ordenar</option>
						<option value="A-Z">A - Z</option>
						<option value="Z-A">Z - A</option>
					</select>
				</div>
				<div>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangePeso}
					>
						<option value="Default">Categorias Licores</option>
						<option value="Máximo">Licor cremoso</option>
						<option value="Minimo">Licor dulce</option>
					</select>
				</div>
				<div className={styles.contentFilterTemperaments}>
					<select
						name=""
						id=""
						className={styles.selectedFilters}
						onChange={handleChangeTemperament}
					>
						<option value="Default">Categorias Vinos</option>
						{allTemperaments.map((temperament) => {
							return <option key={temperament}>{temperament}</option>;
						})}
					</select>
				</div>
				<button
					className={styles.buttonCreate}
					type="button"
					onClick={resetAll}
				>
					Restaurar
				</button>
			</div>
		</div>
	);
};

export default AllFiltersBuy;
