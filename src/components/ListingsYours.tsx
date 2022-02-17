import React, { Component, Dispatch, SetStateAction } from 'react';
import {Routes, Route} from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle, Button } from 'reactstrap';
import APIURL from '../helpers/environment';
import ListingEdit from './ListingEdit';

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

type ListingsYoursProps = {
    sessionToken: string,
    yourListings: ListingAPI [],
    fetchYourListings: () => void,
    setYourListings: Dispatch<SetStateAction<ListingAPI []>>,
    specificListing: ListingAPI | undefined,
    fetchSpecificListing: (listingId: string) => void | undefined,
    setSpecificListing:  Dispatch<SetStateAction<ListingAPI | undefined>>,
    specificPictures: PicturesAPI | undefined,
    setSpecificPictures: Dispatch<SetStateAction<PicturesAPI | undefined>>,
}

export default class ListingsYours extends Component<ListingsYoursProps, {}> {
    constructor(props: ListingsYoursProps) {
        super(props);
    }

    deleteListing(listingId: string): void {
        fetch(`${APIURL}/listing/delete/${listingId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(() => this.props.fetchYourListings())
    }

    yourListingsMapper = (): JSX.Element[] => {
        return this.props.yourListings?.map((listing: ListingAPI, index: number) => {
            return (
                <div id='listingGrid'>
                    <Card key={index}>
                        <CardTitle>
                            {listing.item_name}
                        </CardTitle>
                        <CardSubtitle>
                            Item New In Box: {listing.newInBox}
                        </CardSubtitle>
                        <CardBody>
                            <img src={this.props.specificPictures?.picture_one} />
                            <br />
                            <p>Description:</p> {listing.description}
                            <br />
                            <p>Price: $</p> {listing.price}
                            <br />
                            <Button href={`${APIURL}/listing/${listing.id}`}>View Listing Details</Button>
                            <Button href={`${APIURL}/listing/edit/${listing.id}`}>Edit Listing Details</Button>
                            <Button onClick={() => {this.deleteListing(listing.id)}}>Delete Listing</Button>
                        </CardBody>
                    </Card>
                    <Routes>
                        <Route path={`${APIURL}/listing/edit/${listing.id}`} element={<ListingEdit 
                            sessionToken={this.props.sessionToken}
                            specificListing={this.props.specificListing}
                            fetchSpecificListing={this.props.fetchSpecificListing}
                            setSpecificListing={this.props.setSpecificListing}
                            specificPictures={this.props.specificPictures}
                            setSpecificPictures={this.props.setSpecificPictures}
                        />}/>
                    </Routes>
                </div>
            )
        })
    }
    componentDidMount() {
        this.props.fetchYourListings();
      }
    
      componentDidUpdate() {
        this.props.fetchYourListings();
      }
    
      render() {
        return (
          <div>
            {this.yourListingsMapper()}
          </div>
        )
      }
}