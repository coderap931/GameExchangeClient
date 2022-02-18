import {Component} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import OrderCreate from './OrderCreate';

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

  type ListingDetailsProps = {
    listing: ListingAPI,
    sessionToken: string
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
          <p>No</p>
        }
      }

    render() {
        console.log(this.props.listing);
        const {props, state}=this;
        const {listing}=props;
        return (
            <div id='wrapper'>
                <Container>
                    <Row>
                        <Col>
                            Name: {listing.item_name}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img
                                alt='Item Picture 1'
                                src={listing.pictures?.picture_one}
                            />
                    
                            <img
                                alt='Item Picture 2'
                                src={listing.pictures?.picture_two}
                            />
                        
                            <img
                                alt='Item Picture 3'
                                src={listing.pictures?.picture_three}
                            />
                        
                            <img
                                alt='Item Picture 4'
                                src={listing.pictures?.picture_four}
                            />
                        
                            <img
                                alt='Item Picture 5'
                                src={listing.pictures?.picture_five}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Description: {listing.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Platform: {listing.platform}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        Item New In Box: {this.newInBox(listing.newInBox)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Condition Description: {listing.condition}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Price (USD): ${listing.price}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={`order/create/${listing.id}`}>Order It!</NavLink>
                        </Col>
                    </Row>
                </Container>
                <Routes>
                    <Route path={`order/create/:id`} element={<OrderCreate
                        sessionToken={this.props.sessionToken}
                        listing={listing}
                    />}/>
                </Routes>
            </div>
        )
    }
};