import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./OrdersAdmin.module.scss";
import classNames from "classnames/bind";
import { faBroom, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function OrdersAdmin() {
  const [ordersRequest, setOrdersRequest] = useState([]);
  const [resetDelete, setResetDelete] = useState(true);
  const [resetUpdate, setResetUpdate] = useState(true);
  const [input, setInput] = useState('');
  const [changeInput, setChangeInput] = useState(true);
  const navigate = useNavigate();

  let varToken = localStorage.getItem("token");

  useEffect(() => {

    var role = localStorage.getItem("role");
      console.log(role);
      if(role == "CUSTOMER"){
        navigate('/admin/error-role')
      }

    request
      .getOrders("list/orders", {
        headers: {
          Authorization: `Bearer ${varToken}`,
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrdersRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [resetDelete]);

  useEffect(() => {

    var role = localStorage.getItem("role");
    console.log(role);
    if(role == "CUSTOMER"){
      navigate('/admin/error-role')
    }

      request.getOrdersByUsername("list/orders-by-username", {
          headers: {
            Authorization: `Bearer ${varToken}`},
            params: {
              username: input,
            },
        })
        .then(function (response) {
          // handle success
          // console.log(response);
          setOrdersRequest(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        }); 
  }, [changeInput])

  console.log(ordersRequest);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
    setChangeInput(!changeInput);
  }

  function handleResetrSearch(){
    setInput("");
    setChangeInput(!changeInput);
  }

  return (
    <div className={cx("user-contain")}>
      <div className={cx("grid")}>
        <div className={cx("manager-contain")}>
          <div className={cx("title-contain")}>
            <div className={cx("search-contain")}>
              <FontAwesomeIcon icon={faSearch} className={cx("search-icon")} />
              <input
                value={input}
                onChange={handleChangeInput}
                type="text"
                className={cx("input-search")}
                placeholder="Tìm kiếm"
              />
            </div>

            <div className={cx("date-start-contain")}>
              <p className={cx("date-text")}>Từ: </p>
              <input
                type="date"
                className={cx("input-search-date")}
                placeholder="Tìm kiếm"
              />
            </div>

            <div className={cx("date-end-contain")}>
              <p className={cx("date-text")}>Đến: </p>
              <input
                type="date"
                className={cx("input-search-date")}
                placeholder="Tìm kiếm"
              />
            </div>
            <div className={cx("reset-search")} onClick={handleResetrSearch}>
              <p>
                {" "}
                <FontAwesomeIcon icon={faBroom} /> Xoá bộ lọc
              </p>
            </div>
          </div>
          <div className={cx("table-contain")}>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Tổng tiền Thanh toán</th>
                  <th>Ngày tạo</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {ordersRequest.map((o) => (
                  <tr>
                    <td>
                      <p className={cx("email")}>{o.user.username}</p>
                    </td>
                    <td >
                      <p className={cx("total")}>{o.total_money}</p>
                    </td>
                    <td >
                      <p className={cx("date")}>{o.dateCreated}</p>
                    </td>
                    <td>
                    <ul className={cx("action-list")}>
                        <li className={cx("action-item")}>Xoá</li>
                        <li className={cx("action-item")}>Sửa</li>
                        <li className={cx("action-item")}>Thông tin</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersAdmin;
