import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, updateCartEmptyStatus } from '../redux/actions';

//Importación de estilos
import styles from "../assets/styles/components/Cart.module.css"

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        if (cart.length === 1) {
            dispatch(updateCartEmptyStatus(true));
        }
    };

    const handleUpdateQuantity = (productId, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity(productId, quantity));
        }
    };

    const handleRemoveOneFromCart = (productId, quantity) => {
        if (quantity > 1) {
          dispatch(updateQuantity(productId, quantity - 1));
        }
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
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>Cantidad: {product.quantity}</p>
                        <div className={styles.btn}>
                            <button onClick={() => handleRemoveOneFromCart(product.id, product.quantity)}>
                                -
                            </button>
                            <button onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}>
                                +
                            </button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(product.id)}>X</button>
                    </div>
                ))
                ) : (
                    <p>Carro vacío</p>
                    )}
        </div>
        <h1 className={styles.total}>Precio Total: {calculateTotal()}</h1>
        </>
    )
}

export default Cart;
