const PlaceOrderButton = props => {
    return (
        <button className='btn btn--success' style={{ width: 'auto' }} onClick={() => props.onClick()}>
            Place Order
        </button>
    );
};

export default PlaceOrderButton;
