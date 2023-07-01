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
	graduation,
}) {
	const [expanded, setExpanded] = React.useState(false);
	const [isProductMonth, setIsProductMonth] = useState(
		localStorage.getItem('isProductMonth') === 'true'
	);

	const dispatch = useDispatch();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleProductMonth = () => {
		const productData = {
		  id,
		  name,
		  picture,
		  description,
		  stock,
		  isActive,
		  price,
		  id_picture,
		  graduation,
		};
	  
		dispatch(saveProductMonth(productData));
	};

	const handleToggleProductMonth = () => {
		setIsProductMonth(!isProductMonth);
	};
	  
	return (
		<Card className={styles.mainContainer}>
			<div>
				<div className={styles.imageContainer}>
					<div className={styles.imageCard}>
						<img src={picture} alt="Imagen del vino" />
					</div>

					<div className={styles.contentIconImage}>
                        <IconButton onClick={() => {
							handleProductMonth();
							handleToggleProductMonth();
						}}>
							<StarBorderIcon className={`${styles.icon} ${isProductMonth ? styles.productMonth : ''}`} />
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
