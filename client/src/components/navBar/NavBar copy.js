import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { signout } from "../../redux/actions/user";
import { CART_EMPTY } from "../../redux/actionTypes";
import CartBadge from "../cart/badge/CartBadge";
import SearchBox from "../search/SearchBox";

// import "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const signoutHandler = () => {
    //   sign out user account
    dispatch(signout());
    dispatch({ type: CART_EMPTY });

    // remove all cart contents
    /* if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        dispatch(removeFromCart(cartItems[i].id));
      }
    } */
  };

  return (
    <>
      <div>
        <Link className="brand" to="/">
          Dandelion e-shop
        </Link>
      </div>
      <div>
        <Route
          render={({ history }) => <SearchBox history={history}></SearchBox>}
        ></Route>
      </div>
      <div>
        <Link to="/cart">
          Cart
          <CartBadge cartItems={cartItems} />
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <li>
                <Link to="/" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#Admin">
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/productlist">Products</Link>
              </li>
              <li>
                <Link to="/orderlist">Orders</Link>
              </li>
              <li>
                <Link to="/userlist">Users</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;