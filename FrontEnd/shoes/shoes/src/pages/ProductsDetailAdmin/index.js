import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductsDetailAdmin.module.scss";
import classNames from "classnames/bind";
import { faBroom, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function ProductsDetailAdmin() {
  const [productsDetailRequest, setProductsDetailRequest] = useState([]);
  const [resetDelete, setResetDelete] = useState(true);
  const [resetUpdate, setResetUpdate] = useState(true);
  const [statusStocking, setStatusStocking] = useState("stocking");
  const [statusOustock, setStatusOustock] = useState("oustock");
  const [input, setInput] = useState('');
  const [changeInput, setChangeInput] = useState(true);
  const navigate = useNavigate();
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
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    },
    {
      id: 11
    },
    
  ])

  let varToken = localStorage.getItem("token");

  useEffect(() => {

    var role = localStorage.getItem("role");
    console.log(role);
    if(role == "CUSTOMER"){
      navigate('/admin/error-role')
    }

    request
      .getProductsDetail("list/ten-product-size", {
        headers: {
          Authorization: `Bearer ${varToken}`,
        },
        params: {
          i: 0,
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductsDetailRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [changeInput]);

  console.log(productsDetailRequest);
  console.log(page)

    function handlechangePage(id){
      var t = id - 1;
      request.getPageProductDetail("list/ten-product-size", {
        headers: {
          Authorization: `Bearer ${varToken}`},
          params: {
            i: t,
          },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductsDetailRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
    }

    // useEffect(() => {

    //   var role = localStorage.getItem("role");
    //   console.log(role);
    //   if(role == "CUSTOMER"){
    //     navigate('/admin/error-role')
    //   }
  
    //     request.getProductDetailsByProductname("list/product-size-by-product-name", {
    //         headers: {
    //           Authorization: `Bearer ${varToken}`},
    //           params: {
    //             productname: input,
    //           },
    //       })
    //       .then(function (response) {
    //         // handle success
    //         // console.log(response);
    //         setProductsDetailRequest(response);
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })
    //       .finally(function () {
    //         // always executed
    //       }); 
    // }, [changeInput])

    const handleChangeInput = (e) => {
      setInput(e.target.value);
      console.log(e.target.value);
      request.getProductDetailsByProductname("list/product-size-by-product-name", {
        headers: {
          Authorization: `Bearer ${varToken}`},
          params: {
            productname: e.target.value,
          },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductsDetailRequest(response);
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
                  <th>Sản phẩm</th>
                  <th>Size</th>
                  <th>Màu sắc</th>
                  <th>Kho</th>
                  <th>Trạng thái</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {productsDetailRequest.map((p) => (
                  <tr>
                     <td>
                      <p className={cx("id")}>{p.id}</p>
                    </td>
                    <td>
                      <p className={cx("product")}>{p.product.name}</p>
                    </td>
                    <td>
                      <p className={cx("size")}>{p.size.name}</p>
                    </td>
                    <td>
                      <p className={cx("color")}>{p.color.name}</p>
                    </td>
                    <td>
                      <p className={cx("kho")}>{p.quantity_bunker}</p>
                    </td> 
                    <td>
                      <p className={p.sp === 'Stocking' ? statusStocking : setStatusOustock}>{p.sp}</p>
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
  );
}

export default ProductsDetailAdmin;
