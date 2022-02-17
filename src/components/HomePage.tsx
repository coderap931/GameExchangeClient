import React, {Component, Dispatch, SetStateAction} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Card, CardTitle, CardBody, CardSubtitle, CardLink} from 'reactstrap';
import APIURL from "../helpers/environment";
import ListingDetails from './ListingDetails';

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

type HomePageProps = {
  listings: ListingAPI [],
  fetchListings: () => void,
  specificListing: ListingAPI | undefined,
  fetchSpecificListing: (listingId: string) => void,
  setSpecificListing:  Dispatch<SetStateAction<ListingAPI | undefined>>,
  specificPictures: PicturesAPI | undefined,
  setSpecificPictures: Dispatch<SetStateAction<PicturesAPI | undefined>>,
}

export default class Home extends Component<HomePageProps, {}> {
  constructor(props: HomePageProps) {
    super(props);
  }
  
  listingsMapper = () => {
    console.log(this.props.listings);
    return this.props.listings?.map((listing, index) => {
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
                <img src={this.props.listings[index].pictures.picture_one} />
                <br />
                <p>Description:</p> {listing.description}
                <br />
                <p>Price: $</p> {listing.price}
                <br />
                <CardLink href={`${APIURL}/listing/${listing.id}`}>View More Details!</CardLink>
            </CardBody>
          </Card>
          <Routes>
            <Route path={`${APIURL}/listing/${listing.id}`} element={<ListingDetails
              listingId={`${listing.id}`}
              specificListing={this.props.specificListing}
              fetchSpecificListing={this.props.fetchSpecificListing}
              setSpecificListing={this.props.setSpecificListing}
            />}/>
          </Routes>
        </div>
      )
    })
  };

  componentDidMount() {
    this.props.fetchListings();
  }

  componentDidUpdate() {
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