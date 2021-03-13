import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import * as actionCreators from '../redux/actions/index';

const Form = props => {
    const history = useHistory();

    const [errorMsg, setErrorMsg] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isEmailInputTouched, setIsEmailInputTouched] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [isPasswordvalid, setIsPasswordValid] = React.useState(false);
    const [isPasswordInputTouched, setIsPasswordInputTouched] = React.useState(false);

    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {
        setIsFormValid(isEmailValid && isPasswordvalid ? true : false);
    }, [isEmailValid, isPasswordvalid]);

    const isValidUserLogin = React.useCallback(() => {
        const user = props.auth.users.find(user => user.emailId === email);
        if (!user) return false;

        if (password === user.password) return true;

        return false;
    }, [email, password, props.auth.users]);

    const isUserExists = React.useCallback(() => {
        const user = props.auth.users.find(user => user.emailId === email);
        if (user) return true;

        return false;
    }, [email, props.auth.users]);

    const handleInputChange = React.useCallback(
        event => {
            if (errorMsg) setErrorMsg('');

            const { name, value } = event.target;

            if (name === 'email') {
                if (!isEmailInputTouched) setIsEmailInputTouched(true);

                const emailRegex = new RegExp('^\\w+([\\+.%-]?\\w+)*@\\w+([\\+.-]?\\w+)*(\\.\\w{2,})+$');
                setIsEmailValid(emailRegex.test(value));

                setEmail(value);
            } else if (name === 'password') {
                if (!isPasswordInputTouched) setIsPasswordInputTouched(true);
                setIsPasswordValid(value.length >= 4 ? true : false);

                setPassword(value);
            }
        },
        [errorMsg, isEmailInputTouched, isPasswordInputTouched],
    );

    const handleFormSubmit = React.useCallback(
        event => {
            event.preventDefault();

            if (props.from === 'login') {
                if (isValidUserLogin()) {
                    setSuccessMsg('Login Successfully... Redirecting to Products Screen');

                    setTimeout(() => {
                        props.onUserLogin();
                        history.push('/products');
                    }, 3000);
                } else setErrorMsg('Email Id or Password is wrong...');
            } else if (props.from === 'register') {
                if (isUserExists()) {
                    setErrorMsg('User Already Exists...');
                } else {
                    setSuccessMsg('Registration Successfully... Redirecting to Login Screen');

                    setTimeout(() => {
                        const user = {
                            id: new Date().getTime(),
                            emailId: email,
                            password,
                        };

                        props.onUserRegister(user);

                        history.push('/auth/login');
                    }, 3000);
                }
            }
        },
        [email, history, isUserExists, isValidUserLogin, password, props],
    );

    if (props.auth.isUserLogin) return <Redirect to='/products' />;

    return (
        <>
            <form className='form' onSubmit={handleFormSubmit}>
                {errorMsg && <p style={{ color: '#ff0000', marginTop: '1rem', marginBottom: '1rem' }}>{errorMsg}</p>}
                {successMsg && (
                    <p style={{ color: '#28a745', marginTop: '1rem', marginBottom: '1rem' }}>{successMsg}</p>
                )}

                <h1 style={{ textTransform: 'uppercase', marginBottom: '1rem', textDecoration: 'underline' }}>
                    {props.from}
                </h1>

                <div className='form__group'>
                    <p className='form__group--label'>Email Id: </p>
                    <input
                        type='email'
                        className='form__group--input'
                        name='email'
                        placeholder='Email Id'
                        value={email}
                        onChange={handleInputChange}
                        required
                        autoComplete='off'
                    />
                    {isEmailInputTouched && !isEmailValid && <p className='form__group--error'>Invalid Email Id.</p>}
                </div>

                <div className='form__group'>
                    <p className='form__group--label'>Password: </p>
                    <input
                        type='password'
                        className='form__group--input'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                    {isPasswordInputTouched && !isPasswordvalid && (
                        <p className='form__group--error'>Minimum 4 character.</p>
                    )}
                </div>

                <button type='submit' className='btn btn--primary' disabled={isFormValid ? false : true}>
                    {props.buttonText}
                </button>
            </form>
        </>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: () => dispatch(actionCreators.userLogin()),
        onUserRegister: user => dispatch(actionCreators.userRegister(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
