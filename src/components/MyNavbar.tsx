import React, {Component, Dispatch, SetStateAction} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import Home from './HomePage';
import Register from './Register';
import Login from './Login';
import ListingCreate from './ListingCreate';
import ListingsYours from './ListingsYours';
import Orders from './Orders'

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
  specificListing: ListingAPI [],
  deleteListing: (listingId: string) => void,
  pictures: PicturesAPI [],
  fetchPictures: () => void,
  specificPictures: PicturesAPI [],
  fetchSpecificPictures: (listingId: string) => void,
  fetchYourOrders: () => void,
  yourOrders: OrderAPI [],
  fetchSpecificOrder: (orderId: string) => void,
  specificOrder: OrderAPI [],
  yourOrdersMapper: () => void,
  setSessionToken: Dispatch<SetStateAction<string>>,
  setListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setPictures: Dispatch<SetStateAction<PicturesAPI[]>>,
  setSpecificPictures: Dispatch<SetStateAction<PicturesAPI[]>>,
  setYourListings: Dispatch<SetStateAction<ListingAPI[]>>,
  setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
  setSpecificListing:  Dispatch<SetStateAction<ListingAPI[]>>,
  setSpecificOrder: Dispatch<SetStateAction<OrderAPI[]>>
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
          {/* !!!!!!!!!!!!!!!ADD MORE PROPS AS NEEDED TO PASS THROUGH TO CHILD PAGES OF THE PAGES BELOW!!!!!!!!!!!!!!!!!!!!! */}
          <Route path='/listing/all' element={<Home 
            fetchListings={this.props.fetchListings}
            listings={this.props.listings}
            listingsMapper={this.props.listingsMapper}
            setListings={this.props.setListings}
            pictures={this.props.pictures}
            fetchPictures={this.props.fetchPictures}
            setPictures={this.props.setPictures}
            specificListing={this.props.specificListing}
            fetchSpecificListing={this.props.fetchSpecificListing}
            setSpecificListing={this.props.setSpecificListing}
            specificPictures={this.props.specificPictures}
            fetchSpecificPictures={this.props.fetchSpecificPictures}
            setSpecificPictures={this.props.setSpecificPictures}
          />}/>
          <Route path='/listing/create' element={<ListingCreate
            listings={this.props.listings}
          />} />
          <Route path='/listing/yours' element={<ListingsYours
            fetchYourListings={this.props.fetchYourListings}
            yourListings={this.props.yourListings}
            yourListingsMapper={this.props.yourListingsMapper} 
          />} />
          <Route path='user/register' element={<Register
            updateToken={this.props.updateToken}
          />} />
          <Route path='/user/login' element={<Login
              updateToken={this.props.updateToken}
              sessionToken={this.props.sessionToken}
              setSessionToken={this.props.setSessionToken}
          />} />
          <Route path='/orders/all' element={<Orders
              fetchYourOrders={this.props.fetchYourOrders}
              yourOrders={this.props.yourOrders}
              yourOrdersMapper={this.props.yourOrdersMapper}
              setYourOrders={this.props.setYourOrders}
          />} />
        </Routes>
      </div>
    )
  }
}