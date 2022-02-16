import React, { Component, Dispatch, SetStateAction } from 'react';
import {Routes, Route} from 'react-router-dom';
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
    pictures: boolean
}

type PicturesAPI = {
    picture_one: string | undefined,
    picture_two: string | undefined,
    picture_three: string | undefined,
    picture_four: string | undefined,
    picture_five: string | undefined
}

type ListingEditProps = {
    sessionToken: string,
    fetchSpecificListing: (listingId: string) => void,
    specificListing: ListingAPI [],
    setSpecificListing:  Dispatch<SetStateAction<ListingAPI[]>>,
    specificPictures: PicturesAPI[],
    fetchSpecificPictures: (listingId: string) => void,
    setSpecificPictures: Dispatch<SetStateAction<PicturesAPI[]>>,
}

type ListingEditState = {
    item_name: string,
    description: string,
    platform: string,
    newInBox: boolean,
    condition: string,
    price: number,
    hasPictures: boolean
    tempPicturesObj: PicturesAPI
}

export default class ListingEdit extends Component<ListingEditProps, ListingEditState> {
    constructor(props: ListingEditProps) {
        super(props);
        this.state = {
            item_name: this.props.specificListing[0].item_name,
            description: this.props.specificListing[0].description,
            platform: this.props.specificListing[0].platform,
            newInBox: this.props.specificListing[0].newInBox,
            condition: this.props.specificListing[0].condition,
            price: this.props.specificListing[0].price,
            hasPictures: this.props.specificListing[0].pictures,
            tempPicturesObj: {
                picture_one: '',
                picture_two: '',
                picture_three: '',
                picture_four: '',
                picture_five: ''
            }
        }
    };

    handleFormSubmit(event: React.SyntheticEvent) {
        let responseStatus: number;
        event.preventDefault();
        fetch(`${APIURL}/listing/edit/${this.props.specificListing[0].id}`, {
            method: 'POST',
            body: JSON.stringify({
                listing: {
                    item_name: this.state.item_name,
                    description: this.state.description,
                    platform: this.state.platform,
                    newInBox: this.state.newInBox,
                    condition: this.state.condition,
                    price: this.state.price,
                    pictures: this.state.hasPictures
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
                if (responseStatus === 200) {
                <div>
                    <p>Listing Editted Successfull</p>
                    <Button href='/listings/yours'>Return to Your Listings</Button>
                </div>
                }
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
                        onChange={(e) => this.setState({item_name: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='description'>
                        General Item Description
                    </Label>
                    <Input
                        id='description'
                        name='description'
                        placeholder='Game XYZ, an openb-world RPG with several Game of The Year Awards'
                        type='text'
                        value={this.state.description}
                        onChange={(e) => this.setState({description: (e.target.value)})}
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
                        onChange={(e) => this.setState({platform: (e.target.value)})}
                    />
                </FormGroup>
                <FormGroup tag='fieldset' for='newInBox'>
                    <legend>New In Box</legend>
                    <FormGroup>
                        <Label check>
                            <Input type='radio' name='true'/> {' '}
                            True
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label check>
                            <Input type='radio' name='false'/> {' '}
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
                        onChange={(e) => this.setState({condition: (e.target.value)})}
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
                        onChange={(e) => this.setState({price: (e.target.value)})}
                    />
                </FormGroup>
                {/* <FormGroup>
                    <Label for='item_name'>
                        Item Name
                    </Label>
                    <Input
                        id='item_name'
                        name='item_name'
                        placeholder='Game XYZ'
                        type='text'
                        value={this.state.item_name}
                        onChange={(e) => this.setState({item_name: (e.target.value)})}
                    />
                </FormGroup> */}
            </Form>
        )
    }
};