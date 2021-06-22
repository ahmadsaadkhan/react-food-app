import React, { useContext, useState } from 'react'
import CartContext from '../../Store/cart-context'

import classes from './Cart.module.css'
import CartItem from './CartItem'
import Modal from '../UI/Modal'
import Checkout from './Checkout'

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const checkoutHandler = () => {
        setIsCheckout(true)
    }
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) =>
        (<CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />))}
    </ul>

    const cartActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
    </div>

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://food-app-24a38-default-rtdb.firebaseio.com/orders.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItrems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setIsSubmitted(true);
        cartCtx.clearCart();
    }

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout orderConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckout && cartActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data</p> 
    const isSubmittedModalContent = <React.Fragment>
        <p>Successfully order is confirmed.</p> 
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>Close</button>
    </div>
        </React.Fragment>

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !isSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && isSubmitted && isSubmittedModalContent}
        </Modal>
    );
}

export default Cart;