import React, { Component, Dispatch, SetStateAction } from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import APIURL from '../helpers/environment';

type ListingAPI = {
    id: string,
    sold: boolean,
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
    total_price: number,
    date_time: Date,
    shipping_address: string,
    listing: ListingAPI
}
  
type OrderEditProps = {
    sessionToken: string,
    order: OrderAPI,
    setSpecificOrder: Dispatch<SetStateAction<OrderAPI | undefined>>
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
                if (response.status === 200) {
                    return (
                        <div>
                            <p>Order Updated Successfully</p>
                            <Button to='orders/all'>Return to Your Orders</Button>
                        </div>
                    )
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