import React, { Component, Dispatch, SetStateAction } from 'react';
import {Navigate} from 'react-router-dom';
import APIURL from "../helpers/environment";
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

type RegisterState = {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    role: string,
}

type RegisterProps = {
    sessionToken: string,
}

export default class RegisterAdmin extends Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            role: '',
        }
    };

    handleFormSubmit = (event: React.SyntheticEvent) => {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${APIURL}/user/registeradmin`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    role: 'Admin'
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then(() => {
                if (responseStatus === 200) {
                    alert('Admin Registed Successfully, returning to homepage');
                    <Navigate to='/all' />
                }
            })
    };

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <p>Please let the new admin take control and create their account</p>
                <FormGroup>
                    <Label for='first_name'>
                        First Name
                    </Label>
                    <Input
                        id='first_name'
                        name='first_name'
                        placeholder='John'
                        type='text'
                        value={this.state.first_name}
                        onChange={(e) => this.setState({first_name: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='last_name'>
                        Last Name
                    </Label>
                    <Input
                        id='last_name'
                        name='last_name'
                        placeholder='Doe'
                        type='text'
                        value={this.state.last_name}
                        onChange={(e) => this.setState({last_name: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='username'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        placeholder='Collector123'
                        type='text'
                        value={this.state.username}
                        onChange={(e) => this.setState({username: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        placeholder='example@example.com'
                        type='email'
                        value={this.state.email}
                        onChange={(e) => this.setState({email: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='Password123'
                        type='password'
                        value={this.state.password}
                        onChange={(e) => this.setState({password: (e.target.value)})}
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
};