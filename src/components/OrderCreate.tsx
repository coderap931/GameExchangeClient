import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import APIURL from "../helpers/environment";


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

type OrderCreateProps = {
    listing: ListingAPI,
    sessionToken: string,
    editSpecificListing: (listingId: string, orderId: string) => void,
}

type OrderCreateState = {
    shipping_address: string,
    total_price: number
}

export default class OrderCreate extends Component<OrderCreateProps, OrderCreateState> {
    constructor(props: OrderCreateProps) {
        super(props);
        this.state = {
            shipping_address: '',
            total_price: this.props.listing.price
        }
    };

    handleFormSubmit = (event: React.SyntheticEvent) => {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${APIURL}/order/create/${this.props.listing.id}`, {
            method: 'POST',
            body: JSON.stringify({
                order: {
                    total_price: this.state.total_price,
                    shipping_address: this.state.shipping_address
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
            .then((json) => {
                this.props.editSpecificListing(this.props.listing.id, json.id);
            })
            .then(() => {
                alert('Order placed successfully, returning to homepage');
                <Navigate to='listing/all/*' />
            })
    }

    render() {
        const {props}=this;
        const {listing}=props;
        return (
            <div>
                <p>Item Being Purchased: {listing.item_name}</p>
                <p>Item New In Box?: {listing.newInBox}</p>
                <p>Total Price: $ {listing.price}</p>
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup>
                        <Label for='shipping_address'>
                            Shipping Address
                        </Label>
                        <Input
                            id='shipping_address'
                            name='shipping_address'
                            placeholder='Street Address, Town/City, State, ZIP code'
                            type='text'
                            value={this.state.shipping_address}
                            onChange={(e) => this.setState({shipping_address: (e.target.value)})}
                        />
                    </FormGroup>
                    <Button type='submit'>
                        Submit Order
                    </Button>
                </Form>
            </div>
        )
    }
};