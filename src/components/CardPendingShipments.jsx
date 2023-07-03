import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import CartDetailsShipmentsPending from './CartDetailsShipmentsPending';
import styles from '../assets/styles/components/CardPendingShipments.module.css';
const CardPendingShipments = ({
	id,
	user_id,
	amount,
	address,
	apartment,
	cart,
	city,
	instructions,
	name,
	number,
	phone,
	postal_code,
	province,
}) => {
	const user = useSelector((state) => state.user);
	const [details, setDetails] = useState(false);
	const handleChangeDetails = (event) => {
		event.preventDefault();
		setDetails(!details);
	};

	const handleChangeStateShipment = async (event) => {
		event.preventDefault();
		swal({
			title: 'Atención!',
			text: 'Está seguro de poner como envio realizado?',
			icon: 'warning',
			buttons: ['Cancelar', 'Continuar'],
		}).then((response) => {
			if (response) {
				try {
					const { data } = axios.put(`/shipment/${id}/?userId=${user.id}`);
					swal({
						title: 'Cambio realizado',
						text: 'Se ha cambiado de envio pendiente a envio realizado',
						icon: 'success',
						buttons: 'aceptar',
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				swal({
					title: 'Cancelado',
					text: 'Se ha cancelado el cambio',
					icon: 'success',
					buttons: 'Aceptar',
				});
			}
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.detallesDelEnvio}>
					<div className={styles.detallerRapidos}>
						<h2>Detalles Rapidos</h2>
						<h2>{name}</h2>
						<h2>
							Monto: $ <span>{amount}</span>
						</h2>
						<h2>
							Cantidad de productos: <span>{cart.length}</span>{' '}
						</h2>
					</div>
					<div className={styles.detallesEnvio}>
						<h2>Detalles del envio</h2>
						<h3>
							Nombre: <span>{name}</span>
						</h3>
						<h3>
							Direccion: <span>{address}</span>
						</h3>
						<h3>
							Número: <span>{number}</span>
						</h3>
						{apartment != 0 && (
							<h3>
								Piso: <span>{apartment}</span>
							</h3>
						)}

						<h3>
							Provincia: <span>{province}</span>
						</h3>
						<h3>
							Ciudad: <span>{city}</span>
						</h3>
						<h3>
							Codigo postal: <span>{postal_code}</span>
						</h3>
						<h3>
							Telefono: <span>{phone}</span>
						</h3>
						<h3>
							Intrucciones: <span>{instructions}</span>
						</h3>
					</div>
				</div>
				<button onClick={handleChangeDetails}>
					{' '}
					{details ? 'ocultar detalles' : 'ver detalles'}{' '}
				</button>
				<button onClick={handleChangeStateShipment}>Marcar como enviado</button>
			</div>
			{details && (
				<div className={styles.contentCartDetails}>
					{cart.map(({ id, name, description, picture, price, quantity }) => {
						return (
							<CartDetailsShipmentsPending
								key={id}
								id={id}
								name={name}
								description={description}
								picture={picture}
								price={price}
								quantity={quantity}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default CardPendingShipments;
