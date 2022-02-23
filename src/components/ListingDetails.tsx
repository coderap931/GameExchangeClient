import { Component } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import OrderCreate from './OrderCreate';

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

type ListingDetailsProps = {
    listing: ListingAPI,
    sessionToken: string,
    editSpecificListing: (listingId: string, orderId: string) => void
}

export default class ListingDetails extends Component<ListingDetailsProps, {}> {
    constructor(props: ListingDetailsProps) {
        super(props);
    };

    newInBox = (newInBox: boolean | undefined) => {
        let newStatus = newInBox;
        if (newStatus === true) {
            return (
                <p>Yes</p>
            )
        } else {
            return (
                <p>No</p>
            )
        }
    }

    render() {
        const { props, state } = this;
        const { listing } = props;
        return (
            <div id='grid'>
                <Card className='detailscard'>
                    <CardBody className='cardbody'>
                        <div>
                            <img
                                alt='Item Picture 2'
                                src={listing?.pictureTwo}
                                className='listingpictureother'
                            />
                            <br />
                            <img
                                alt='Item Picture 3'
                                src={listing?.pictureThree}
                                className='listingpictureother'
                            />
                        </div>
                        <br />
                        <div>
                            Description: {listing.description}
                        </div>
                        <br />
                        <div>
                            Platform: {listing.platform}
                        </div>
                        <br />
                        <div>
                            Item New In Box: {this.newInBox(listing.newInBox)}
                        </div>
                        <div>
                            Condition Description: {listing.condition}
                        </div>
                        <br />
                        <div>
                            Price (USD): ${listing.price}
                        </div>
                        <br />
                        <div>
                            { () => {if (this.props.sessionToken === undefined) {
                                return (
                                    <p>Login to be able to order this item!</p>
                                )
                            } else {
                                return (
                                    <NavLink to={`order/create/${listing.id}`} className='listinglink'>Order It!</NavLink>
                                )
                            }}}
                        </div>
                    </CardBody>
                </Card>
                <Routes>
                    <Route path={`order/create/:id`} element={<OrderCreate
                        editSpecificListing={this.props.editSpecificListing}
                        sessionToken={this.props.sessionToken}
                        listing={listing}
                    />} />
                </Routes>
            </div>
        )
    }
};