import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Containers
import Products from './containers/Products';
import ProductDetail from './containers/ProductDetail';
import Checkout from './containers/Checkout';
import BackToProductsButton from './components/BackToProductsButton';
import Authentication from './containers/Authentication';

const App = props => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/products'>
                    <Products />
                </Route>
                <Route path='/product'>
                    <ProductDetail />
                </Route>
                <Route path='/checkout'>
                    <Checkout />
                </Route>
                <Route path='/auth'>
                    <Authentication />
                </Route>
                <Route exact path='/'>
                    <Redirect to='/products' />
                </Route>
                <Route path='*'>
                    <div className='container'>
                        <BackToProductsButton />
                        <h1>Page Not Found</h1>
                    </div>
                </Route>
            </Switch>
        </>
    );
};

export default App;
