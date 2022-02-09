import React, {Component} from 'react';
import {Card, CardTitle, CardBody, CardSubtitle} from 'reactstrap';

type HomeState = {
  listings: Array<Object> | null,
  pictures: Array<Object> | null
}

export default class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      listings: [],
      pictures: []
    }
  }
  
  getListings() {
    fetch('http://localhost:3000/listing/all`', {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
      .then((res) => res.json())
      .then((listingData) => {
        this.setState({
          listings: listingData,
        })
      })
  };

  getPictures(listingId) {
    fetch(`http://localhost:3000/pictures/lookup/${listingId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
      .then((res) => res.json())
      .then((picturesData) => {
        this.setState({
          pictures: picturesData,
        })
      })
  };
  
  listingMapper() {
    return this.state.listings?.map((listing, index) => {
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
                {this.getPictures(listing.id)}
                <img src={this.state.pictures?.picture_one} />
                <br />
                <p>Description:</p> {listing.description}
                <br />
                <p>Price: $</p> {listing.price}
                <br />
                <a href={`http://localhost:3000/listing/${listing.id}`}>View More Details!</a> {/*!SEND LISTING OBJECT AS PROP*/}
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  componentDidMount() {
    this.getListings();
  }

  componentDidUpdate() {
    this.getListings();
  }

  render() {
    return (
      <div>
        {this.listingMapper()}
      </div>
    )
  }
};