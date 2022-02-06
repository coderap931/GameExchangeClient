import React, {Component} from 'react';
import {Card} from 'reactstrap';

type ListingState = {
  listings: Array,
}

export default class Home extends Component<{}, ListingState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      listings: [],
    }
  }
  
  getListings() {
    fetch(`${APIURL}/listing/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((listingData) => {
        this.setState({
          listings: listingData,
        });
      });
  });
  
  listingMapper() {
    return this.state.listings?.map((listing, index) => {
      return (
        <div id='listingGrid'>
          <Card>
            <CardTitle>
              {this.state.listings[index].item_name}
            </CardTitle>
            <CardSubtitle>
              {
                let nib = this.state.listings[index].newInBox;
                if(nib === true){
                  return(
                    <h5>New</h5>
                  )
                } else {
                  return(
                    <h5>Used</h5>
                  )
                }
              }
            </CardSubtitle>
            <CardBody>
                <p>Description:</p> {this.state.listings[index].description}
                <br />
                <p>Price: $</p> {this.state.listings[index].price}
                <br />
                //INSERT URL TO FULL LISTING DETAILS PAGE
            </CardBody>
          </Card>
        </div>
      )
    })
  };
  render() {
    return (
      <div>
        //INSERT NAVBAR
        {listingMapper()}
      </div>
    )
  }
}