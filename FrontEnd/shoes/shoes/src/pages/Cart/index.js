import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { Fragment } from "react";
import * as request from "~/utils/request";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const listInforProduct = [];

var product = [];
var productNew = [];
var productListSize = [];

console.log(1);
function Cart() {
  const [productRequest, setProductRequest] = useState([]);
  var x = 2;
  const queryString = window.location.search.substring(1);
  const [inforProductById, setInforProductById] = useState([]);
  const [productById, setProductById] = useState({});

  const color = [];
  const cart = JSON.parse(localStorage.getItem("cart"));
  let varToken = localStorage.getItem("token");


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
          // console.log(response);
          setInforProductById([]);
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
  }, []);


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
          // handle success
          // console.log(response);
          // setProductById([]);
          setProductRequest(prev => [...prev, response]);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    });
  }, []);


  for(let i =0; i < productRequest.length; i++){
    const match = cart.find(item => item.id ===  productRequest[i].id);
    if(match){
      productRequest[i].size = match.size;
      productRequest[i].color = match.color;
      productRequest[i].sl = match.sl;
    }
  }



  for(let i = 0; i < productRequest.length; i++) {
    const size = [];
    listInforProduct.map(function (arr) {
        const match = arr.find(item => item.product.id === productRequest[i].id);
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
  };

  console.log(cart)
  console.log('\n')
  console.log('\n')
  // console.log(productRequest)

  


  for(let i = 0; i < productRequest.length; i++) {
    const color = [];
    listInforProduct.map(function (arr) {
 
        const match = arr.find(item => item.product.id === productRequest[i].id);
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
  };

  // if(product && product[0])
  
  console.log(productRequest);

  
  

  return (
      <div className={cx("cart-contain")}>
      <div className={cx("grid")}>
        <div className={cx("grid__row")}>
          <div className={cx("grid__colum-8-12")}>
            <div className={cx("list-cart")}>
              <div className={cx("cart-title")}>
                <h1>GIỎ HÀNG</h1>
              </div>
              <div className={cx("cart-contain")}>
                {productRequest.map((p) => (
                  <form key={p.id}>
                    <div className={cx("grid__row grid__row-cart d")}>
                      <div className={cx("grid__colum-2-8-12")}>
                          <img src={p.img} className={cx("cart-img")} />
                      </div>
                      <div className={cx("grid__colum-4-8-12")}>
                        <div className={cx("cart-infor-main")}>
                          <h1 className={cx("cart-product-name")}>{p.name}</h1>
                          <p className={cx("cart-product-price")}>Giá: {p.price}</p>
                          {/* <h1>{p.size}</h1> */}
                          <div className={cx("cart-infor-detail")}>
                            <div className={cx("infor-size")}>
                              <p className={cx("size-name")}>Size</p>
                              <select className={cx("size-select")}>
                                {p && p.size && <option value={p.size}>{p.size}</option>}
                                {p.listSize&&p.listSize.map((pls) => (
                                  <option key={pls.name} value={pls.name}>
                                    {pls.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className={cx("infor-color")}>
                              <p className={cx("color-name")}>Color</p>
                              <select className={cx("color-select")}>
                                {p && p.color && <option value={p.color}>{p.color}</option>}
                                {p.listColor&&p.listColor.map((pls) => (
                                  <option key={pls.name} value={pls.name}>
                                    {pls.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className={cx("infor-sl")}>
                              <button className={cx("subtract-btn")}>-</button>
                              <input 
                              type="text" 
                              value={p.sl}
                              className={cx("input-sl")}/>
                              <button className={cx("incre-btn")}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("grid__colum-2-8-12")}></div>
                    </div>
                  </form>     
                ))}
              </div>
            </div>
          </div>
          <div className={cx("grid__colum-4-12")}>2</div>
        </div>
      </div>
      </div>
      
  );
}

export default Cart;
