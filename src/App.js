import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sale from "./components/Sale/Sale";
import Home from "./Pages/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
// import Testimonial from "./components/Customer";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserProfile from "./Pages/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getProfile,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import VerifyAccount from "./components/verifyAccount/VerifyAccount";
import ChangePassword from "./components/changePassword/ChangePassword";
import AdminDashBoard from "./Pages/AdminDashboard/AdminDashBoard";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import LoginWithCode from "./components/loginWithCode/LoginWithCode";
import VenderListing from "./Pages/VenderListing";
import VenderDashboard from "./components/VenderDashboard";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import CardList from "./components/ProductCard/CardList";
import SearchResult from "./Pages/searchResult.js/SearchResult";
import ProductDetail from "./Pages/ProductDetail"
import CartItems from "./Pages/Cart";
import ReportSeller from "./components/reportTheSeller/ReportSeller";
import Messages from "./Pages/AdminMnReports/Messages";
import Reports from "./Pages/AdminMnReports/Reports";
import VenderOrderList from "./Pages/VenderOrderList";
import OrderList from "./Pages/OrderList";
import CheckOut from "./Pages/CheckOut/CheckOut";
import FAQs from "./Pages/faq/FAQs";
import PrivacyPolicy from "./Pages/privacyPolicy/PrivacyPolicy";
import Discount50Percent from "./Pages/discount/Discount50Percent";
import Discount30Percent from "./Pages/discount/Discount30Percent";
import PageNotFound from "./components/noPageFound/PageNotFound";
import CategoryRendering from "./Pages/category/CategoryRendering";
import CategoryRenderingOnly from "./Pages/category/CategoryRenderingOnly";
axios.defaults.withCredentials = true;
const App = () => {
  // to get the user logged in status using cookies
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getProfile());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <BrowserRouter>
      <ToastContainer
       position="top-left"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop
       closeOnClick={false}
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      />
      <div>
        <Navbar />
      </div>
      <main className="min-h-[76vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route
            path="/verifyUser/:verificationToken"
            element={<VerifyAccount />}
          />
          <Route path="/profile/ChangePassword" element={<ChangePassword />} />
          <Route path="/profile/users" element={<AdminDashBoard />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          <Route path="/categories" element={<UserProfile />} />
          <Route
            path="/profile/dashboard/venderListing"
            element={<VenderListing />}
          />
          <Route
            path="/profile/dashboard/vendor/orderList"
            element={<VenderOrderList/>}
          />
          <Route path="/profile/dashboard" element={<VenderDashboard />} />
          <Route
            path="/profile/dashboard/editable/:id"
            element={<UpdateProduct />}
          />
          {/* <Route
            path="/item"
            element={<CardList />}
          /> */}
          <Route
            path="/item/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/item/search"
            element={<SearchResult />}
          />
          <Route
            path="/user/myWishList"
            element={<CartItems />}
          />
          <Route
            path="/user/myWishList/checkout/:id"
            element={<CheckOut/>}
          />
          <Route
            path="/user/myWishList/myOrderList"
            element={<OrderList/>}
          />
          <Route
            path="/offers/biggestDiscount"
            element={<Discount50Percent/>}
          />
          <Route
            path="/offers/discount"
            element={<Discount30Percent/>}
          />

          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/support/contactUs/:vendorId" element={<ReportSeller/>} />
          <Route path="/profile/admin/messages" element={<Messages/>} />
          <Route path="/profile/admin/reports" element={<Reports/>} />
          <Route path="/query/:category/:subCategory" element={<CategoryRendering/>} />
          <Route path="/query/:category" element={<CategoryRenderingOnly/>} />
          <Route
            path="*"
            element={
              <PageNotFound/>
            }
          />
        </Routes>
      </main>
      <div>
        {/* <ProductDetail /> */}
        {/* <ProductCheckout /> */}
        {/* <AdminDashBoard /> */}

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
