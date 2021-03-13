import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Form from '../components/Form';

import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const Authentication = props => {
    const { path } = useRouteMatch();

    return (
        <>
            <section className='authentication'>
                <div className='container authentication__container'>
                    <Switch>
                        <Route path={`${path}/login`}>
                            <Login />
                        </Route>
                        <Route path={`${path}/register`}>
                            <Register>
                                <Form from='register' buttonText='Register' />
                            </Register>
                        </Route>
                        <Route path={`${path}/logout`}>
                            <Logout />
                        </Route>
                        <Route path={`${path}`}>
                            <Redirect to='/auth/login' />
                        </Route>
                        <Route path={`${path}/*`}>
                            <Redirect to='/products' />
                        </Route>
                    </Switch>
                </div>
            </section>
        </>
    );
};

export default Authentication;
