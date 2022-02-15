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
  pictures: boolean
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
  setListings: Dispatch<SetStateAction<ListingAPI[]>>,
  listingsMapper: () => void,
  pictures: PicturesAPI [],
  fetchPictures: () => void,
  setPictures: Dispatch<SetStateAction<PicturesAPI[]>>,
  specificListing: ListingAPI [],
  fetchSpecificListing: (listingId: string) => void,
  setSpecificListing:  Dispatch<SetStateAction<ListingAPI[]>>,
  specificPictures: PicturesAPI [],
  fetchSpecificPictures: (listingId: string) => void,
  setSpecificPictures: Dispatch<SetStateAction<PicturesAPI[]>>,
}

export default class Home extends Component<HomePageProps, {}> {
  constructor(props: HomePageProps) {
    super(props);
  }
  
  listingMapper() {
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
                <img src={this.props.pictures[index].picture_one} /> {/*INDEX WONT WORK, PICTURES WILL NOT MATCH CORRECT ITEM, FIND WAY TO SEARCH THROUGH PICTURES ARRAY AND FIND BY LISTINGID (MAYBE SETSPECIFICPICTURES, BUT MAY OVERRIDE EXISTING DATA IN IT AS ITERATED THROUGH DURING MAP PROCESS*/}
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
              specificListing={this.props.specificListing}
              fetchSpecificListing={this.props.fetchSpecificListing}
              setSpecificListing={this.props.setSpecificListing}
              specificPictures={this.props.specificPictures}
              fetchSpecificPictures={this.props.fetchSpecificPictures}
              setSpecificPictures={this.props.setSpecificPictures}
            />}/>
          </Routes>
        </div>
      )
    })
  };

  componentDidMount() {
    this.props.fetchListings;
  }

  componentDidUpdate() {
    this.props.fetchListings;
  }

  render() {
    return (
      <div>
        {this.listingMapper()}
      </div>
    )
  }
};