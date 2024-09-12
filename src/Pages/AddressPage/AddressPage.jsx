import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import { Store } from "../../Store";
import "./AddressPage.css";

export default function AddressPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [crediantial, setcrediantial] = useState({
    fullName: shippingAddress.fullName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    pinCode: shippingAddress.pinCode || "",
    country: shippingAddress.country || "",
  });

  const submitHandler = (e) => {
    e.preventDefault(); // stops from reloading page on submit
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName: crediantial.fullName,
        address: crediantial.address,
        city: crediantial.city,
        pinCode: crediantial.pinCode,
        country: crediantial.country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName: crediantial.fullName,
        address: crediantial.address,
        city: crediantial.city,
        pinCode: crediantial.pinCode,
        country: crediantial.country,
      })
    );
    navigate("/payment");
  };

  const HandleOnchange = (e) => {
    setcrediantial({ ...crediantial, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Helmet>
        <title>Live Auction</title>
      </Helmet>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <CheckoutSteps step1 step2 />
      </div>
      <div className=" flex justify-center bg-transparent items-center context" id="address-form">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">Shipping Address</h1>
          </div>
          <form
            className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                name="fullName"
                type="text"
                value={crediantial.fullName}
                onChange={HandleOnchange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                type="text"
                value={crediantial.address}
                onChange={HandleOnchange}
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                type="text"
                value={crediantial.city}
                onChange={HandleOnchange}
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="pinCode"
              >
                Pin Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pinCode"
                name="pinCode"
                type="text"
                value={crediantial.pinCode}
                onChange={HandleOnchange}
                placeholder="Enter your pin code"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                name="country"
                type="text"
                value={crediantial.country}
                onChange={HandleOnchange}
                placeholder="Enter your country"
                required
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
