import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle, Button} from 'reactstrap';
import APIURL from "./helpers/environment";
import './App.css';
import MyNavbar from './components/MyNavbar';

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

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [listings, setListings] = useState<ListingAPI []>([]);
  const [pictures, setPictures] = useState<PicturesAPI []>([]);
  const [specificPictures, setSpecificPictures] = useState<PicturesAPI []>([]);
  const [yourListings, setYourListings] = useState<ListingAPI []>([]);
  const [yourOrders, setYourOrders] = useState<OrderAPI []>([]);
  const [specificListing, setSpecificListing] = useState<ListingAPI []>([]);
  const [specificOrder, setSpecificOrder] = useState<OrderAPI []>([]);

  //!Update/Set User Token on Register/Login
  const updateToken = (newToken: string): void => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  //!Fetch Listings
  const fetchListings = (): void => {
    fetch(`${APIURL}/listing/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((listingsData) => {
        setListings(listingsData);
      })
  };

  //!Map Listings
  const listingsMapper = (): JSX.Element [] => {
    return listings?.map((listing: ListingAPI, index: number) => {
      {fetchPictures()}
      return (
        <div id='listingGrid'>
          <Card key={index}>
            <CardTitle>
              {listing.item_name}
            </CardTitle>
            <CardSubtitle>
              Item New In Box: {listing.newInBox}
            </CardSubtitle>
            <CardBody>
                <img src={pictures[index]?.picture_one} />
                <br />
                <p>Description:</p> {listing.description}
                <br />
                <p>Price: $</p> {listing.price}
                <br />
                <Button href={`${APIURL}/listing/${listing.id}`}>View More Details!</Button>
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  //!Fetch Your Listings
  const fetchYourListings = (): void => {
    if (sessionToken !== '') {
      fetch(`${APIURL}/listing/yours`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        })
      })
        .then((response) => response.json())
        .then((usersListings) => {
          setYourListings(usersListings);
        })
    } else {
      alert('You dont have any listings');
      <a href='/all'>Click here to return home</a>
    }
  };


  //!Map Your Listings
  const yourListingsMapper = (): JSX.Element [] => {
    return yourListings?.map((listing: ListingAPI, index: number) => {
      {fetchSpecificPictures(listing.id)}
      return (
        <div id='listingGrid'>
          <Card key={index}>
            <CardTitle>
              {listing.item_name}
            </CardTitle>
            <CardSubtitle>
              Item New In Box: {listing.newInBox}
            </CardSubtitle>
            <CardBody>
              <img src={specificPictures[0]?.picture_one} />
              <br />
              <p>Description:</p> {listing.description}
              <br />
              <p>Price: $</p> {listing.price}
              <br />
              <Button href={`${APIURL}/listing/${listing.id}`}>View Listing Details</Button>
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  //!Fetch Specific Listing
  const fetchSpecificListing = (listingId: string): void => {
    fetch(`${APIURL}/listing/listinginfo/${listingId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((listingData) => {
        setSpecificListing(listingData);
      })
  };

  //!Delete A Listing
  const deleteListing = (listingId: string): void => {
    fetch(`${APIURL}/listing/delete/${listingId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      })
    })
      .then(() => fetchListings())
      .then(() => fetchYourListings())
  };

  //!Fetch Pictures
  const fetchPictures = (): void => {
    fetch(`${APIURL}/pictures/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
      .then((res) => res.json())
      .then((picturesData) => {
        setPictures(picturesData);
      })
  };

   //!Fetch Specific Pictures
   const fetchSpecificPictures = (listingId: string): void=> {
    fetch(`${APIURL}/pictures/lookup/${listingId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
      .then((res) => res.json())
      .then((specificPicturesData) => {
        setSpecificPictures(specificPicturesData);
      })
  };

  //!Fetch Your Orders
  const fetchYourOrders = (): void => {
    if (sessionToken !== '') {
      fetch(`${APIURL}/order/all`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        })
      })
        .then((response) => response.json())
        .then((usersOrders) => {
          setYourOrders(usersOrders);
        })
    } else {
      alert('You dont have any orders');
      <a href='/all'>Click here to return home</a>
    }
  };

  //!Map Your Orders
  const yourOrdersMapper = (): JSX.Element [] => {
    return yourOrders?.map((order: OrderAPI, index: number) => {
      {fetchSpecificListing(order.listingId)}
      {fetchSpecificPictures(order.listingId)}
      return (
        <div id='orderGrid'>
          <Card key={index}>
            <CardTitle>
              {specificListing[0].item_name}
            </CardTitle>
            <CardSubtitle>
              Date/Time Ordered: {order.date_time}
            </CardSubtitle>
            <CardBody>
              <img src={specificPictures[0]?.picture_one} />
              <br />
              <p>Order ID:</p> {order.id}
              <br />
              <p>Total Price: $</p> {order.total_price}
              <br />
              <p>Description:</p> {specificListing[0].description}
              <br />
              <p>Shipping Address:</p> {order.shipping_address}
              <br />
              <Button href={`${APIURL}/listing/${order.listingId}`}>View Listing Details</Button>
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  //!Fetch Specific Order
  const fetchSpecificOrder = (orderId: string): void => {
    if (sessionToken !== '') {
      fetch(`${APIURL}/order/orderinfo/${orderId}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        })
      })
        .then((response) => response.json())
        .then((specificOrderData) => {
          setSpecificOrder(specificOrderData);
        })
    } else {
      alert('This order cannot be found, it may not exist or you may not be authorized to view it');
      <Button href='/all'>Return home</Button>
    }
  };

  return (
    <div className="App">
      <div id='wrapper'>
        <Router>
          <MyNavbar
            updateToken={updateToken}
            sessionToken={sessionToken}
            listings={listings}
            fetchListings={fetchListings}
            yourListings={yourListings}
            listingsMapper={listingsMapper}
            fetchYourListings={fetchYourListings}
            yourListingsMapper={yourListingsMapper}
            fetchSpecificListing={fetchSpecificListing}
            specificListing={specificListing}
            deleteListing={deleteListing}
            pictures={pictures}
            fetchPictures={fetchPictures}
            specificPictures={specificPictures}
            fetchSpecificPictures={fetchSpecificPictures}
            fetchYourOrders={fetchYourOrders}
            yourOrders={yourOrders}
            fetchSpecificOrder={fetchSpecificOrder}
            specificOrder={specificOrder}
            yourOrdersMapper={yourOrdersMapper}
            setSessionToken={setSessionToken}
            setListings={setListings}
            setPictures={setPictures}
            setSpecificPictures={setSpecificPictures}
            setYourListings={setYourListings}
            setYourOrders={setYourOrders}
            setSpecificListing={setSpecificListing}
            setSpecificOrder={setSpecificOrder}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;