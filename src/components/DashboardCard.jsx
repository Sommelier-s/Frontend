import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from '../assets/styles/components/DashboardCard.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import * as actions from '../redux/actions';


const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const DescriptionWrapper = styled('div')(({ theme }) => ({
	position: 'relative',
}));

const EditIconWrapper = styled('div')(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	right: 0,
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
	wordWrap: 'break-word',
}));

export default function RecipeReviewCard({
	id,
	name,
	picture,
	description,
	stock,
	isActive,
	price,
	id_picture,
	graduation,
}) {
	const user = useSelector((state) => state.user);
	const offer = useSelector((state) => state.offer);
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch()
	const [expanded, setExpanded] = React.useState(false);
	const [visible, setVisible] = React.useState(isActive);
	const navigate = useNavigate();
	const MySwal = withReactContent(swal2);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleAddToOffer = async (event) => {
		event.preventDefault();
		console.log(offer);
		const offerExist = offer.find(offer => offer.product_id === id)

		if (offerExist) {
			swal({
				title: 'Advertencia',
				text: 'El producto ya esta en oferta, para modificarlo vaya a la seccion de Productos en oferta',
				icon: 'warning',
				button: 'Ok'
			})
			return false
		}
		const { value: discount } = await MySwal.fire({
			title: 'Ingrese el porcentaje de descuento',
			input: 'text',
			inputLabel: 'Descuento',
			inputPlaceholder: 'Ingrese el descuento',
			showCancelButton: true,
		})
		if (discount) {
			const productInCart = cart.filter(product => product.id === id)
            if (productInCart.length > 0) {
                dispatch(actions.removeFromCart(id));
                if (cart.length === 1) {
                    dispatch(actions.updateCartEmptyStatus(true));
                }
            }
			const offer = Number(discount);
			const response = await axios.post(`/offer?id=${user.id}`, {
				productId: id,
				discount: offer
			})
			if (response.status === 201) {
				MySwal.fire(`Bien! Ahora el producto ${name} tiene un ${discount}% de descuento!`)
				setTimeout(() => {
                    window.location.reload();    
                }, 2000);	
			}
		}
	}

	const handleVisibilityClick = async () => {
		console.log('entro a la funcion');
		setVisible(!visible);
		if (!graduation) {
			console.log('entro al axios del vino');
			try {
				const updateWine = {
					isActive: !visible,
				};

				const { data } = await axios.put(
					`/wine/${id}/?userId=${user.id}`,
					updateWine,
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('entro al axios del licor');
			try {
				const updateLiquor = {
					isActive: !visible,
				};

				const { data } = await axios.put(
					`/liquor/${id}/?userId=${user.id}`,
					updateLiquor,
				);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleDeleteProduct = async (event) => {
		event.preventDefault();
		swal({
			title: 'Advertencia',
			text: 'Con esta opción borraras permanentemente el producto, si queres deshabilitarlo usa el icono del ojito',
			icon: 'warning',
			buttons: ['Cancelar', 'Eliminar'],
		}).then((response) => {
			if (response) {
				if (!graduation) {
					const { data } = axios
						.delete(`/wine/permanently/${id}/?userId=${user.id}`)
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					const { data } = axios
						.delete(`/liquor/permanently/${id}/?userId=${user.id}`)
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});
				}
				swal({
					title: 'Eliminado',
					text: 'El producto se elimino con éxito',
					icon: 'success',
					buttons: 'Aceptar',
				}).then((response) => {
					window.location.reload();
				});
			} else {
				swal({
					title: 'Cancelado',
					text: 'Se ha cancelado la operacion con exito',
					icon: 'success',
					buttons: 'Aceptar',
				});
			}
		});
	};

	return (
		<Card className={styles.mainContainer}>
			<div className={!visible ? `${styles.notVisible}` : `${styles.visible}`}>
				<div className={styles.imageContainer}>
					<div className={styles.imageCard}>
						<img src={picture} alt="Imagen del vino" />
					</div>

					<div className={styles.contentIconImage}>
						<div></div>

						<IconButton
							onClick={() => {
								navigate(`/update_product/${user.id}/?id_product=${id}`);
							}}
						>
							<EditIcon fontSize="small" />
						</IconButton>

						<IconButton
							aria-label="toggle visibility"
							onClick={handleVisibilityClick}
						>
							{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
						</IconButton>

						<IconButton onClick={handleDeleteProduct}>
							<DeleteForeverIcon fontSize="small" />
						</IconButton>
						<IconButton onClick={handleAddToOffer}>
							<LocalOfferIcon fontSize="small" />
						</IconButton>
					</div>
				</div>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name || 'Nombre del producto'}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton>
						<InventoryIcon />
						{stock || 'Stock'}
					</IconButton>
					<IconButton>
						<AttachMoneyIcon />
						{price || 'Price'}
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<DescriptionWrapper>
							<span>Descripcion:</span>
							<DescriptionText paragraph>
								{description || 'Descripcion del producto'}
							</DescriptionText>
						</DescriptionWrapper>
					</CardContent>
				</Collapse>
			</div>
		</Card>
	);
}

{
	/* <EditIconWrapper>
	<IconButton>
		<EditIcon fontSize="small" />
	</IconButton>
</EditIconWrapper>; 
	
OJITO
	
	
<IconButton
					aria-label="toggle visibility"
					onClick={handleVisibilityClick}
				>
					{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</IconButton>
	
	
	
	
*/
}
