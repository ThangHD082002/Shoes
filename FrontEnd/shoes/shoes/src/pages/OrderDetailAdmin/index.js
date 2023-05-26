import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./OrderDetailAdmin.module.scss";
import classNames from "classnames/bind";
import { faBroom, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function OrderDetailAdmin() {

    const [orderDetailRequest, setOrderDetailRequest] = useState([]);
    const [resetDelete, setResetDelete] = useState(true);
    const [resetUpdate, setResetUpdate] = useState(true);
    const [statusActive, setStatusActive] = useState("status-active");
    const [statusWait, setStatusWait] = useState("status-wait");
    const [statusConfirm, setStatusConfirm] = useState("status-confirm");
    const [statusCanceled, setStatusCanceled] = useState("status-canceled");
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
      .getOrderDetail("list/order-detail", {
        headers: {
          Authorization: `Bearer ${varToken}`,
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrderDetailRequest(response);
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

      request.getOrderDetailByUsername("list/order-detail-by-username", {
          headers: {
            Authorization: `Bearer ${varToken}`},
            params: {
              userName: input,
            },
        })
        .then(function (response) {
          // handle success
          // console.log(response);
          setOrderDetailRequest(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        }); 
  }, [changeInput])

  console.log(orderDetailRequest);

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
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Sản phẩm</th>
                  <th>Size</th>
                  <th>Màu</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Trạng thái đơn</th>
                  <th>Ngày tạo</th>
                  <th>Tác vụ</th>

                </tr>
              </thead>
              <tbody>
                {orderDetailRequest.map((o) => (
                  <tr>
                    <td>
                      <p className={cx("name")}>{o.name}</p>
                    </td>
                    <td>
                      <p className={cx("email")}>{o.user.username}</p>
                    </td>
                    <td>
                      <p className={cx("phone")}>{o.phone}</p>
                    </td>
                    <td>
                      <p className={cx("address")}>{o.address}</p>
                    </td>
                    <td>
                      <p className={cx("product")}>{o.product.name}</p>
                    </td>
                    <td>
                      <p className={cx("size")}>{o.size.name}</p>
                    </td>
                    <td>
                      <p className={cx("color")}>{o.color.name}</p>
                    </td>
                    <td>
                      <p className={cx("sl")}>{o.quantity_order}</p>
                    </td>
                    <td>
                      <p className={cx("total")}>{o.price}</p>
                    </td>
                    {/* <td>
                      <p className={c.gender === "Nam" ? male : female}>
                        {c.gender}
                      </p>
                    </td> */}
                    <td>
                      <p className={
                            o.sod ==='Wait'? statusWait:
                            o.sod === 'Confirm' ? statusConfirm: statusCanceled
                      }
                            >
                            {o.sod}
                        </p>
                    </td>
                    <td>
                      <p className={cx("date-created")}>{o.dateCreated}</p>
                    </td>
                    
                    {/* <td>
                      <p
                        className={
                          c.su === "Active" ? statusActive : statusDisabled
                        }
                      >
                        {c.su}
                      </p>
                    </td> */}
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
    )
}

export default OrderDetailAdmin;