import React, {Component} from 'react';
import {Container, Row, Col, Carousel, CarouselIndicators, CarouselItem, CarouselControl} from 'reactstrap';

type Listing = {
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

type Pictures = {
    picture_one: string | undefined,
    picture_two: string | undefined,
    picture_three: string | undefined,
    picture_four: string | undefined,
    picture_five: string | undefined
}

type ListingState = {
    listing: Listing,
    pictures: Pictures,
}

export default class ListingDetails extends Component<{}, ListingState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            listing: {
                id: '',
                sold: false,
                item_name: '',
                description: '',
                platform: '',
                newInBox: false,
                condition: '',
                price: 0,
                pictures: false
            },
            pictures: {
                picture_one: '',
                picture_two: '',
                picture_three: '',
                picture_four: '',
                picture_five: ''
            }
        }
    }

    render() {
        return (
            <div id='wrapper'>
                <Container>
                    <Row>
                        <Col>
                            Name: {this.state.listing.item_name}
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
                                            src: this.state.pictures.picture_one
                                        },
                                        {
                                            altText: 'Item Picture 2',
                                            key: 2,
                                            src: this.state.pictures.picture_two
                                        },
                                        {
                                            altText: 'Item Picture 3',
                                            key: 3,
                                            src: this.state.pictures.picture_three
                                        },
                                        {
                                            altText: 'Item Picture 4',
                                            key: 4,
                                            src: this.state.pictures.picture_four
                                        },
                                        {
                                            altText: 'Item Picture 5',
                                            key: 5,
                                            src: this.state.pictures.picture_five
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
                                        src={this.state.pictures.picture_one}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 2'
                                        src={this.state.pictures.picture_two}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 3'
                                        src={this.state.pictures.picture_three}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 4'
                                        src={this.state.pictures.picture_four}
                                    />
                                </CarouselItem>
                                <CarouselItem
                                    onExited={function noRefCheck() {}}
                                    onExiting={function noRefCheck() {}}
                                >
                                    <img
                                        alt='Item Picture 5'
                                        src={this.state.pictures.picture_five}
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
                            Description: {this.state.listing.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Platform: {this.state.listing.platform}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            New In Box: {this.state.listing.newInBox}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Condition Description: {this.state.listing.condition}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Price (USD): ${this.state.listing.price}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}