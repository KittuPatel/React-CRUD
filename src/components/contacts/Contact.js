import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Consumer} from '../../context'
import axios from 'axios'
import {Link} from 'react-router-dom';
export class Contact extends Component {

    state = {
        showContactInfo: false,
    }

    onShowClick = (e) => {
        this.setState(
            {
                showContactInfo: !this.state.showContactInfo,
            }
        );
    };

    onDeleteClick = async (id,dispatch) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT',payload: id }) 
        } catch (error) {
            dispatch({type: 'DELETE_CONTACT',payload: id }) 
        }
        
    };

    render() {
        const {name,email,phone,id} = this.props.contact;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4> Name: {name} {'  '}  
                            <i style={{cursor: 'pointer'}} onClick={this.onShowClick} className="fa fa-sort-down"/>
                            <i style={{cursor: 'pointer',float: 'right',color:'red'}} onClick={this.onDeleteClick.bind(this,id, dispatch)} className="fa fa-times"/>
                            <Link to= {`contact/edit/${id}`} >
                                <i className="fa fa-pencil"
                                    style={{cursor: 'pointer',float: 'right',color:'black',marginRight:'20px'}}>
                                </i>
                            </Link>
                            </h4>
                            { this.state.showContactInfo ? 
                            (<ul className="list-group">
                            <li className="list-group-item">Email: {email}</li>
                            <li className="list-group-item">Phone: {phone}</li>
                            </ul>)
                        : null
                        }
                            
                        </div>
                    )
                }}
            </Consumer>    
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default Contact;
