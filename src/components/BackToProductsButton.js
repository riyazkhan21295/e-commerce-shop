import { useHistory } from 'react-router';

const BackToProductsButton = props => {
    const history = useHistory();

    return (
        <button className='btn btn--primary' onClick={() => history.push('/products')} style={{ width: 'auto' }}>
            Back To Products
        </button>
    );
};

export default BackToProductsButton;
