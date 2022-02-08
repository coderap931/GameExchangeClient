import React, {Component} from 'react';
import {Container, Row, Col, Carousel, CarouselIndicators, CarouselItem, CarouselControl} from 'reactstrap';

type ListingState = {
    listing: Object,
    pictures: Object,
}

export default class ListingDetails extends Component<{}, ListingState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            listing: {},
            pictures: {}
        }
    }

    //!RECIEVE LISTING PASSED AS PROP

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
                    <Row>
                        <Col>
                            {/*ADD CAROUSEL VIA REACTSTRAP DOCS https://reactstrap.github.io/?path=/docs/components-carousel--carousel*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}