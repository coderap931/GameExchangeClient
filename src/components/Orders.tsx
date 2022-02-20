import { Component, Dispatch, SetStateAction } from 'react';
import { Card, CardTitle, CardBody, CardSubtitle} from 'reactstrap';
import {Routes, Route, NavLink} from 'react-router-dom';
import ListingDetails from './ListingDetails';

type OrderAPI = {
  id: string,
  total_price: number,
  date_time: Date,
  shipping_address: string,
  listing: ListingAPI
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
  pictureOne: string,
  pictureTwo: string | undefined,
  pictureThree: string | undefined
}

type OrdersProps = {
  sessionToken: string,
  yourOrders: OrderAPI [],
  fetchYourOrders: () => void,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
}

export default class Orders extends Component<OrdersProps, {}> {
  constructor(props: OrdersProps) {
    super(props);
  }

  yourOrdersMapper = (): JSX.Element[] => {
    return this.props.yourOrders?.map((order: OrderAPI) => {
      return (
        <div id='orderGrid' key={order.id}>
          <Card>
            <CardTitle>
              {order.listing?.item_name}
            </CardTitle>
            <CardSubtitle>
              Date/Time Ordered: {order.date_time}
            </CardSubtitle>
            <CardBody>
              <img src={order.listing.pictureOne} />
              <br />
              <p>Order ID:</p> {order.id}
              <br />
              <p>Total Price: $</p> {order.total_price}
              <br />
              <p>Description:</p> {order.listing?.description}
              <br />
              <p>Shipping Address:</p> {order.shipping_address}
              <br />
              <NavLink to={`listinginfo/${order.listing.id}`}>View Listing Details</NavLink>
            </CardBody>
          </Card>
          <Routes>
            <Route path={`listinginfo/:id`} element={<ListingDetails
              sessionToken={this.props.sessionToken}
              listing={order.listing}
            />} />
          </Routes>
        </div>
      )
    })
  };

  componentDidMount() {
    this.props.fetchYourOrders();
  }

  componentDidUpdate() {
    this.props.fetchYourOrders();
  }

  render() {
    return (
      <div>
        {this.yourOrdersMapper()}
      </div>
    )
  }
}