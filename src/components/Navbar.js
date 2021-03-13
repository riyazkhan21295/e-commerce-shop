import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = props => {
    const history = useHistory();

    let list = null;
    if (props.auth.isUserLogin) {
        list = (
            <li className='navigation__item'>
                <Link to='/auth/logout' className='navigation__link btn btn--danger'>
                    Logout
                </Link>
            </li>
        );
    } else {
        list = (
            <>
                <li className='navigation__item'>
                    <Link to='/auth/login' className='navigation__link btn btn--primary'>
                        Login
                    </Link>
                </li>
                <li className='navigation__item'>
                    <Link to='/auth/register' className='navigation__link btn btn--gray'>
                        Register
                    </Link>
                </li>
            </>
        );
    }

    return (
        <header className='navigation'>
            <div className='container navigation__container'>
                <h1 className='navigation__header' onClick={() => history.push('/products')}>
                    E-Commerce Shop
                </h1>

                <nav className='navigation__navbar'>
                    <ul className='navigation__list'>
                        {list}
                        <li className='navigation__item'>
                            <Link to='/checkout' className='navigation__link navigation__link--checkout'>
                                <span className='icon fas fa-cart-plus'></span>
                                <span className='badge badge--warning'>{props.checkout.length || null}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = state => {
    return {
        checkout: state.checkout,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(Navbar);
