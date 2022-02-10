import React, { Component } from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
const navigate = useNavigate();

type RegisterState = {
    first_name: string | null,
    last_name: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    role: string | null,
}

export default class Register extends Component<{}, RegisterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            role: 'Client',
        }
    }

    handleSubmit(event: React.SyntheticEvent) {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${process.env.API_URL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {
                responseStatus = response.status;
                //! SET TOKEN
                return response.json();
            })
            .then((json) => {
                this.props.updateToken(json.sessionToken)
                if (responseStatus === 200) {
                    navigate('/all');
                }
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for='first_name'>
                        First Name
                    </Label>
                    <Input
                        id='first_name'
                        name='first_name'
                        placeholder='John'
                        type='text'
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
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
}