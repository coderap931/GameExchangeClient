import React, {Component} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const navigate = useNavigate();

type LoginState = {
    username: string | undefined,
    password: string | undefined,
}
export default class Login extends Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    };

    errorLoginMessage(){
        if (serverStatus === '500') {

        }
    }

    handleFormSubmit(event: React.SyntheticEvent) {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${process.env.API_URL}/user/login`, {
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
                responseStatus = response.status;
                return response.json();
            })
            .then((json) => {
                this.props.updateToken(json.sessionToken)
                if (responseStatus === 200) {
                    navigate('/all');
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
                {errorLoginMessage()}
                {invalidLoginMessage()}
            </Form>
        )
    }
};