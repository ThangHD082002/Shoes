import styles from "./Order.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Layout/component/Button";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import * as request from "~/utils/request";
import { faBell, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

function Order(){

    let varToken = localStorage.getItem("token");
    console.log(varToken);

    const [OrderRequest, setOrderRequest] = useState([]);

    const [statusWait, setStatusWait] = useState("status-wait-my");
    const [statusConfirm, setStatusConfirm] = useState("status-confirm-my");
    const [statusCanceled, setStatusCanceled] = useState("status-canceled-my");
    const [changeStatus, setChangeStatus] = useState(true);

    useEffect(() => {

        var input = localStorage.getItem("username");
    
          request.getOrderDetailByUsername("http://localhost:8080/list/order-detail-by-username-customer", {
              headers: {
                Authorization: `Bearer ${varToken}`},
                params: {
                  userName: input,
                },
            })
            .then(function (response) {
              // handle success
              // console.log(response);
              setOrderRequest(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              // always executed
            }); 
      },[changeStatus])

      console.log(OrderRequest);

      const handleButtonClick = (status, id) => {
              axios
          .post("http://localhost:8080/update/order-detail-status", {
            headers: {
              Authorization: `Bearer ${varToken}`,
            },
            id: id,
            sod: status,
          })
          .then(function (response) {
            // handle success
            setChangeStatus(!changeStatus);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
        console.log(status, id);
      }

    return (
        <div className={cx("order-contain")}>
            <div className={cx("grid")}>
                <div className={cx("grid__row")}>
                    <div className={cx("my-order")}>
                        <h1 className={cx("my-order__title")}>ĐƠN HÀNG CỦA BẠN</h1>
                    </div>
                    <div className={cx("my-order-contain")}>
                        {OrderRequest.map((o) => (
                            <div key={o.id}>
                                <div className={cx("grid__row grid__row-cart d")}>
                                    <div className={cx("grid__colum-2-8-12")}>
                                        <img src = {o.product.img} className={cx("order-img")}/>
                                    </div>
                                    <div className={cx("grid__colum-4-8-12")}>
                                    <div className={cx("order-infor-contain")}>
                                        <h2 className={cx("name")}>{o.product.name}</h2>
                                        <p className={cx("price")}>{o.product.price}</p>
                                        <div className={cx("infor-order-main")}>
                                            <p className={cx("infor-detail")}>Size: {o.size.name}</p>
                                            <p className={cx("infor-detail")}>Color: {o.color. name }</p>
                                            <p className={cx("infor-detail")}>Số lượng: {o.quantity_order}</p>
                                        </div>
                                        <p className={
                                                o.sod ==='Wait'? statusWait:
                                                o.sod === 'Confirm' ? statusConfirm: statusCanceled
                                            }
                                            >
                                            {o.sod}
                                        </p>
                                    </div>
                                    </div>
                                    <div className={cx("grid__colum-2-8-12")}>
                                        <div className={cx("btn-contain")}>
                                            <button 
                                            className={cx(o.sod === 'Canceled' ? "bought" : "cancel")}
                                            onClick={() => handleButtonClick(o.sod, o.id)}
                                            >
                                            {o.sod === 'Canceled' ? "Bought" : "Cancel"}
                                            </button>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;