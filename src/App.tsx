import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle, Button, Nav } from 'reactstrap';
import APIURL from "./helpers/environment";
import './App.css';
import MyNavbar from './components/MyNavbar';

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

type OrderAPI = {
    id: string,
    listingId: string,
    total_price: number,
    date_time: Date,
    shipping_address: string,
}

const App: React.FunctionComponent = () => {
    const [sessionToken, setSessionToken] = useState<string>('');
    const [role, setRole] = useState<string | undefined>('');
    const [listings, setListings] = useState<ListingAPI[]>([]);
    const [yourListings, setYourListings] = useState<ListingAPI[]>([]);
    const [yourOrders, setYourOrders] = useState<OrderAPI[]>([]);
    const [specificListing, setSpecificListing] = useState<ListingAPI | undefined>();
    const [specificOrder, setSpecificOrder] = useState<OrderAPI | undefined>();

    //!Update/Set User Token on Register/Login
    const updateToken = (newToken: string): void => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
    };

    //!Logout function
    const logout = () => {
        localStorage.clear();
        setSessionToken('');
        setRole('');
        alert('You have been logged outerHeight, returning to homepage');
        <Navigate to='listing/all/*' />

    }

    //!Fetch Role
    const fetchRole = (username: string): void => {
        fetch(`${APIURL}/user/userrole/${username}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            })
        })
            .then((response) => response.json())
            .then((userRole) => {
                setRole(userRole.role);
            })
    }

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
            alert('You dont have any listings, returning to homepage');
            <Navigate to='listing/all/*' />

        }
    };


    //!Map Your Listings
    const yourListingsMapper = (): JSX.Element[] => {
        return yourListings?.map((listing: ListingAPI, index: number) => {
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
                            <img src={listing.pictureOne} />
                            <br />
                            <p>Description:</p> {listing.description}
                            <br />
                            <p>Price: $</p> {listing.price}
                            <br />
                            <Button to={`${APIURL}/listing/${listing.id}`}>View Listing Details</Button>
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

    //!Edit Listing and update OrderId and sold bool
    const editSpecificListing = (listingId: string | undefined, orderId: string): void => {
        fetch(`${APIURL}/listing/edit/${listingId}`, {
            method: 'PUT',
            body: JSON.stringify({
                listing: {
                    sold: true,
                    orderId: orderId
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    //Do nothing, continue on
                } else {
                    console.log('Unable to update listings values SOLD and ORDERID');
                }
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
            .then(() => {
                alert('Listing Deleted');
                <Navigate to='/*' />
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
            alert('You dont have any orders, returning to homepage');
            <Navigate to='listing/all/*' />
        }
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
            alert('This order cannot be found, it may not exist or you may not be authorized to view it, returning to homepage');
            <Navigate to='listing/all/*' />
        }
    };

    //!Delete An Order
    const deleteOrder = (orderId: string): void => {
        fetch(`${APIURL}/order/delete/${orderId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            })
        })
            .then(() => fetchYourOrders())
            .then(() => {
                alert('Order Cancelled, returning to homepage');
                <Navigate to='listing/all/*' />
            })
    };

    return (
        <div className="App">
            <div id='wrapper'>
                <Router>
                    <MyNavbar
                        updateToken={updateToken}
                        sessionToken={sessionToken}
                        role={role}
                        setRole={setRole}
                        fetchRole={fetchRole}
                        logout={logout}
                        listings={listings}
                        fetchListings={fetchListings}
                        yourListings={yourListings}
                        fetchYourListings={fetchYourListings}
                        yourListingsMapper={yourListingsMapper}
                        fetchSpecificListing={fetchSpecificListing}
                        specificListing={specificListing}
                        deleteListing={deleteListing}
                        fetchYourOrders={fetchYourOrders}
                        yourOrders={yourOrders}
                        fetchSpecificOrder={fetchSpecificOrder}
                        specificOrder={specificOrder}
                        setSessionToken={setSessionToken}
                        setListings={setListings}
                        setYourListings={setYourListings}
                        setYourOrders={setYourOrders}
                        setSpecificListing={setSpecificListing}
                        editSpecificListing={editSpecificListing}
                        setSpecificOrder={setSpecificOrder}
                        deleteOrder={deleteOrder}
                    />
                </Router>
            </div>
        </div>
    );
}

export default App;