import React, {Component, Dispatch, SetStateAction} from 'react';
import { Card, CardTitle, CardBody, CardSubtitle, Button} from 'reactstrap';
import APIURL from '../helpers/environment'

type OrderAPI = {
    id: string,
    total_price: number,
    date_time: Date,
    shipping_address: string,
    listingId: string
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
    pictures: boolean
  }

type OrdersProps = {
    specificOrder: OrderAPI [],
    fetchSpecificOrder: (orderId: string) => void,,
    setSpecificOrder: Dispatch<SetStateAction<OrderAPI[]>>,
    yourOrders :OrderAPI [],
    fetchYourOrders: () => void,
    setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
    specificListing: ListingAPI [],
    fetchSpecificListing: (listingId: string) => void,
    specificPictures: PicturesAPI [],
    fetchSpecificPictures: (listingId: string) => void,
}

export default class Orders extends Component<OrdersProps, {}> {
    constructor(props: OrdersProps) {
        super(props);
    }

    yourOrdersMapper = (): JSX.Element [] => {
        return this.props.yourOrders?.map((order: OrderAPI, index: number) => {
          {this.props.fetchSpecificListing(order.listingId)}
          {this.props.fetchSpecificPictures(order.listingId)}
          return (
            <div id='orderGrid'>
              <Card key={index}>
                <CardTitle>
                  {this.props.specificListing[0].item_name}
                </CardTitle>
                <CardSubtitle>
                  Date/Time Ordered: {order.date_time}
                </CardSubtitle>
                <CardBody>
                  <img src={this.props.specificPictures[0]?.picture_one} />
                  <br />
                  <p>Order ID:</p> {order.id}
                  <br />
                  <p>Total Price: $</p> {order.total_price}
                  <br />
                  <p>Description:</p> {this.props.specificListing[0].description}
                  <br />
                  <p>Shipping Address:</p> {order.shipping_address}
                  <br />
                  <Button href={`${APIURL}/listing/${order.listingId}`}>View Details</Button>
                </CardBody>
              </Card>
            </div>
          )
        })
      };    

}