import React, {Component, Dispatch, SetStateAction} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';

type LoginState = {
    username: string | undefined,
    password: string | undefined,
    responseStatus: number | undefined
}

type LoginProps = {
    updateToken: (newToken: string) => void,
    sessionToken: string,
    setSessionToken: Dispatch<SetStateAction<string>>,
}
export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            responseStatus: undefined
        }
    };

    errorLoginMessage() {
        if (this.state.responseStatus === 500) {
            return <p>We encountered an issue while attempting to log you in, please try again</p>
        }
    }

    invalidLoginMessage() {
        if (this.state.responseStatus === 401) {
            return <p>Incorrect username and/or password</p>
        }
    }

    handleFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {
                this.setState({
                    responseStatus: response.status
                })
                return response.json();
            })
            .then((json) => {
                this.props.updateToken(json.sessionToken)
                if (this.state.responseStatus === 200) {
                    <div>
                        <p>Login Successful</p>
                        <Button href='/all'>Return home</Button>
                    </div>
                }
            })
    };

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                    <Label for='username'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        placeholder='Username'
                        type='text'
                        value={this.state.username}
                        onChange={(e) => this.setState({username: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='Password'
                        type='text'
                        value={this.state.password}
                        onChange={(e) => this.setState({password: (e.target.value)})}
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
                {this.errorLoginMessage()}
                {this.invalidLoginMessage()}
            </Form>
        )
    }
};