import React, { Component } from 'react'
import {Consumer} from '../../context'
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios'

export class AddContact extends Component {

    state = {
        name: '',
        phone: '',
        email: '',
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (dispatch,e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        //check for errors
        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }
        if (email === '') {
            this.setState({errors: {email: 'Email is required'}});
            return;
        }
        if (phone === '') {
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }

        const newContact = {
           // id: uuidv4(),
            name,
            email,
            phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
        dispatch({type: 'ADD_CONTACT', payload: res.data});

        

        //clear state
        this.setState({
            name: '',
            phone: '',
            email: '',
            errors: {}
        })

        this.props.history.push('/');
    }

    render() {
        const {name, email, phone, errors} = this.state;

        return(
            <Consumer>
                {value => {
                    const {dispatch} = value
                    return(
                        <div className="card mb-3 container">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit= {this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup 
                                        label = "Name"
                                        type = "text"
                                        name = "name"
                                        placeholder = "Enter Name"
                                        value = {name}
                                        onChange = {this.onChange}
                                        error = {errors.name}
                                    />
                                    <TextInputGroup 
                                        label = "Email"
                                        type = "email"
                                        name = "email"
                                        placeholder = "Enter Email"
                                        value = {email}
                                        onChange = {this.onChange}
                                        error = {errors.email}
                                    />
                                    <TextInputGroup 
                                        label = "Phone"
                                        type = "tel"
                                        name = "phone"
                                        placeholder = "Enter Phone Number"
                                        value = {phone}
                                        onChange = {this.onChange}
                                        error = {errors.phone}
                                    />
                                    <input type="submit" value="Add Contact" className="btn btn-block btn-light"/>
                                </form>
                            </div>
                        </div>  
                    )
                 }}
            </Consumer>
        )
    }
}

export default AddContact
