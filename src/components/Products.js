import ProductCard from './ProductCard';

const Products = props => {
    if (props.products.length === 0) return <h3>No Products</h3>;

    return (
        <>
            {props.products.map(product => {
                const isProductPresentInCart = props.cartProducts.find(({ id }) => +id === +product.id) ? true : false;

                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isProductPresentInCart={isProductPresentInCart}
                        onProductClick={props.onProductClick}
                        onAddToCartClick={props.onAddToCartClick}
                    />
                );
            })}
        </>
    );
};

export default Products;
