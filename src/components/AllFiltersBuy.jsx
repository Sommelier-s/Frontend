import React from 'react';
import { Link } from 'react-router-dom';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import styles from '../assets/styles/components/AllFiltersBuy.module.css';
import {
	generatedCopyAllDrinks,
	filterCategoryWine,
	filterCategoryLiquor,
	filterOrden,
	filterPrice,
	filterSearchByName,
} from '../redux/actions';

const AllFiltersBuy = () => {
	//Toastify module for success message
	const displaySuccessMessage = (mensaje) => {
		toast.success(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	// Toastify module for error messages
	const displayFailedMessage = (mensaje) => {
		toast.error(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	const dispatch = useDispatch();

	//Trae todos los temperamentos
	const allCategoryWine = useSelector((state) => state.categoryWine);
	const allCategoryLiquor = useSelector((state) => state.categoryLiquor);
	const allDrinks = useSelector((state) => state.copyAllDrinks);

	const [search, setSearch] = useState('');

	//funcion para filtrar por el tipo de temperamento
	const handleChangeCategoryWine = (event) => {
		const idCategory = event.target.value;
		dispatch(filterCategoryWine(idCategory));
	};

	//funcion para filtrar por el tipo de temperamento
	const handleChangeCategoryLiquor = (event) => {
		const idCategory = event.target.value;
		dispatch(filterCategoryLiquor(idCategory));
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

		dispatch(filterOrden(orden));
	};

	//funcion para ordenar por el peso
	const handleChangePrecio = (event) => {
		const value = event.target.value;
		let orden = '';
		switch (value) {
			case 'Máximo':
				orden = 'descendente';
				break;
			case 'Minimo':
				orden = 'ascendente';
				break;
			default:
				orden = 'Default';
		}

		dispatch(filterPrice(orden));
	};
	//funcion para recargar la pagina cuando precione restaurar
	const resetAll = (event) => {
		event.preventDefault();
		setSearch('');
		dispatch(generatedCopyAllDrinks());
	};

	//para el input
	const handleValue = (event) => {
		setSearch(event.target.value);
	};

	//para el btn cuando hace click
	const handleSearch = async (event) => {
		event.preventDefault();
		if (search === '') {
			return displayFailedMessage('No hay nada para buscar');
		}

		dispatch(filterSearchByName(search));
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
						value={search}
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
						onChange={handleChangePrecio}
					>
						<option value="Default">Precio</option>
						<option value="Minimo">Menor</option>
						<option value="Máximo">Mayor</option>
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
				<div className={styles.contentFilterTemperaments}>
					<select
						name=""
						id=""
						className={styles.selectedFilters}
						onChange={handleChangeCategoryWine}
					>
						<option value="Default">Categorías Vinos</option>
						{allCategoryWine.map((categoria) => {
							return (
								<option key={categoria.id} value={categoria.id}>
									{categoria.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className={styles.contentFilterTemperaments}>
					<select
						name=""
						id=""
						className={styles.selectedFilters}
						onChange={handleChangeCategoryLiquor}
					>
						<option value="Default">Categorías Licores</option>
						{allCategoryLiquor.map((categoria) => {
							return (
								<option key={categoria.id} value={categoria.id}>
									{categoria.name}
								</option>
							);
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
			<ToastContainer />
		</div>
	);
};

export default AllFiltersBuy;
