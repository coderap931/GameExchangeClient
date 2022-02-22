import { Component, Dispatch, SetStateAction } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Home from './HomePage';
import Register from './Register';
import RegisterAdmin from './RegisterAdmin';
import Login from './Login';
import ListingCreate from './ListingCreate';
import ListingsYours from './ListingsYours';
import Orders from './Orders';

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

type MyNavbarProps = {
    updateToken: (newToken: string) => void,
    sessionToken: string,
    role: string | undefined,
    fetchRole: (username: string) => void,
    setRole: Dispatch<SetStateAction<string | undefined>>,
    logout: () => void,
    listings: ListingAPI[],
    fetchListings: () => void,
    yourListings: ListingAPI[],
    fetchYourListings: () => void,
    yourListingsMapper: () => JSX.Element[],
    fetchSpecificListing: (listingId: string) => void,
    specificListing: ListingAPI | undefined,
    deleteListing: (listingId: string) => void,
    fetchYourOrders: () => void,
    yourOrders: OrderAPI[],
    fetchSpecificOrder: (orderId: string) => void,
    specificOrder: OrderAPI | undefined,
    deleteOrder: (orderId: string) => void,
    editSpecificListing: (listingId: string, orderId: string) => void,
    setSessionToken: Dispatch<SetStateAction<string>>,
    setListings: Dispatch<SetStateAction<ListingAPI[]>>,
    setYourListings: Dispatch<SetStateAction<ListingAPI[]>>,
    setYourOrders: Dispatch<SetStateAction<OrderAPI[]>>,
    setSpecificListing: Dispatch<SetStateAction<ListingAPI | undefined>>,
    setSpecificOrder: Dispatch<SetStateAction<OrderAPI | undefined>>
}

export default class MyNavbar extends Component<MyNavbarProps, {}> {
    constructor(props: MyNavbarProps) {
        super(props);
    }
    render() {
        if (this.props.role === 'Client') {
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
                            editSpecificListing={this.props.editSpecificListing}
                        />} />
                        <Route path='/listing/create/*' element={<ListingCreate
                            sessionToken={this.props.sessionToken}
                        />} />
                        <Route path='/listing/yours/*' element={<ListingsYours
                            sessionToken={this.props.sessionToken}
                            fetchYourListings={this.props.fetchYourListings}
                            setYourListings={this.props.setYourListings}
                            yourListings={this.props.yourListings}
                            editSpecificListing={this.props.editSpecificListing}
                            deleteListing={this.props.deleteListing}
                            fetchSpecificListing={this.props.fetchSpecificListing}
                            specificListing={this.props.specificListing}
                            setSpecificListing={this.props.setSpecificListing}
                        />} />
                        <Route path='/orders/all/*' element={<Orders
                            sessionToken={this.props.sessionToken}
                            fetchYourOrders={this.props.fetchYourOrders}
                            yourOrders={this.props.yourOrders}
                            deleteOrder={this.props.deleteOrder}
                            fetchSpecificListing={this.props.fetchSpecificListing}
                            specificListing={this.props.specificListing}
                            setSpecificListing={this.props.setSpecificListing}
                            editSpecificListing={this.props.editSpecificListing}
                            setYourOrders={this.props.setYourOrders}
                            setSpecificOrder={this.props.setSpecificOrder}
                        />} />
                    </Routes>
                </div>
            )
        } else if (this.props.role === 'Admin') {
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
                            <NavLink to='/listing/all/' onClick={this.props.logout}>
                                Logout
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/orders/all/'>
                                View Your Orders
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/user/registeradmin/'>
                                Register New Admin
                            </NavLink>
                        </NavItem>
                    </Navbar>
                    <Routes>
                        <Route path='/listing/all/*' element={<Home
                            sessionToken={this.props.sessionToken}
                            editSpecificListing={this.props.editSpecificListing}
                            fetchListings={this.props.fetchListings}
                            listings={this.props.listings}
                        />} />
                        <Route path='/listing/create/*' element={<ListingCreate
                            sessionToken={this.props.sessionToken}
                        />} />
                        <Route path='/listing/yours/*' element={<ListingsYours
                            sessionToken={this.props.sessionToken}
                            fetchYourListings={this.props.fetchYourListings}
                            setYourListings={this.props.setYourListings}
                            yourListings={this.props.yourListings}
                            fetchSpecificListing={this.props.fetchSpecificListing}
                            specificListing={this.props.specificListing}
                            editSpecificListing={this.props.editSpecificListing}
                            deleteListing={this.props.deleteListing}
                            setSpecificListing={this.props.setSpecificListing}
                        />} />
                        <Route path='/orders/all/*' element={<Orders
                            sessionToken={this.props.sessionToken}
                            fetchYourOrders={this.props.fetchYourOrders}
                            yourOrders={this.props.yourOrders}
                            deleteOrder={this.props.deleteOrder}
                            fetchSpecificListing={this.props.fetchSpecificListing}
                            specificListing={this.props.specificListing}
                            setSpecificListing={this.props.setSpecificListing}
                            editSpecificListing={this.props.editSpecificListing}
                            setYourOrders={this.props.setYourOrders}
                            setSpecificOrder={this.props.setSpecificOrder}
                        />} />
                        <Route path='/user/registeradmin/*' element={<RegisterAdmin
                            sessionToken={this.props.sessionToken}
                            role={this.props.role}
                        />} />
                    </Routes>
                </div>
            )
        } else {
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
                            <NavLink to='/user/register/'>
                                Create Account
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/user/login/'>
                                Login
                            </NavLink>
                        </NavItem>
                    </Navbar>
                    <Routes>
                        <Route path='/listing/all/*' element={<Home
                            editSpecificListing={this.props.editSpecificListing}
                            sessionToken={this.props.sessionToken}
                            fetchListings={this.props.fetchListings}
                            listings={this.props.listings}
                        />} />
                        <Route path='/user/register/*' element={<Register
                            updateToken={this.props.updateToken}
                            sessionToken={this.props.sessionToken}
                            setSessionToken={this.props.setSessionToken}
                            role={this.props.role}
                            setRole={this.props.setRole}
                        />} />
                        <Route path='/user/login/*' element={<Login
                            updateToken={this.props.updateToken}
                            sessionToken={this.props.sessionToken}
                            setSessionToken={this.props.setSessionToken}
                            role={this.props.role}
                            fetchRole={this.props.fetchRole}
                            setRole={this.props.setRole}
                        />} />
                    </Routes>
                </div>
            )
        }
    }
}