import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/index';

const ClearCartButton = props => {
    return (
        <button className='btn btn--danger' onClick={() => props.onClearCartProducts()} style={{ width: 'auto' }}>
            Clear Cart
        </button>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onClearCartProducts: () => dispatch(actionCreators.clearCartItems()),
    };
};

export default connect(null, mapDispatchToProps)(ClearCartButton);
