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
    pictureOne: string,
    pictureTwo: string | undefined,
    pictureThree: string | undefined
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
            return (
                <p>No</p>
            )
        }
      }

    render() {
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
                                src={listing.pictureOne}
                            />
                    
                            <img
                                alt='Item Picture 2'
                                src={listing?.pictureTwo}
                            />
                        
                            <img
                                alt='Item Picture 3'
                                src={listing?.pictureThree}
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