import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/index';

import BackToProductsButton from '../components/BackToProductsButton';

const Logout = props => {
    React.useEffect(() => {
        props.onUserLogout();
    }, []);

    return (
        <section className='logout'>
            <div className='container logout__container'>
                <BackToProductsButton />

                <h1>Logout Successfully....</h1>
            </div>
        </section>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onUserLogout: () => dispatch(actionCreators.userLogout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
