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
import PercentIcon from '@mui/icons-material/Percent';
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

export default function ProductOffer({
    id,
    product_id,
    product_name,
    image,
    description,
    discount,
    price,
}) {
    const user = useSelector((state) => state.user);
    const offers = useSelector((state) => state.offer);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const MySwal = withReactContent(swal2);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleUpdateOffer = async (event) => {
        event.preventDefault();
        const offerProduct = offers.find(offer => offer.product_id === product_id);
        const { value: discount } = await MySwal.fire({
            title: 'Ingrese el porcentaje de descuento',
            input: 'text',
            inputLabel: 'Descuento',
            inputPlaceholder: 'Ingrese el descuento',
            showCancelButton: true,
        })
        if (discount) {
            const productInCart = cart.filter(product => product.id === product_id)
            if (productInCart.length > 0) {
                dispatch(actions.removeFromCart(product_id));
                if (cart.length === 1) {
                    dispatch(actions.updateCartEmptyStatus(true));
                }
            }
            const offer = Number(discount);
            const response = await axios.put(`/offer/${user.id}`, {
                discount: offer,
                offerId: offerProduct.id
            })
            if (response.status === 200) {
                MySwal.fire(`Bien! Ahora el producto ${product_name} tiene un ${discount}% de descuento!`)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
    }
    const handleDeleteOffer = async (event) => {
        event.preventDefault();
        await swal({
            title: "Advertencia",
            text: 'Desea borrar este producto de las ofertas?',
            buttons: ['Cancelar', 'Aceptar'],
        }).then(async (response) => {
            if (response) {
                const productInCart = cart.filter(product => product.id === product_id)
                if (productInCart.length > 0) {
                    dispatch(actions.removeFromCart(product_id));
                    if (cart.length === 1) {
                        dispatch(actions.updateCartEmptyStatus(true));
                    }
                }
                const response = await axios.delete(`/offer/${id}?userId=${user.id}`)
                if (response.status === 200) {
                    swal({
                        title: 'Eliminado',
                        text: 'Producto eliminado de las ofertas',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                }
            } else {
                swal({
                    title: 'Eliminacion cancelada',
                    text: '',
                    icon: 'success',
                    buttons: 'Aceptar',
                });
            }
        })

    }

    return (
        <Card className={styles.mainContainer}>
            <div>
                <div className={styles.imageContainer}>
                    <div className={styles.imageCard}>
                        <img src={image} alt="Imagen del vino" />
                    </div>
                    <div className={styles.contentIconImage}>
                        <div></div>
                        <IconButton >
                            <DeleteForeverIcon fontSize="small" onClick={handleDeleteOffer} />
                        </IconButton>
                        <IconButton>
                            <EditIcon fontSize="small" onClick={handleUpdateOffer} />
                        </IconButton>
                    </div>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product_name || 'Nombre del producto'}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <AttachMoneyIcon />
                        {price || 'Price'}
                    </IconButton>
                    <IconButton>
                        <PercentIcon />
                        {discount || 'Price'}
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