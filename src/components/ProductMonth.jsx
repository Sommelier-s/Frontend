import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from '../assets/styles/components/ProductMonth.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { saveProductMonth } from '../redux/actions';
import axios from 'axios';

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

export default function ProductMonth({
	id,
	name,
	picture,
	description,
	stock,
	isActive,
	price,
	id_picture,
	is_product_month,
	graduation,
}) {
	const product = useSelector((state) => state.selectedProductMonth)
	const allDrink = useSelector((state) => state.allDrinks);
	const user = useSelector((state) => state.user)
	const [expanded, setExpanded] = React.useState(false);
	const dispatch = useDispatch();

	const [productMonth, setProductMonth] = useState(false);

	const handleProductMonthTwo = async (event) => {
		event.preventDefault();
		if (!productMonth) {
			if (product.length === 0) {
				if (!graduation) {
					const { data } = await axios.put(`/wine/${id}/?userId=${user.id}`, { is_product_month: true })
				} else {
					const { data } = await axios.put(`/liquor/${id}/?userId=${user.id}`, { is_product_month: true })
				}
				setProductMonth(true)
			} else {
				swal({
					title: 'Atención',
					text: `Ya posees un producto del mes: ${product[0].name}, deseas reemplazarlo?`,
					icon: 'warning',
					buttons: ['Cancelar', 'Reemplazar']
				}).then((response) => {
					if (response) {
						console.log("Ahora pone el nuevo producto", name);
						if (!graduation) {
							axios.put(`/wine/${id}/?userId=${user.id}`, { is_product_month: true })
							.then((response) => {
								console.log("wine, nuevo producto agregado");
							})
							.catch((error) => {
								console.log("wine, no se pudo cargar el nuevo producto:", error);
							})
						} else {
							axios.put(`/liquor/${id}/?userId=${user.id}`, { is_product_month: true })
							.then((response) => {
								console.log("liquor, nuevo producto agregado");
							})
							.catch((error) => {
								console.log("liquor, no se pudo cargar el nuevo producto:", error);
							})
						}
						setProductMonth(true)
						console.log("Ahora sacas el viejo producto", product[0].name);
						console.log("Tiene graduación el viejo producto", product[0].graduation);
						if (product[0].graduation) {
							axios.put(`/liquor/${product[0].id}/?userId=${user.id}`, { is_product_month: false })
							.then((response) => {
								console.log("liquor, viejo producto borrado");
							})
							.catch((error) => {
								console.log("liquor, no se pudo borrar el viejo producto:", error);
							})
						} else {
							axios.put(`/wine/${product[0].id}/?userId=${user.id}`, { is_product_month: false })
							.then((response) => {
								console.log("wine, viejo producto borrado");
							})
							.catch((error) => {
								console.log("wine, no se pudo borrar el viejo producto:", error);
							})
						}
						swal({
							title: 'Reemplazado',
							text: `Se ha reemplazado el producto anterior: ${product[0].name} por el nuevo producto: ${name}, ve a inicio a corroborar`,
							icon: 'success',
							buttons: 'Aceptar'
						}).then(() => {
							window.location.reload();
						});
					} else {
						swal({
							title: 'Cancelado',
							text: 'No se ha reemplazado el producto del mes',
							icon: 'success',
							buttons: 'Aceptar'
						})
					}
				})
			}
		} else {
			if (!graduation) {
				const { data } = await axios.put(`/wine/${id}/?userId=${user.id}`, { is_product_month: false })
			} else {
				const { data } = await axios.put(`/liquor/${id}/?userId=${user.id}`, { is_product_month: false })
			}
			setProductMonth(false)
		}
	};

	useEffect(() => {
		if (is_product_month) {
			setProductMonth(true)
		} else {
			setProductMonth(false)
		}
	}, []);

	useEffect(() => {
		dispatch(saveProductMonth());
	}, [productMonth]);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={styles.mainContainer}>
			<div>
				<div className={styles.imageContainer}>
					<div className={styles.imageCard}>
						<img src={picture} alt="Imagen del vino" />
					</div>

					<div className={styles.contentIconImage}>
						<IconButton onClick={handleProductMonthTwo}>
							<StarBorderIcon className={`${styles.icon} ${productMonth ? styles.productMonth : ''}`} />
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
							<span>Descripción:</span>
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
