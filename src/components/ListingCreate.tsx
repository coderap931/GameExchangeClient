import React, {Component} from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import APIURL from '../helpers/environment';

type ListingCreateState = {
    id: string,
    item_name: string,
    description: string,
    platform: string,
    newInBox: boolean,
    condition: string,
    price: number,
    picture_one: string | undefined,
    picture_two: string | undefined,
    picture_three: string | undefined,
    picture_four: string | undefined,
    picture_five: string | undefined
}

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
            picture_one: '',
            picture_two: '',
            picture_three: '',
            picture_four: '',
            picture_five: '',
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
                console.log(json);
                this.setState({
                    id: json.listing.id
                })
                this.handlePicturesFormSubmit(event);
            })
    };

    handlePicturesFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/pictures/edit/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                pictures: {
                    picture_one: this.state.picture_one,
                    picture_two: this.state.picture_two,
                    picture_three: this.state.picture_three,
                    picture_four: this.state.picture_four,
                    picture_five: this.state.picture_five
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    <p>Pictures Updated Successfully</p>
                } else {
                    <p>But Pictures Failed to Update</p>
                }
            })
    }

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
                        placeholder='Game XYZ, an open-world RPG with several Game of The Year Awards'
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
                <FormGroup tag='fieldset'>
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
                        onChange={(e) => this.setState({price: (+e.target.value)})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picture_one'>
                        Picture One
                    </Label>
                    <Input
                        id='picture_one'
                        name='picture_one'
                        type='text'
                        value={this.state.picture_one}
                        onChange={(e) => this.setState({ picture_one: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picture_two'>
                        Picture Two
                    </Label>
                    <Input
                        id='picture_two'
                        name='picture_two'
                        type='text'
                        value={this.state.picture_two}
                        onChange={(e) => this.setState({ picture_two: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picture_three'>
                        Picture Three
                    </Label>
                    <Input
                        id='picture_three'
                        name='picture_three'
                        type='text'
                        value={this.state.picture_three}
                        onChange={(e) => this.setState({ picture_three: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picture_four'>
                        Picture Four
                    </Label>
                    <Input
                        id='picture_four'
                        name='picture_four'
                        type='text'
                        value={this.state.picture_four}
                        onChange={(e) => this.setState({ picture_four: (e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picture_five'>
                        Picture Five
                    </Label>
                    <Input
                        id='picture_five'
                        name='picture_five'
                        type='text'
                        value={this.state.picture_five}
                        onChange={(e) => this.setState({ picture_five: (e.target.value) })}
                    />
                </FormGroup>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
};