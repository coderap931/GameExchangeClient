import { Component, Dispatch, SetStateAction } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import ListingDetails from './ListingDetails';
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
    pictureOne: string,
    pictureTwo: string | undefined,
    pictureThree: string | undefined
}

type ListingsYoursProps = {
    sessionToken: string,
    yourListings: ListingAPI[],
    fetchYourListings: () => void,
    setYourListings: Dispatch<SetStateAction<ListingAPI[]>>,
    deleteListing: (listingId: string) => void,
    setSpecificListing: Dispatch<SetStateAction<ListingAPI | undefined>>,
}

export default class ListingsYours extends Component<ListingsYoursProps, {}> {
    constructor(props: ListingsYoursProps) {
        super(props);
    }

    yourListingsMapper = (): JSX.Element[] => {
        return this.props.yourListings?.map((listing: ListingAPI) => {
            return (
                <div id='listingGrid' key={listing.id}>
                    <Card>
                        <CardTitle>
                            {listing.item_name}
                        </CardTitle>
                        <CardSubtitle>
                            Item New In Box: {listing.newInBox}
                        </CardSubtitle>
                        <CardBody>
                            <img src={listing.pictureOne} />
                            <br />
                            <p>Description:</p> {listing.description}
                            <br />
                            <p>Price: $</p> {listing.price}
                            <br />
                            <NavLink to={`listinginfo/${listing.id}/*`}>View Listing Details</NavLink>
                            <NavLink to={`listing/edit/${listing.id}/*`}>Edit Listing Details</NavLink>
                            <NavLink to={'listing/all/*'} onClick={() => { this.props.deleteListing(listing.id) }}>Delete Listing</NavLink>
                        </CardBody>
                    </Card>
                    <Routes>
                        <Route path={`listinginfo/:id/*`} element={<ListingDetails
                            sessionToken={this.props.sessionToken}
                            listing={listing}
                        />} />
                        <Route path={`listing/edit/${listing.id}/*`} element={<ListingEdit
                            sessionToken={this.props.sessionToken}
                            listing={listing}
                            setSpecificListing={this.props.setSpecificListing}
                        />} />
                    </Routes>
                </div>
            )
        })
    }
    componentDidMount() {
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