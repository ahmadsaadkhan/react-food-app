import { Fragment } from 'react'

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton'
import espetadaImage from '../../Assets/espetada.jpg'

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Serving Espetada</h1>
            <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={espetadaImage} alt="Meals" />
            </div>
        </Fragment>
    )
}
 
export default Header;