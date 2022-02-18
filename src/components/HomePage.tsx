import {Component} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {Card, CardTitle, CardBody, CardSubtitle} from 'reactstrap';
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
      <p>No</p>
    }
  }
  
  listingsMapper = () => {
    console.log(this.props.listings);
    return this.props.listings.map((listing, index) => {
      return (
        <div id='listingGrid' key={index}>
          <Card key={index}>
            <CardTitle>
              {listing.item_name}
            </CardTitle>
            <CardSubtitle>
              Item New In Box: {this.newInBox(listing)}
            </CardSubtitle>
            <CardBody>
                {/* <img src={this.props.listings[index]?.pictures.picture_one} />
                <br /> */}
                <p>Description:</p> {listing.description}
                <br />
                <p>Price: $</p> {listing.price}
                <br />
                <NavLink to={`listinginfo/${listing.id}/*`}>View More Details!</NavLink>
            </CardBody>
          </Card>
          <Routes>
            <Route path={`listinginfo/:id/*`} element={<ListingDetails
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