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

type ListingEditProps = {
    sessionToken: string,
    listing: ListingAPI,
    fetchSpecificListing: (listingId: string) => void,
    specificListing: ListingAPI | undefined,
    setSpecificListing: Dispatch<SetStateAction<ListingAPI | undefined>>,
    editSpecificListing: (listingId: string, orderId: string) => void,
}

type ListingEditState = {
    item_name: string | undefined,
    description: string | undefined,
    platform: string | undefined,
    newInBox: boolean | undefined,
    condition: string | undefined,
    price: number | undefined,
    pictureOne: string,
    pictureTwo: string | undefined,
    pictureThree: string | undefined,
}

export default class ListingEdit extends Component<ListingEditProps, ListingEditState> {
    constructor(props: ListingEditProps) {
        super(props);
        this.state = {
            item_name: this.props.listing.item_name,
            description: this.props.listing.description,
            platform: this.props.listing.platform,
            newInBox: this.props.listing.newInBox,
            condition: this.props.listing.condition,
            price: this.props.listing.price,
            pictureOne: this.props.listing.pictureOne,
            pictureTwo: this.props.listing?.pictureTwo,
            pictureThree: this.props.listing?.pictureThree
        }
    }

    determineNew = (isNew: string) =>{
        if (isNew === 'true') {
            this.setState({newInBox: true});
        } else {
            this.setState({newInBox: false});
        }
    }


    handleFormSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch(`${APIURL}/listing/edit/${this.props.listing.id}`, {
            method: 'PUT',
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
                if (response.status === 200) {
                    alert('Listing Editted successfully, returning to homepage');
                    <Navigate to='listing/all/*' />
                }
            })
    };

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit} className='createform'>
                <FormGroup>
                    <Label>
                        Item Name * :
                    </Label>
                    <Input
                        id='textinput'
                        name='item_name'
                        placeholder='Game XYZ'
                        type='text'
                        value={this.state.item_name}
                        onChange={(e) => this.setState({ item_name: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        General Item Description * :
                    </Label>
                    <Input
                        id='textinput'
                        name='description'
                        placeholder='Game XYZ, an openb-world RPG with several Game of The Year Awards'
                        type='text'
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Platform * :
                    </Label>
                    <Input
                        id='textinput'
                        name='platform'
                        placeholder='Nintendo Switch'
                        type='text'
                        value={this.state.platform}
                        onChange={(e) => this.setState({ platform: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="true">
                        Check if Item is New In Box and Sealed:
                    </Label>
                    <Input
                        type='checkbox'
                        name='true' value={'true'}
                        onChange={(e) => this.determineNew(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Condition Description * :
                    </Label>
                    <Input
                        id='textinput'
                        name='condition'
                        placeholder='Game Disc only, minor scratches, tested and working'
                        type='text'
                        value={this.state.condition}
                        onChange={(e) => this.setState({ condition: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Price (in USD) * :
                    </Label>
                    <Input
                        id='textinput'
                        name='price'
                        placeholder='0.00'
                        type='number'
                        value={this.state.price}
                        onChange={(e) => this.setState({ price: (+e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Picture One * :
                    </Label>
                    <Input
                        id='textinput'
                        name='pictureOne'
                        type='text'
                        value={this.state.pictureOne}
                        onChange={(e) => this.setState({ pictureOne: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Picture Two:
                    </Label>
                    <Input
                        id='textinput'
                        name='pictureTwo'
                        type='text'
                        value={this.state.pictureTwo}
                        onChange={(e) => this.setState({ pictureTwo: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Picture Three:
                    </Label>
                    <Input
                        id='textinput'
                        name='pictureThree'
                        type='text'
                        value={this.state.pictureThree}
                        onChange={(e) => this.setState({ pictureThree: (e.target.value) })}
                    />
                </FormGroup>
                <p>All fields denoted by a * are required, pictures are links to uploads on a hosting site (must end in file extension)</p>
                <Button type='submit' className='submitbutton'>
                    Submit
                </Button>
            </Form>
        )
    }
};