import { Component } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import ListingDetails from './ListingDetails';
import '../App.css';

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

type HomePageProps = {
    sessionToken: string,
    listings: ListingAPI[],
    editSpecificListing: (listingId: string, orderId: string) => void,
    fetchListings: () => void,
}

export default class Home extends Component<HomePageProps, {}> {
    constructor(props: HomePageProps) {
        super(props);
    }

    newInBox = (listing: ListingAPI) => {
        let newStatus = listing.newInBox;
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

    listingsMapper = () => {
        return this.props.listings.map((listing) => {
            return (
                <div id='grid' key={listing.id}>
                    <Card className='card'>
                        <CardTitle className='cardtitle'>
                            {listing.item_name}
                        </CardTitle>
                        <CardBody className='cardbody'>
                            <p>Item New In Box: </p> {this.newInBox(listing)}
                            <br />
                            <img src={listing.pictureOne} className='listingpictureone'/>
                            <p>Price: $</p> {listing.price}
                            <br />
                            <br />
                        </CardBody>
                        <NavLink to={`listinginfo/${listing.id}/*`} className='listinglink'>View More Details!</NavLink>
                    </Card>
                    <Routes>
                        <Route path={`listinginfo/:id/*`} element={<ListingDetails
                            editSpecificListing={this.props.editSpecificListing}
                            sessionToken={this.props.sessionToken}
                            listing={listing}
                        />} />
                    </Routes>
                </div>
            )
        })
    };

    componentDidMount() {
        this.props.fetchListings();
    }

    render() {
        return (
            <div>
                {this.listingsMapper()}
            </div>
        )
    }
};