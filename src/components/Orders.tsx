import { Component, Dispatch, SetStateAction } from 'react';
import { Card, CardTitle, CardBody, CardSubtitle} from 'reactstrap';
import {Routes, Route, NavLink} from 'react-router-dom';
import ListingDetails from './ListingDetails';
import OrderEdit from './OrderEdit';

type OrderAPI = {
  id: string,
  listingId: string,
  total_price: number,
  date_time: Date,
  shipping_address: string,
}

type ListingAPI = {
  id: string,
  sold: boolean,
  orderId: string | null,
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
  deleteOrder: (orderId: string) => void,
  fetchSpecificListing: (listingId: string) => void,
  specificListing: ListingAPI | undefined,
  setSpecificListing: Dispatch<SetStateAction<ListingAPI | undefined>>,
  editSpecificListing: (listingId: string, orderId: string) => void,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
  setSpecificOrder: Dispatch<SetStateAction<OrderAPI | undefined>>
}

export default class Orders extends Component<OrdersProps, {}> {
  constructor(props: OrdersProps) {
    super(props);
  }

  yourOrdersMapper = (): JSX.Element[] => {
    return this.props.yourOrders?.map((order: OrderAPI) => {
      // this.props.fetchSpecificListing(order.listingId);
      return (
        <div id='orderGrid' key={order.id}>
          <Card className='card'>
            <CardTitle className='cardtitle'>
            Date/Time Ordered: {order.date_time}
            </CardTitle>
            {/* <CardSubtitle>
              {this.props.specificListing?.item_name}
            </CardSubtitle> */}
            <CardBody className='cardbody'>
              {/* <img src={this.props.specificListing?.pictureOne} />
              <br /> */}
              <p>Order ID:</p> {order.id}
              <br />
              <p>Total Price: $</p> {order.total_price}
              <br />
              {/* <p>Description:</p> {this.props.specificListing?.description}
              <br /> */}
              <p>Shipping Address:</p> {order.shipping_address}
              <br />
              {/* <NavLink to={`order/edit/${order.id}`}>Edit Order Details</NavLink>
              <br /> */}
              <NavLink to={'listing/all/*'} onClick={() => { this.props.deleteOrder(order.id) }} className='listinglink'>Delete Order</NavLink>
            </CardBody>
          </Card>
          <Routes>
            <Route path={`order/edit/:id/*`} element={<OrderEdit
              sessionToken={this.props.sessionToken}
              order={order}
            />} />
          </Routes>
        </div>
      )
    })
  };

  componentDidMount() {
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