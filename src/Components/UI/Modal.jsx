import ReactDOM from 'react-dom'
import { Fragment } from 'react';
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return ( 
        <div className={classes.backdrop} onClick={props.onHideCart}></div>
     );
}
 
const ModalOverlay = (props) => {
    return ( 
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
     );
}

const Modal = (props) => {
    const PortalElement = document.getElementById('overlays');
    return ( 
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, PortalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, PortalElement)}
        </Fragment>
     );
}
 
export default Modal;