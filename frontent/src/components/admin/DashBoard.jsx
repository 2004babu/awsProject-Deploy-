import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { getAdminProducts } from "../../actions/productActions";
import { adminOrderDetail } from "../../actions/orderAcitons";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
const DashBoard = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.productsState);
  const { users } = useSelector((state) => state.userState);
  const { orderDetail } = useSelector((state) => state.orderState);
  // const { order } = useSelector((state) => state.orderState);

  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }
  let totalAmount = 0;

  if (orderDetail.length > 0) {
    totalAmount = orderDetail.reduce((acc,price) => {
      return acc+ price.totalPrice
    },0);
  }
  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(adminOrderDetail)
    dispatch(getAllUsers)
  }, [dispatch]);
  return (
    <Fragment>
      <MetaData title={'DashBoard'}/>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br /> <b>${totalAmount}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products
                    <br /> <b>{products.length||0}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br /> <b>{orderDetail.length||0}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                    <br /> <b>{users.length||0}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock
                    <br /> <b>{outOfStock}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
