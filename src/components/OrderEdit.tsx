import React, { Component, Dispatch, SetStateAction } from 'react';
import {Navigate} from 'react-router-dom';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import APIURL from '../helpers/environment';

type ListingAPI = {
    id: string,
    sold: boolean,
    orderId: string | null,
    item_name: string,
    description: string,
    platform: string,
    newInBox: boolean,
    condition: string,
    price: number,
    pictureOne: string,
    pictureTwo: string | undefined,
    pictureThree: string | undefined
}

type OrderAPI = {
    id: string,
    listingId: string,
    total_price: number,
    date_time: Date,
    shipping_address: string,
}
  
type OrderEditProps = {
    sessionToken: string,
    order: OrderAPI,
}

type OrderEditState = {
    shipping_address: string
}

export default class OrderEdit extends Component<OrderEditProps, OrderEditState> {
    constructor(props: OrderEditProps) {
        super(props);
        this.state = {
            shipping_address: this.props.order.shipping_address
        }
    }

    handleFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/order/edit/${this.props.order.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                order: {
                    shipping_address: this.state.shipping_address
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((response) => {
                if (response.status === 200){
                    alert('Order Editted successfully, returning to homepage');
                    <Navigate to='listing/all/*' />
                }
            })
    };

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                    <Label>
                        Shipping Address
                    </Label>
                    <Input
                        id='shipping_address'
                        name='shipping_address'
                        placeholder='shipping address'
                        type='text'
                        value={this.state.shipping_address}
                        onChange={(e) => this.setState({ shipping_address: (e.target.value) })}
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
}