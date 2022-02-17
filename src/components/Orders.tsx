import React, { Component, Dispatch, SetStateAction } from 'react';
import { Card, CardTitle, CardBody, CardSubtitle, Button } from 'reactstrap';
import APIURL from '../helpers/environment'

type OrderAPI = {
  id: string,
  total_price: number,
  date_time: Date,
  shipping_address: string,
  specificListing: ListingAPI
}

type PicturesAPI = {
  picture_one: string | undefined,
  picture_two: string | undefined,
  picture_three: string | undefined,
  picture_four: string | undefined,
  picture_five: string | undefined
}

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

type OrdersProps = {
  sessionToken: string,
  yourOrders: OrderAPI[],
  fetchYourOrders: () => void,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
  specificListing: ListingAPI | undefined,
  fetchSpecificListing: (listingId: string) => void | undefined,
  specificPictures: PicturesAPI | undefined,
  fetchSpecificPictures: (listingId: string) => void | undefined,
}

export default class Orders extends Component<OrdersProps, {}> {
  constructor(props: OrdersProps) {
    super(props);
  }

  yourOrdersMapper = (): JSX.Element[] => {
    return this.props.yourOrders?.map((order: OrderAPI, index: number) => {
      { this.props.fetchSpecificListing(order.specificListing.id) }
      { this.props.fetchSpecificPictures(order.specificListing.id) }
      return (
        <div id='orderGrid'>
          <Card key={index}>
            <CardTitle>
              {this.props.specificListing?.item_name}
            </CardTitle>
            <CardSubtitle>
              Date/Time Ordered: {order.date_time}
            </CardSubtitle>
            <CardBody>
              <img src={this.props.specificPictures?.picture_one} />
              <br />
              <p>Order ID:</p> {order.id}
              <br />
              <p>Total Price: $</p> {order.total_price}
              <br />
              <p>Description:</p> {this.props.specificListing?.description}
              <br />
              <p>Shipping Address:</p> {order.shipping_address}
              <br />
              <Button href={`${APIURL}/listing/${order.specificListing.id}`}>View Details</Button>
            </CardBody>
          </Card>
        </div>
      )
    })
  };
}
