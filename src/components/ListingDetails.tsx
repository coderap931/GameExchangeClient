import React, {Component, Dispatch, SetStateAction} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Container, Row, Col, Carousel, CarouselIndicators, CarouselItem, CarouselControl, Button} from 'reactstrap';
import APIURL from "../helpers/environment";
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
    listingId: string,
    specificListing: ListingAPI | undefined,
    fetchSpecificListing: (listingId: string) => void,
    setSpecificListing:  Dispatch<SetStateAction<ListingAPI | undefined>>,
  }

export default class ListingDetails extends Component<ListingDetailsProps, {}> {
    constructor(props: ListingDetailsProps) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchSpecificListing(this.props.listingId);
    }

    componentDidUpdate() {
        this.props.fetchSpecificListing(this.props.listingId);
    }

    render() {
        return (
            <div id='wrapper'>
                <Container>
                    <Row>
                        <Col>
                            Name: {this.props.specificListing?.item_name}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Carousel
                                activeIndex={0}
                                next={function noRefCheck() {}}
                                previous={function noRefCheck() {}}
                            >
                                <CarouselIndicators
                                    activeIndex={0}
                                    items={[
                                        {
                                            altText: 'Item Picture 1',
                                            key: 1,
                                            src: this.props.specificListing?.pictures.picture_one
                                        },
                                        {
                                            altText: 'Item Picture 2',
                                            key: 2,
                                            src: this.props.specificListing?.pictures.picture_two
                                        },
                                        {
                                            altText: 'Item Picture 3',
                                            key: 3,
                                            src: this.props.specificListing?.pictures.picture_three
                                        },
                                        {
                                            altText: 'Item Picture 4',
                                            key: 4,
                                            src: this.props.specificListing?.pictures.picture_four
                                        },
                                        {
                                            altText: 'Item Picture 5',
                                            key: 5,
                                            src: this.props.specificListing?.pictures.picture_five
                                        }
                                    ]}
                                    onClickHandler={function noRefCheck() {}}
                                />
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 1'
                                        src={this.props.specificListing?.pictures.picture_one}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 2'
                                        src={this.props.specificListing?.pictures.picture_two}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 3'
                                        src={this.props.specificListing?.pictures.picture_three}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 4'
                                        src={this.props.specificListing?.pictures.picture_four}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 5'
                                        src={this.props.specificListing?.pictures.picture_five}
                                    />
                                </CarouselItem>
                                <CarouselControl
                                    direction='prev'
                                    directionText='Previous'
                                    onClickHandler={function noRefCheck() {}}
                                />
                                <CarouselControl
                                    direction='next'
                                    directionText='Next'
                                    onClickHandler={function noRefCheck() {}}
                                />
                            </Carousel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Description: {this.props.specificListing?.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Platform: {this.props.specificListing?.platform}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            New In Box: {this.props.specificListing?.newInBox}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Condition Description: {this.props.specificListing?.condition}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Price (USD): ${this.props.specificListing?.price}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button href={`${APIURL}/order/create/${this.props.specificListing?.id}`}>Order It!</Button>
                        </Col>
                    </Row>
                </Container>
                <Routes>
                    <Route path={`${APIURL}/order/create/${this.props.specificListing?.id}`} element={<OrderCreate
                        specificListing={this.props.specificListing}
                    />}/>
                </Routes>
            </div>
        )
    }
};