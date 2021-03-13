import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/index';
import BackToProductsButton from '../components/BackToProductsButton';

const ProductDetail = props => {
    const { path } = useRouteMatch();
    const { pathname } = useLocation();

    const handleAddToCartButtonClick = product => {
        if (!productId) return;

        product.quantity = 1;
        props.onAddToCart(product);
    };

    let productId = null;
    const pathnameSplit = pathname.split('/');
    if (pathnameSplit.length >= 3) {
        productId = pathnameSplit[2];
    }

    let product = null;
    if (productId) {
        const productData = props.products.find(({ id }) => +id === +productId);
        if (productData) {
            const { description, id, image, price, title } = productData;

            const isProductPresentInCart = props.checkout.find(({ id: cartProductId }) => +cartProductId === +id)
                ? true
                : false;

            let button = null;
            if (isProductPresentInCart) {
                button = (
                    <button className='btn btn--gray' disabled>
                        In Cart
                    </button>
                );
            } else {
                button = (
                    <button className='btn btn--primary' onClick={() => handleAddToCartButtonClick(productData)}>
                        Add To Cart
                    </button>
                );
            }

            product = (
                <>
                    <div className='container'>
                        <BackToProductsButton />
                    </div>
                    <section className='product'>
                        <div className='container product__container'>
                            <img src={image} alt={title} className='product__image' />
                            <div className='product__content'>
                                <h1 className='product__title'>{title}</h1>
                                <p className='product__description'>{description}</p>
                                <span className='product__price'>
                                    <span className='icon fas fa-rupee-sign'></span> {price}
                                </span>
                                {button}
                            </div>
                        </div>
                    </section>
                </>
            );
        }
    }

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <Redirect to='/products' />
                </Route>
                <Route path={`${path}/:productId`}>{product ? product : <Redirect to='/products' />}</Route>
            </Switch>
        </>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products,
        checkout: state.checkout,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: product => dispatch(actionCreators.addToCart(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
