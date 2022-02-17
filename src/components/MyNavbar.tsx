import React, {Component, Dispatch, SetStateAction} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
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
  pictures: PicturesAPI
}

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

type MyNavbarProps = {
  updateToken: (newToken: string) => void,
  sessionToken: string,
  listings: ListingAPI [],
  fetchListings: () => void,
  yourListings: ListingAPI [],
  listingsMapper: () => void,
  fetchYourListings: () => void,
  yourListingsMapper: () => JSX.Element[],
  fetchSpecificListing: (listingId: string) => void,
  specificListing: ListingAPI | undefined,
  deleteListing: (listingId: string) => void,
  specificPictures: PicturesAPI | undefined,
  fetchSpecificPictures: (listingId: string) => void,
  fetchYourOrders: () => void,
  yourOrders: OrderAPI [],
  fetchSpecificOrder: (orderId: string) => void,
  specificOrder: OrderAPI | undefined,
  yourOrdersMapper: () => void,
  setSessionToken: Dispatch<SetStateAction<string>>,
  setListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setSpecificPictures: Dispatch<SetStateAction<PicturesAPI | undefined>>,
  setYourListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
  setSpecificListing:  Dispatch<SetStateAction<ListingAPI | undefined>>,
  setSpecificOrder: Dispatch<SetStateAction<OrderAPI | undefined>>
}

export default class MyNavbar extends Component<MyNavbarProps, {}> {
  constructor(props: MyNavbarProps) {
    super(props);
  }

  //?Leave fetchListings to Navbar and have specific fetches in components, so listings update everytime a page is changed?

  render() {
    return (
      <div id='navbar'>
        <Navbar>
          <NavbarBrand href='/'>
            Game Exchange
          </NavbarBrand>
            <NavItem>
              <NavLink href='/listing/all'>
                Home / View All Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/listing/create'>
                Create New Listing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/listing/yours'>
                View Your Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/user/register'>
                Create Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/user/login'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/orders/all'>
                View Orders
              </NavLink>
            </NavItem>
        </Navbar>
        <Routes>
          <Route path='/listing/all' element={<Home 
            fetchListings={this.props.fetchListings}
            listings={this.props.listings}
            listingsMapper={this.props.listingsMapper}
            specificListing={this.props.specificListing}
            fetchSpecificListing={this.props.fetchSpecificListing}
            setSpecificListing={this.props.setSpecificListing}
            specificPictures={this.props.specificPictures}
            setSpecificPictures={this.props.setSpecificPictures}
          />}/>
          <Route path='/listing/create' element={<ListingCreate
            sessionToken={this.props.sessionToken}
            listings={this.props.listings}
          />} />
          <Route path='/listing/yours' element={<ListingsYours
            sessionToken={this.props.sessionToken}
            fetchYourListings={this.props.fetchYourListings}
            setYourListings={this.props.setYourListings}
            yourListings={this.props.yourListings}
            specificListing={this.props.specificListing}
            fetchSpecificListing={this.props.fetchSpecificListing}
            setSpecificListing={this.props.setSpecificListing}
            specificPictures={this.props.specificPictures}
            setSpecificPictures={this.props.setSpecificPictures}
          />} />
          <Route path='user/register' element={<Register
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
              setSessionToken={this.props.setSessionToken}
          />} />
          <Route path='/user/login' element={<Login
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
              setSessionToken={this.props.setSessionToken}
          />} />
          <Route path='/orders/all' element={<Orders
              sessionToken={this.props.sessionToken}
              fetchYourOrders={this.props.fetchYourOrders}
              yourOrders={this.props.yourOrders}
              setYourOrders={this.props.setYourOrders}
              specificListing={this.props.specificListing}
              fetchSpecificListing={this.props.fetchSpecificListing}
              specificPictures={this.props.specificPictures}
              fetchSpecificPictures={this.props.fetchSpecificPictures}
          />} />
        </Routes>
      </div>
    )
  }
}