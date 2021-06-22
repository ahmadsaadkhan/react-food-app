import { useContext, useEffect, useState } from 'react'
import CartContext from '../../Store/cart-context'
import classes from './HeaderCartButton.module.css'

import CartIcon from "../Cart/CartIcon"

const CartButton = (props) => {

    const [btnisHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext)
    // const noOfCartItems = cartCtx.items
    const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)


    const { items } = cartCtx;
    const btnClasses = `${classes.button} ${btnisHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span classes={classes.icon}>
                <CartIcon />
            </span>
            <span className={classes.icon}>Your Cart</span>
            <span className={classes.badge}>{noOfCartItems}</span>
        </button>
    );
}

export default CartButton;