import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { Fragment } from "react";
import * as request from "~/utils/request";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import {
  faChevronLeft,
  faChevronRight,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ResetContext } from "~/App";
import { useContext } from "react";

const cx = classNames.bind(styles);
const listInforProduct = [];

var product = [];
var productNew = [];
var productListSize = [];

function Cart() {
  const { resetParentComponent } = useContext(ResetContext);
  const [productRequest, setProductRequest] = useState([]);
  var x = 2;
  const queryString = window.location.search.substring(1);
  const [inforProductById, setInforProductById] = useState([]);
  const [productById, setProductById] = useState({});
  const [reset, setReset] = useState(true);
  const [resetDelete, setResetDelete] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteById, setDeleteById] = useState();
  const [totalCart, setTotalCart] = useState();
  const navigate = useNavigate();


  const color = [];
  const cart = JSON.parse(localStorage.getItem("cart"));

  let varToken = localStorage.getItem("token");
  console.log(cart);
  // console.log("\n");
  // console.log("\n");
  // console.log(resetDelete);

  // lấy thông tin của sản phầm như size, màu sắc
  useEffect(() => {
    cart.forEach(function (c) {
      request
        .getInforProduct("infor/product", {
          headers: {
            Authorization: `Bearer ${varToken}`,
          },
          params: {
            id: c.id,
          },
        })
        .then(function (response) {
          // handle success
          // console.log(response)
          listInforProduct.push(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    });
  }, [resetDelete]);

  // lấy thông tin chi tiết của sản phẩm
  useEffect(() => {
    cart.forEach(function (c) {
      request
        .getInforProduct("id/product", {
          headers: {
            Authorization: `Bearer ${varToken}`,
          },
          params: {
            id: c.id,
          },
        })
        .then(function (response) {
          setProductRequest((prev) => [...prev, response]);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    });
  }, [resetDelete]);

  // console.log(productRequest);
  // console.log("\n");
  // console.log("\n");
  // console.log(cart);

  function handleSub(id){
    const index = cart.findIndex(p => p.id === id);
    if(cart[index].sl > 0){
      cart[index].sl -= 1;
    }


    for(let i = 0; i < cart.length; i++){
      const match = productRequest.find((item) => item.id === cart[i].id);
      if(match) {
        cart[i].total = cart[i].sl*match.price;
        if(cart[i].total === 0){
          cart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          resetParentComponent();
          setShowConfirmDelete(false);
          setResetDelete(!resetDelete);
          setProductRequest([]);
          return;
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setReset(!reset);
    
  }

  const handleChangeSize = (event, id) => {
    const index = cart.findIndex(p => p.id === id);
    cart[index].size = event.target.value;
    console.log(id)
    console.log(event.target.value)
    localStorage.setItem("cart", JSON.stringify(cart));
    setReset(!reset);
  }

  const handleChangeColor = (event, id) => {
    const index = cart.findIndex(p => p.id === id);
    cart[index].color = event.target.value;
    console.log(id)
    console.log(event.target.value)
    localStorage.setItem("cart", JSON.stringify(cart));
    setReset(!reset);
  }

  function handleIncre(id){
    const index = cart.findIndex(p => p.id === id);
      cart[index].sl += 1;

      for(let i = 0; i < cart.length; i++){
        const match = productRequest.find((item) => item.id === cart[i].id);
        if(match) {
          cart[i].total = cart[i].sl*match.price;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setReset(!reset);
  }

  function handleDelete(id){
      setShowConfirmDelete(true)
      setDeleteById(id);
    }
  
  function handleConfirm(){
    for(let i = 0; i < cart.length; i++){
      if(cart[i].id === deleteById){
        cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    resetParentComponent();
    setShowConfirmDelete(false);
    setResetDelete(!resetDelete);
    setProductRequest([]);
  }

  function handleCancel(){
    setShowConfirmDelete(false)
  }

  
  for (let i = 0; i < productRequest.length; i++) {
    const match = cart.find((item) => item.id === productRequest[i].id);
    if (match) {
      productRequest[i].size = match.size;
      productRequest[i].color = match.color;
      productRequest[i].sl = match.sl;
    }
  }

 

  for (let i = 0; i < productRequest.length; i++) {
    const size = [];
    listInforProduct.map(function (arr) {
      const match = arr.find(
        (item) => item.product.id === productRequest[i].id
      );
      if (match) {
        arr.map(function (value) {
          const element = { name: value.size.name };
          const exists = size.some((item) => item.name === element.name);
          if (exists === false) {
            size.push(element);
          }
        });

        productRequest[i].listSize = size;
      }
    });
  }


  for (let i = 0; i < productRequest.length; i++) {
    const color = [];
    listInforProduct.map(function (arr) {
      const match = arr.find(
        (item) => item.product.id === productRequest[i].id
      );
      if (match) {
        arr.map(function (value) {
          const element = { name: value.color.name };
          const exists = color.some((item) => item.name === element.name);
          if (exists === false) {
            color.push(element);
          }
        });

        productRequest[i].listColor = color;
      }
    });
  }

  // function handleConfirm(c){
  //   console.log(c);
  // }
  var t = 0;
  for(let i=0; i<cart.length; i++){
    t += cart[i].total;
  }

  function handleContinuePay(){
    console.log("pay");
    navigate("/checkout");
  }

  return (
    <div className={cx("cart-contain")}>
       {showConfirmDelete && (
        <div className={cx("modal")}>
        <div className={cx("modal-content")}>
        <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
          <p className={cx("delete-title")}>Bạn có muốn xoá sản phẩm?</p>
          <button className={cx("btn-confirm") } onClick={handleConfirm}>Đồng ý</button>
          <button className={cx("btn-cancel")} onClick={handleCancel}>Huỷ</button>
        </div>
      </div>
      )}
      <div className={cx("grid")}>
        <div className={cx("grid__row")}>
          <div className={cx("grid__colum-8-12")}>
            <div className={cx("list-cart")}>
              <div className={cx("cart-title")}>
                <h1>GIỎ HÀNG</h1>
              </div>
              <div className={cx("cart-contain")}>
                {productRequest.map((p) => (
                  <div key={p.id}>
                   
                    <div className={cx("grid__row grid__row-cart d")}>
                      <div className={cx("grid__colum-2-8-12")}>
                        <img src={p.img} className={cx("cart-img")} />
                      </div>
                      <div className={cx("grid__colum-4-8-12")}>
                        <div className={cx("cart-infor-main")}>
                          <h1 className={cx("cart-product-name")}>{p.name}</h1>
                          <p className={cx("cart-product-price")}>
                            Giá: {p.price}
                          </p>
                          {/* <h1>{p.size}</h1> */}
                          <div className={cx("cart-infor-detail")}>
                            <div className={cx("infor-size")}>
                              <p className={cx("size-name")}>Size</p>
                              <select className={cx("size-select")} onChange={(event) => handleChangeSize(event, p.id)}>
                                {p && p.size && (
                                  <option value={p.size}>{p.size}</option>
                                )}
                                {p.listSize &&
                                  p.listSize.map((pls) => (
                                    <option key={pls.name} value={pls.name}>
                                      {pls.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className={cx("infor-color")}>
                              <p className={cx("color-name")}>Color</p>
                              <select className={cx("color-select")} onChange={(event) => handleChangeColor(event, p.id)}>
                                {p && p.color && (
                                  <option value={p.color}>{p.color}</option>
                                )}
                                {p.listColor &&
                                  p.listColor.map((pls) => (
                                    <option key={pls.name} value={pls.name}>
                                      {pls.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className={cx("infor-sl")}>
                              <button className={cx("subtract-btn")} onClick={() => handleSub(p.id)}>-</button>
                              <input
                                type="text"
                                value={p.sl}
                                className={cx("input-sl")}
                              />
                              <button className={cx("incre-btn")} onClick={() => handleIncre(p.id)}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("grid__colum-2-8-12")}>
                        <div className={cx("action-contain")}>
                          <h1 className={cx("total-item")}>{p.sl*p.price} VND</h1>
                          <p className={cx("status")}>Còn hàng</p>
                          <button className={cx("delete-item")} onClick={() => handleDelete(p.id)}>
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className={cx("delete-icon")}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("grid__colum-4-12")}>
            <div className={cx("checkout-contain")}>
                <h1 className={cx("checkout-title")}>ĐƠN HÀNG</h1>
              <p className={cx("checkout-discount-name")}>NHẬP MÃ KHUYẾN MÃI</p>
              <input type="text" className={cx("input-checkout")}/>
              <button className={cx("btn-discount")}>ÁP DỤNG</button>
               <div className={cx("infor-bill")}>
                <div className={cx("bill-title")}>
                  <p className={cx("bill-title-name")}>Đơn Hàng:</p>
                  <p className={cx("bill-title-discount")}>Giảm:</p>
                </div>
                <div className={cx("bill-value-contain")}>
                  <p className={cx("bill-value")}>{t} VND</p>
                  <p className={cx("bill-discount")}>0 VND</p>
                </div>
               </div>
               <div className={cx("total")}>
                <p className={cx("total-name")}>TỔNG</p>
                <p className={cx("total-value")}>{t} VND</p>
               </div>
               <button className={cx("checkout-submit")} onClick={handleContinuePay}>THANH TOÁN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
