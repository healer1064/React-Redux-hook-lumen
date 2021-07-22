import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import { Header } from '../_components/Header';

function EditProfilePage() {
    
    const user_info = useSelector(state => state.authentication.user && state.authentication.user.user_info);
    
    const [user, setUser] = useState({
        firstName: user_info && user_info.firstName ? user_info.firstName : '',
        lastName: user_info && user_info.lastName ? user_info.lastName : '',
        email: user_info && user_info.email ? user_info.email : ''
    });

    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email) {
            dispatch(userActions.editProfile(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <Header/>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} className={'form-control not-allow'} disabled/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export { EditProfilePage };