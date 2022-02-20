import {Component, Dispatch, SetStateAction} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem} from 'reactstrap';
import Home from './HomePage';
import Register from './Register';
import Login from './Login';
import ListingCreate from './ListingCreate';
import ListingsYours from './ListingsYours';
import Orders from './Orders';

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

type OrderAPI = {
  id: string,
  total_price: number,
  date_time: Date,
  shipping_address: string,
  listing: ListingAPI
}

type MyNavbarProps = {
  updateToken: (newToken: string) => void,
  sessionToken: string,
  logout: () => void,
  listings: ListingAPI [],
  fetchListings: () => void,
  yourListings: ListingAPI [],
  fetchYourListings: () => void,
  yourListingsMapper: () => JSX.Element[],
  fetchSpecificListing: (listingId: string) => void,
  specificListing: ListingAPI | undefined,
  deleteListing: (listingId: string) => void,
  fetchYourOrders: () => void,
  yourOrders: OrderAPI [],
  fetchSpecificOrder: (orderId: string) => void,
  specificOrder: OrderAPI | undefined,
  yourOrdersMapper: () => void,
  setSessionToken: Dispatch<SetStateAction<string>>,
  setListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setYourListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
  setSpecificListing:  Dispatch<SetStateAction<ListingAPI | undefined>>,
  setSpecificOrder: Dispatch<SetStateAction<OrderAPI | undefined>>
}

export default class MyNavbar extends Component<MyNavbarProps, {}> {
  constructor(props: MyNavbarProps) {
    super(props);
  }

  render() {
    return (
      <div id='navbar'>
        <Navbar>
          <NavbarBrand>
            Game Exchange
          </NavbarBrand>
            <NavItem>
              <NavLink to='/listing/all/'>
                Home / View All Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/listing/create/'>
                Create New Listing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/listing/yours/'>
                View Your Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/user/register/'>
                Create Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/user/login/'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/listing/all/' onClick={this.props.logout}>
                Logout
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/orders/all/'>
                View Your Orders
              </NavLink>
            </NavItem>
        </Navbar>
        <Routes>
          <Route path='/listing/all/*' element={<Home 
            sessionToken={this.props.sessionToken}
            fetchListings={this.props.fetchListings}
            listings={this.props.listings}
          />}/>
          <Route path='/listing/create/*' element={<ListingCreate
            sessionToken={this.props.sessionToken}
          />} />
          <Route path='/listing/yours/*' element={<ListingsYours
            sessionToken={this.props.sessionToken}
            fetchYourListings={this.props.fetchYourListings}
            setYourListings={this.props.setYourListings}
            yourListings={this.props.yourListings}
            deleteListing={this.props.deleteListing}
            setSpecificListing={this.props.setSpecificListing}
          />} />
          <Route path='/user/register/*' element={<Register
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
              setSessionToken={this.props.setSessionToken}
          />} />
          <Route path='/user/login/*' element={<Login
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
              setSessionToken={this.props.setSessionToken}
          />} />
          <Route path='/orders/all/*' element={<Orders
              sessionToken={this.props.sessionToken}
              fetchYourOrders={this.props.fetchYourOrders}
              yourOrders={this.props.yourOrders}
              setYourOrders={this.props.setYourOrders}
          />} />
        </Routes>
      </div>
    )
  }
}