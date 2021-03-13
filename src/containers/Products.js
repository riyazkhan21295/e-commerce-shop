import React from 'react';
import { Switch, Route, useRouteMatch, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import productList from '../data/products.json';

import * as actionCreators from '../redux/actions/index';

import ProductsComponent from '../components/Products';

const Products = props => {
    const { path } = useRouteMatch();
    const history = useHistory();

    React.useEffect(() => {
        if (props.products.length === 0) {
            props.onSetProducts(productList);
        }
    }, []);

    const handleProductClick = (productId = null) => {
        if (!productId) return;

        const product = props.products.find(({ id }) => +id === +productId);
        if (product) {
            history.push(`/product/${productId}`);
        }
    };

    const handleAddToCartButtonClick = productId => {
        if (!productId) return;

        const product = props.products.find(({ id }) => +id === +productId);
        if (product) {
            product.quantity = 1;
            props.onAddToCart(product);
        }
    };

    return (
        <>
            <section className='products'>
                <div className='container products__container'>
                    <ProductsComponent
                        products={props.products}
                        cartProducts={props.checkout}
                        onProductClick={productId => handleProductClick(productId)}
                        onAddToCartClick={productId => handleAddToCartButtonClick(productId)}
                    />

                    <Switch>
                        <Route path={`${path}/*`}>
                            <Redirect to='/products' />
                        </Route>
                    </Switch>
                </div>
            </section>
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
        onSetProducts: products => dispatch(actionCreators.setProducts(products)),
        onAddToCart: product => dispatch(actionCreators.addToCart(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
