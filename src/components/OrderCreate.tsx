import React, {Component} from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import APIURL from "../helpers/environment";


type ListingAPI = {
    id: string,
    sold: boolean,
    item_name: string,
    description: string,
    platform: string,
    newInBox: boolean,
    condition: string,
    price: number,
    pictures: PicturesAPI
  }

  type PicturesAPI = {
    picture_one: string | undefined,
    picture_two: string | undefined,
    picture_three: string | undefined,
    picture_four: string | undefined,
    picture_five: string | undefined
  }

type OrderCreateProps = {
    specificListing: ListingAPI | undefined, 
}

type OrderCreateState = {
    shipping_address: string
}

export default class OrderCreate extends Component<OrderCreateProps, OrderCreateState> {
    constructor(props: OrderCreateProps) {
        super(props);
        this.state = {
            shipping_address: ''
        }
    };

    handleFormSubmit(event: React.SyntheticEvent) {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${APIURL}/order/create/${this.props.specificListing?.id}`, {
            method: 'POST',
            body: JSON.stringify({
                order: {
                    totalPrice: this.props.specificListing?.price,
                    shipping_address: this.state.shipping_address
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {
                responseStatus = response.status;
            })
            .then(() => {
                if (responseStatus === 200) {
                    <Button href='/all'>Return home</Button>
                }
            })
    };

    render() {
        return (
            <div>
                <p>Item Being Purchased: $ {this.props.specificListing?.item_name}</p>
                <p>Item New In Box?: {this.props.specificListing?.newInBox}</p>
                <p>Total Price: $ {this.props.specificListing?.price}</p>
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