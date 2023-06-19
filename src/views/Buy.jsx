import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AllFiltersBuy from '../components/AllFiltersBuy';
import PaginationBuy from '../components/PaginationBuy';

import WineJson from '../utils/Wine.json';
import LiquorJson from '../utils/Liquor.json';
import {
	getAllWine,
	getAllLiquor,
	getAllDrinks,
	generatedCopyAllDrinks,
	getAllCategoryWine,
	getAllCategoryLiquor,
	generatedUserId,
} from '../redux/actions';

import styles from '../assets/styles/components/views/Buy.module.css';

const Buy = () => {
	// Toastify module for success message
	const displaySuccessMessage = (mensaje) => {
		toast.success(mensaje, {
			position: 'top-right',
			autoClose: 3000,
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
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	const stateGlobal = useSelector((state) => state.AllDrinks);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(generatedUserId());
		dispatch(getAllWine());
		dispatch(getAllLiquor());
		dispatch(getAllDrinks());
	}, []);

	useEffect(() => {
		dispatch(generatedCopyAllDrinks());
		dispatch(getAllCategoryWine());
		dispatch(getAllCategoryLiquor());
	}, [stateGlobal]);

	return (
		<div>
			<AllFiltersBuy />
			<PaginationBuy />

			{/* Dejar este componente que le pertenece a Toastify */}
			<ToastContainer />
		</div>
	);
};

export default Buy;
