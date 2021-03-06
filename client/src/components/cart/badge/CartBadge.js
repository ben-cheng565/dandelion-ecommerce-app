import React from "react";

// import "./CartBadge.css";

function CartBadge(props) {
  const { cartItems } = props;

  return (
    <>
      {cartItems.length > 0 && (
        <span className="badge rounded-pill bg-danger">{cartItems.length}</span>
      )}
    </>
  );
}

export default CartBadge;
