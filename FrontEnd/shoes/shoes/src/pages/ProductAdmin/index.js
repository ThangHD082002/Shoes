import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductAdmin.module.scss";
import classNames from "classnames/bind";
import { faBroom, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ProductAdmin(){

    const [productsRequest, setProductsRequest] = useState([]);
    const [resetDelete, setResetDelete] = useState(true);
    const [resetUpdate, setResetUpdate] = useState(true);
    const [changPage, setChangPage] = useState(true);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const [changeInput, setChangeInput] = useState(true);
    const [page, setPage] = useState([
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
    ])

    let varToken = localStorage.getItem("token");

    // useEffect(() => {

    //   var role = localStorage.getItem("role");
    //   console.log(role);
    //   if(role == "CUSTOMER"){
    //     navigate('/admin/error-role')
    //   }

    //     request.getProductByName("name/product", {
    //         headers: {
    //           Authorization: `Bearer ${varToken}`},
    //           params: {
    //             name: input,
    //           },
    //       })
    //       .then(function (response) {
    //         // handle success
    //         // console.log(response);
    //         setProductsRequest(response);
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })
    //       .finally(function () {
    //         // always executed
    //       }); 
    // }, [changeInput])


    useEffect(() => {

      var role = localStorage.getItem("role");
      console.log(role);
      if(role == "CUSTOMER"){
        navigate('/admin/error-role')
      }

        request.getListUser("list/ten-product", {
            headers: {
              Authorization: `Bearer ${varToken}`},
              params: {
                i: 0,
              },
          })
          .then(function (response) {
            // handle success
            // console.log(response);
            setProductsRequest(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
    }, [changeInput])

    
    console.log(productsRequest);
    console.log(page)

    const handleChangeInput = (e) => {
      setInput(e.target.value);
      console.log(e.target.value);
      request.getProductByName("name/product", {
        headers: {
          Authorization: `Bearer ${varToken}`},
          params: {
            name: e.target.value,
          },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductsRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
    }

    function handlechangePage(id){
      var t = id - 1;
      request.getPageProduct("list/ten-product", {
        headers: {
          Authorization: `Bearer ${varToken}`},
          params: {
            i: t,
          },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductsRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
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
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Đơn giá</th>
                  <th>Kho</th>
                  <th>Thương hiệu</th>
                  <th>Loại sản phẩm</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {productsRequest.map((p) => (
                  <tr>
                    <td>
                      {p.id && <p className={cx("id")}>{p.id}</p>}
                    </td>
                    <td>
                      {p.name && <p className={cx("name")}>{p.name}</p>}
                    </td>
                    <td >
                      <p className={cx("total")}>{p.price}</p>
                    </td>
                    <td >
                      <p className={cx("kho")}>{p.sl}</p>
                    </td>
                    <td >
                      {p.brand&& <p className={cx("branch")}>{p.brand.name}</p>}
                    </td>
                    <td >
                      {p.productGroup.name&& <p className={cx("type")}>{p.productGroup.name}</p>}
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
          <ul className={cx("page")}>
            {page.map((p) => (
              <li className={cx("item-page")}><button key={p.id} className={cx("btn-page")} onClick={() => handlechangePage(p.id)}>{p.id}</button></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    )
}

export default ProductAdmin;