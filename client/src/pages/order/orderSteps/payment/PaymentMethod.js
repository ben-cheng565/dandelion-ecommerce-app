import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../../../components/cart/checkout/CheckOutSteps";
import { savePaymentMethod } from "../../../../redux/actions/cart";

// import "./PaymentMethod.css";

function PaymentMethod(props) {
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <div className="col-sm-2"></div>
      <div
        className="col-xs-6 col-md-6 mx-5 m-md-auto mt-5" /*  style={{ width: "50%" }} */
      >
        <div className="card shadow">
          <div className="card-header">
            <div className="fs-4 text-center">Payment Method</div>
          </div>
          <div className="card-body">
            <form className="px-5" onSubmit={submitHandler}>
              <div className="form-check pt-3">
                <input
                  className="form-check-input"
                  type="radio"
                  id="paypal"
                  value="Paypal"
                  name="paymentMethod"
                  required
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="form-check-label" htmlFor="paypal">
                  <img
                    className="img-fluid"
                    style={{ width: "7rem" }}
                    src="/images/PayPal.png"
                    alt="PayPal"
                  ></img>
                </label>
              </div>

              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="radio"
                  id="alipay"
                  value="alipay"
                  name="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="form-check-label" htmlFor="alipay">
                  <img
                    className="img-fluid"
                    style={{ width: "7rem" }}
                    src="/images/alipay.png"
                    alt="alipay"
                  ></img>
                </label>
              </div>

              <div className="my-3 d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-2"></div>
    </div>
  );
}

export default PaymentMethod;
