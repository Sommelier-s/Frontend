import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    removeFromCart,
    updateQuantity,
    updateCartEmptyStatus,
} from '../redux/actions';

//Importación de estilos
import styles from "../assets/styles/components/Cart.module.css"

const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        if (cart.length === 1) {
            dispatch(updateCartEmptyStatus(true));
        }
    };

    const handleUpdateQuantity = (productId, quantity, stock) => {
        if (quantity <= stock) {
            dispatch(updateQuantity(productId, quantity));
        }
    };

    const handleRemoveOneFromCart = (productId, quantity) => {
        if (quantity > 1) {
            dispatch(updateQuantity(productId, quantity - 1));
        }
    };

    const handleEmptyCart = () => {
        dispatch(updateCartEmptyStatus(true));
        cart.forEach((product) => {
            dispatch(removeFromCart(product.id))
        });
    };

    const calculateTotal = () => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    };

    return (
        <>
            <div className={styles.cartContainer}>
                {cart.length > 0 ? (
                    cart.map((product) => (
                        <div key={product.id} className={styles.productContainer}>

                            <img src={product.picture} alt={product.name} className={styles.productImage} />

                            <div>
                                <p>Valor unitario: {product.price}</p>
                                <h3>{product.name}</h3>
                            </div>

                            <div>
                                {cart.length > 1 && (
                                    <button onClick={() => handleRemoveFromCart(product.id)} className={styles.removeButton}> X  </button>
                                )}
                            </div>

                            <div className={styles.productDetails}>
                                <div className={styles.quantity}>
                                    <button className={styles.quantityButton} onClick={() => handleRemoveOneFromCart(product.id, product.quantity)}>
                                        -
                                    </button>
                                    <p>Cantidad: {product.quantity}</p>

                                    <button className={styles.quantityButton}
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                product.id,
                                                product.quantity + 1,
                                                product.stock)}
                                        disable={product.quantity >= product.stock}
                                    >
                                        +
                                    </button>

                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <p>Carro vacío</p>
                )}
                <div className={styles.buttonContainer}>
                        {cart.length > 0 && (
                            <>
                            <button className={styles.emptyButton} onClick={handleEmptyCart}>Vaciar</button>
                            <button className={styles.buyButton} onClick={() => {
                                navigate('/payment');
                            }}>Comprar</button>
                            </>
                        )}
                    </div>
            </div>
            <h1 className={styles.total}>Precio Total: ${calculateTotal()}</h1>
        </>
    )
}

export default Cart;
