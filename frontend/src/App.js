import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import UserProfilePage from "./components/UserProfilePage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import ProductsPage from "./components/productsPage/ProductsPage";
import CategoryPage from "./components/productsPage/CategoryPage";
import IndividualProductPage from "./components/IndividualProductPage";
import ShadyDealsPage from "./components/ShadyDealsPage";
import CartPage from "./components/cart/CartPage";
import CheckOutPage from "./components/checkout/CheckOutPage";
import ConfirmationPage from "./components/cart/ConfirmationPage";
import StoreManagementPage from "./components/storeback/StoreManagementPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import NotFound from "./components/NotFound";

function App() {
    return <div className="App d-flex flex-column min-vh-100">
        <NavBar/>
        <div className="mb-auto">
            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="user" element={<Outlet/>}>
                        <Route index element={<Navigate replace to="login"/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegistrationPage/>}/>
                        <Route path="profile" element={<RequireAuth><UserProfilePage/></RequireAuth>}/>
                        <Route path="orders" element={<RequireAuth><OrderHistoryPage/></RequireAuth>}/>
                    </Route>
                    <Route path="shop" element={<Outlet/>}>
                        <Route index element={<Navigate replace to="products"/>}/>
                        <Route path="products" element={<Outlet/>}>
                            <Route index element={<ProductsPage/>}/>
                            <Route path=":item" element={<IndividualProductPage/>}/>
                        </Route>
                        <Route path="category" element={<CategoryPage/>}/>
                        <Route path="shady-deals" element={<ShadyDealsPage/>}/>
                        <Route path="cart" element={<Outlet/>}>
                            <Route index element={<CartPage/>}/>
                            <Route path="checkout" element={<CheckOutPage/>}/>
                            <Route path="confirmation" element={<ConfirmationPage/>}/>
                        </Route>
                    </Route>
                    <Route path="management"
                           element={<RequireAuth minAuthLevel={1}><StoreManagementPage/></RequireAuth>}/>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="contact" element={<ContactPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
        <Footer/>
    </div>
}

export default App