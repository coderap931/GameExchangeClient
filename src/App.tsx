require("dotenv").config();
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import './App.css';
import Home from './components/HomePage';
import MyNavbar from './components/MyNavbar';
import Register from './components/Register';
const navigate = useNavigate();

//!DECLARE INTERFACES

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [listings, setListings] = useState([]);
  const [updatedListing, setUpdatedListing] = useState({});
  const [listingToUpdate, setListingToUpdate] = useState({});
  const [pictures, setPictures] = useState([]);
  const [specificPictures, setSpecificPictures] = useState({});
  const [yourListings, setYourListings] = useState([]]);
  const [yourOrders, setYourOrders] = useState([]);

  //!Update/Set User Token on Register/Login
  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  //!Logout
  const logout = () => {
    localStorage.clear();
    setSessionToken('');
  };

  //!Fetch Listings
  const fetchListings = () => {
    fetch(`${process.env.API_URL}/listing/all`, {
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
  const listingsMapper = () => {
    return listings?.map((listing: Listing, index: number) => {
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
                {fetchPictures()}
                <img src={pictures[index]?.picture_one} />
                <br />
                <p>Description:</p> {listing.description}
                <br />
                <p>Price: $</p> {listing.price}
                <br />
                <a href={`${process.env.API_URL}/listing/${listing.id}`}>View More Details!</a>
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  //!Fetch Your Listings
  const fetchYourListings = () => {
    if (sessionToken !== '') {
      fetch(`${process.env.API_URL}/listing/yours`, {
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
      alert('You have not listings, returning to home page');
      navigate('/all');
    }
  }


  //!Map Your Listings
  const yourListingsMapper = () => {
    return yourListings?.map((listing: Listing, index: number) => {
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
              {fetchSpecificPictures(listing.id)}
              <img src={specificPictures?.picture_one} />
              <br />
              <p>Description:</p> {listing.description}
              <br />
              <p>Price: $</p> {listing.price}
              <br />
              <a href={`${process.env.API_URL}/listing/${listing.id}`}>View More Details!</a>
            </CardBody>
          </Card>
        </div>
      )
    })
  };

  //!Delete A Listing
  const deleteListing = (listing: Listing) => {
    fetch(`${process.env.API_URL}/listing/delete/${listing.id}`, {
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
  const fetchPictures = () => {
    fetch(`${process.env.API_URL}/pictures/all`, {
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
   const fetchSpecificPictures = (listingId: string) => {
    fetch(`${process.env.API_URL}/pictures/lookup/${listingId}`, {
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

  //!UpdateListing

  return (
    <div className="App">
      <div id='wrapper'>
        <Router>
          <MyNavbar
            updateToken={updateToken} //???????????
            sessionToken={sessionToken}
            logout={logout}
            listings={listings}
            fetchListings={fetchListings}
            yourListings={yourListings}
            listingsMapper={listingsMapper}
            fetchYourListings={fetchYourListings}
            yourListingsMapper={yourListingsMapper}
            deleteListing={deleteListing}
            pictures={pictures}
            fetchPictures={fetchPictures}
            specificPictures={specificPictures}
            fetchSpecificPictures={fetchSpecificPictures}
          />
          <Home />
          <Register />
        </Router>
      </div>
    </div>
  );
}

export default App;
