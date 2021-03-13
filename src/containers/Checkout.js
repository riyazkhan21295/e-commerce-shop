import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import BackToProductsButton from '../components/BackToProductsButton';
import CartTable from '../components/CartTable';
import ClearCartButton from '../components/ClearCartButton';
import PlaceOrderButton from '../components/PlaceOrderButton';

import * as actionCreators from '../redux/actions/index';

const Checkout = props => {
    const history = useHistory();

    const handleTableClick = React.useCallback(event => {
        if (event.target.matches('.icon')) {
            let { productId } = event.target.closest('tr').dataset;
            productId = +productId;

            if (event.target.parentElement.matches('.checkout__table__td--remove-product')) {
                event.stopPropagation();

                props.onRemoveFromCart(productId);
            } else if (event.target.parentElement.matches('.checkout__table__td--quantity')) {
                event.stopPropagation();

                if (event.target.matches('.icon--decrement')) {
                    props.onDecrementCartItem(productId);
                } else if (event.target.matches('.icon--increment')) {
                    props.onIncrementCartItem(productId);
                }
            }
        }
    }, []);

    let clearCartButton = null;
    let totalPriceAndPlaceOrderButton = null;
    if (props.checkout.length > 0) {
        clearCartButton = (
            <div className='container' style={{ textAlign: 'right' }}>
                <ClearCartButton />
            </div>
        );

        const totalPrice = props.checkout.reduce((acc, currentValue) => {
            const { quantity, price } = currentValue;

            return +acc + quantity * price;
        }, 0);

        const placeOrderButton = (
            <PlaceOrderButton
                onClick={() => {
                    if (props.auth.isUserLogin) {
                        props.onPlaceOrder();
                        alert('Order Placed Successfully...');
                    } else {
                        history.push('/auth/login');
                    }
                }}
            />
        );

        totalPriceAndPlaceOrderButton = (
            <div className='container' style={{ textAlign: 'right' }}>
                <h3 style={{ marginBottom: '1rem' }}>
                    Total Price: &nbsp;<span className='fas fa-rupee-sign'></span>&nbsp;
                    {totalPrice.toFixed(2)}
                </h3>

                {placeOrderButton}
            </div>
        );
    }

    return (
        <>
            <div className='container'>
                <BackToProductsButton />
            </div>
            <section className='checkout'>
                <div className='container checkout__container'>
                    <CartTable onTableClick={event => handleTableClick(event)} checkoutProducts={props.checkout} />
                </div>
            </section>
            {clearCartButton}
            {totalPriceAndPlaceOrderButton}
        </>
    );
};

const mapStateToProps = state => {
    return {
        checkout: state.checkout,
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveFromCart: productId => dispatch(actionCreators.removeFromCart(productId)),
        onIncrementCartItem: productId => dispatch(actionCreators.incrementCartItem(productId)),
        onDecrementCartItem: productId => dispatch(actionCreators.decrementCartItem(productId)),
        onPlaceOrder: () => dispatch(actionCreators.placeOrder()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
