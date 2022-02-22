import React, { Component } from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import {Navigate} from 'react-router-dom';
import APIURL from '../helpers/environment';

type ListingCreateState = {
    id: string,
    item_name: string,
    description: string,
    platform: string,
    newInBox: boolean,
    condition: string,
    price: number,
    pictureOne: string,
    pictureTwo: string | undefined,
    pictureThree: string | undefined,
}

type ListingCreateProps = {
    sessionToken: string,
}

export default class ListingCreate extends Component<ListingCreateProps, ListingCreateState> {
    constructor(props: ListingCreateProps) {
        super(props);
        this.state = {
            id: '',
            item_name: '',
            description: '',
            platform: '',
            newInBox: false,
            condition: '',
            price: 0,
            pictureOne: '',
            pictureTwo: '',
            pictureThree: ''
        }
    };

    handleFormSubmit = (event: React.SyntheticEvent) => {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${APIURL}/listing/create`, {
            method: 'POST',
            body: JSON.stringify({
                listing: {
                    item_name: this.state.item_name,
                    description: this.state.description,
                    platform: this.state.platform,
                    newInBox: this.state.newInBox,
                    condition: this.state.condition,
                    price: this.state.price,
                    pictureOne: this.state.pictureOne,
                    pictureTwo: this.state.pictureTwo,
                    pictureThree: this.state.pictureThree
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
                alert('Listing Created successfully, returning to homepage');
                <Navigate to='listing/all/*' />                
            })
    };

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                    <Label for='item_name'>
                        Item Name
                    </Label>
                    <Input
                        id='item_name'
                        name='item_name'
                        placeholder='Game XYZ'
                        type='text'
                        value={this.state.item_name}
                        onChange={(e) => this.setState({ item_name: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='description'>
                        General Item Description
                    </Label>
                    <Input
                        id='description'
                        name='description'
                        placeholder='Game XYZ, an open-world RPG with several Game of The Year Awards'
                        type='text'
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='platform'>
                        Platform
                    </Label>
                    <Input
                        id='platform'
                        name='platform'
                        placeholder='Nintendo Switch'
                        type='text'
                        value={this.state.platform}
                        onChange={(e) => this.setState({ platform: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup tag='fieldset'>
                    <legend>New In Box</legend>
                    <FormGroup>
                        <Label check>
                            <Input type='radio' name='true' /> {' '}
                            True
                            <Input type='radio' name='false' /> {' '}
                            False
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label for='condition'>
                        Condition Description
                    </Label>
                    <Input
                        id='condition'
                        name='condition'
                        placeholder='Game Disc only, minor scratches, tested and working'
                        type='text'
                        value={this.state.condition}
                        onChange={(e) => this.setState({ condition: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='price'>
                        Price (in USD)
                    </Label>
                    <Input
                        id='price'
                        name='price'
                        placeholder='0.00'
                        type='number'
                        value={this.state.price}
                        onChange={(e) => this.setState({ price: (+e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='pictureOne'>
                        Picture One
                    </Label>
                    <Input
                        id='pictureOne'
                        name='pictureOne'
                        type='text'
                        value={this.state.pictureOne}
                        onChange={(e) => this.setState({ pictureOne: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='pictureTwo'>
                        Picture Two
                    </Label>
                    <Input
                        id='pictureTwo'
                        name='pictureTwo'
                        type='text'
                        value={this.state.pictureTwo}
                        onChange={(e) => this.setState({ pictureTwo: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='pictureThree'>
                        Picture Three
                    </Label>
                    <Input
                        id='pictureThree'
                        name='pictureThree'
                        type='text'
                        value={this.state.pictureThree}
                        onChange={(e) => this.setState({ pictureThree: (e.target.value) })}
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
};