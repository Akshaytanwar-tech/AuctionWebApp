// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";

const Nav = ({ userInfo, signoutHandler }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isSellerMenuOpen, setSellerMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const sellerMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!isAdminMenuOpen);
  };

  const toggleSellerMenu = () => {
    setSellerMenuOpen(!isSellerMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setProfileMenuOpen(false);
    }
    if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
      setAdminMenuOpen(false);
    }
    if (
      sellerMenuRef.current &&
      !sellerMenuRef.current.contains(event.target)
    ) {
      setSellerMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchClicked = (e) => {
    navigate(text ? `/search/?query=${text}` : "/");
    setText("");
  };
  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Left Side Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/auction"
            className="text-white flex items-center space-x-2 hover:text-gray-200"
          >
            <i className="fas fa-gavel"></i>
            <span>Auction</span>
          </Link>
          <Link
            to="/shoping"
            className="text-white flex items-center space-x-2 hover:text-gray-200"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Shopping</span>
          </Link>
          <Link
            to="/cart"
            className="text-white flex items-center space-x-2 hover:text-gray-200"
          >
            <i className="fas fa-basket-shopping"></i>
            <span>Cart</span>
          </Link>
          {/* Dropdown for Seller */}
          {userInfo && userInfo.isSeller && (
            <div className="relative">
              <button
                onClick={toggleSellerMenu}
                className="text-white flex items-center space-x-2 hover:text-gray-200"
              >
                <i className="fas fa-store"></i>
                <span>Seller</span>
              </button>
              {isSellerMenuOpen && (
                <div
                  ref={sellerMenuRef}
                  className="absolute left-0 top-full mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-20"
                >
                  <Link
                    to="/seller/products"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-box"></i>
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/seller/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-clipboard-list"></i>
                    <span>Orders</span>
                  </Link>
                </div>
              )}
            </div>
          )}
          {/* Dropdown for Admin */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative">
              <button
                onClick={toggleAdminMenu}
                className="text-white flex items-center space-x-2 hover:text-gray-200"
              >
                <i className="fas fa-user-shield"></i>
                <span>Admin</span>
              </button>
              {isAdminMenuOpen && (
                <div
                  ref={adminMenuRef}
                  className="absolute left-0 top-full mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-20"
                >
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/products"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-box"></i>
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-clipboard-list"></i>
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className="fas fa-users"></i>
                    <span>Manage Users</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xs mx-4 md:mx-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-800"
              onChange={(event) => handleTextChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchClicked();
                }
              }}
              value={text}
            />
            <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>

        {/* Right Side Icons */}
        {userInfo ? (
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={toggleProfileMenu}
              className="text-white focus:outline-none"
            >
              <i className="fas fa-user-circle text-2xl"></i>
            </button>
            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-20"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                >
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/orderhistory"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                >
                  <i className="fas fa-box"></i>
                  <span>My Orders</span>
                </Link>
                <Link
                  to="#signout"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                  onClick={signoutHandler}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sign Out</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              id="menu-btn"
              className="md:hidden text-white focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        ) : (
          <Link to="/signin" className="mr-5 hover:text-gray-900">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        id="menu"
        className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hidden flex-col space-y-4 p-4"
      >
        <Link
          to="/auction"
          className="flex items-center space-x-2 hover:text-gray-200"
        >
          <i className="fas fa-gavel"></i>
          <span>Auction</span>
        </Link>
        <Link
          to="/shoping"
          className="flex items-center space-x-2 hover:text-gray-200"
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Shopping</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center space-x-2 hover:text-gray-200"
        >
          <i className="fas fa-basket-shopping"></i>
          <span>Cart</span>
        </Link>
        {userInfo && userInfo.isSeller && (
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-gray-200">
              <i className="fas fa-store"></i>
              <span>Seller</span>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg">
              <Link
                to="/seller/products"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
              <Link
                to="/seller/orders"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Orders</span>
              </Link>
            </div>
          </div>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-gray-200">
              <i className="fas fa-user-shield"></i>
              <span>Admin</span>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg">
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/products"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
              <Link
                to="/admin/orders"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Orders</span>
              </Link>
              <Link
                href="/admin/users"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <i className="fas fa-users"></i>
                <span>Manage Users</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
