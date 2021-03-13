const ProductCard = props => {
    const { id, image, title, price } = props.product;

    const handleAddToCartButtonClick = event => {
        event.stopPropagation();
        props.onAddToCartClick(id);
    };

    let button = null;
    if (props.isProductPresentInCart) {
        button = (
            <button className='btn btn--gray' disabled>
                In Cart
            </button>
        );
    } else {
        button = (
            <button className='btn btn--primary' onClick={handleAddToCartButtonClick}>
                Add To Cart
            </button>
        );
    }

    return (
        <div className='products__card' title={title} onClick={() => props.onProductClick(id)}>
            <img src={image} alt={title} className='products__image' />
            <div className='products__content'>
                <p className='products__title'>{title}</p>
                <span className='products__price'>
                    <span className='icon fas fa-rupee-sign'></span> {price}
                </span>
                {button}
            </div>
        </div>
    );
};

export default ProductCard;
