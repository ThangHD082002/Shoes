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
  const [showConfirmZezo, setShowConfirmZezo] = useState(false);
  const [deleteById, setDeleteById] = useState();
  const [totalCart, setTotalCart] = useState();
  const [showCheckout, setShowCheckout] = useState(false);
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
    if(cart[index].sl > 1){
      cart[index].sl -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          setReset(!reset);
    }
    else{
      setDeleteById(id);
      setShowConfirmZezo(true);
    }


    // for(let i = 0; i < cart.length; i++){
    //   const match = productRequest.find((item) => item.id === cart[i].id);
    //   if(match) {
    //     cart[i].total = cart[i].sl*match.price;
    //     if(cart[i].total === 1){
    //       // cart.splice(i, 1);
    //       localStorage.setItem("cart", JSON.stringify(cart));
    //       resetParentComponent();
    //       setShowConfirmZezo(true);
    //       setDeleteById(id);
    //       setShowConfirmDelete(false);
    //       setResetDelete(!resetDelete);
    //       setProductRequest([]);
    //       return;
    //     }
    //   }
    // }

    // localStorage.setItem("cart", JSON.stringify(cart));
    // setReset(!reset);
    
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
    setShowConfirmZezo(false);
    setResetDelete(!resetDelete);
    setProductRequest([]);
  }

  function handleCancel(){
    setShowCheckout(false);
    setShowConfirmDelete(false)
    setShowConfirmZezo(false);
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
    var user = localStorage.getItem("username");
    if(user != ""){
      console.log("pay");
      navigate("/checkout");
    }
    else{
      setShowCheckout(true);
    }
    
  }

  function handleLogin(){
    navigate("/login");
  }

  return (
    <div className={cx("cart-contain")}>
       {showConfirmDelete && (
        <div className={cx("modal")}>
        <div className={cx("modal-content")}>
        <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
        <div>
          <div className={cx("svg")}>
             <svg _ngcontent-shj-c82="" width="100" height="100" viewBox="0 0 201 177" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-shj-c82="" d="M179.28 48.9874L171.72 46.4674L175.28 39.3474C175.641 38.6022 175.762 37.7633 175.625 36.9465C175.489 36.1297 175.103 35.3754 174.52 34.7874L166 26.2674C165.409 25.6758 164.647 25.2843 163.822 25.1479C162.997 25.0116 162.15 25.1373 161.4 25.5074L154.28 29.0674L151.76 21.5074C151.494 20.7194 150.989 20.0339 150.315 19.5464C149.641 19.0589 148.832 18.7936 148 18.7874H136C135.161 18.7853 134.343 19.0467 133.661 19.5348C132.98 20.0229 132.468 20.7129 132.2 21.5074L129.68 29.0674L122.56 25.5074C121.815 25.1465 120.976 25.0258 120.159 25.162C119.342 25.2981 118.588 25.6843 118 26.2674L109.48 34.7874C108.888 35.3785 108.497 36.1401 108.361 36.9653C108.224 37.7904 108.35 38.6375 108.72 39.3874L112.28 46.5074L104.72 49.0274C103.932 49.2936 103.247 49.7987 102.759 50.4727C102.271 51.1466 102.006 51.9557 102 52.7874V64.7874C101.998 65.626 102.259 66.444 102.747 67.1259C103.235 67.8078 103.926 68.3191 104.72 68.5874L112.28 71.1074L108.72 78.2274C108.359 78.9727 108.238 79.8116 108.375 80.6283C108.511 81.4451 108.897 82.1995 109.48 82.7874L118 91.3074C118.591 91.8991 119.353 92.2906 120.178 92.4269C121.003 92.5632 121.85 92.4375 122.6 92.0674L129.72 88.5074L132.24 96.0674C132.508 96.8619 133.02 97.552 133.701 98.0401C134.383 98.5282 135.201 98.7896 136.04 98.7874H148.04C148.879 98.7896 149.697 98.5282 150.379 98.0401C151.06 97.552 151.572 96.8619 151.84 96.0674L154.36 88.5074L161.48 92.0674C162.221 92.4192 163.051 92.535 163.86 92.399C164.668 92.2631 165.415 91.882 166 91.3074L174.52 82.7874C175.112 82.1964 175.503 81.4347 175.64 80.6096C175.776 79.7845 175.65 78.9374 175.28 78.1874L171.72 71.0674L179.28 68.5474C180.068 68.2813 180.754 67.7761 181.241 67.1022C181.729 66.4283 181.994 65.6192 182 64.7874V52.7874C182.002 51.9489 181.741 51.1308 181.253 50.4489C180.765 49.767 180.075 49.2558 179.28 48.9874ZM174 61.9074L169.2 63.5074C168.096 63.8655 167.084 64.4593 166.232 65.2478C165.381 66.0363 164.711 67.0006 164.27 68.0737C163.828 69.1469 163.626 70.3032 163.676 71.4625C163.726 72.6218 164.028 73.7564 164.56 74.7874L166.84 79.3474L162.44 83.7474L158 81.3474C156.974 80.8364 155.851 80.5517 154.705 80.5126C153.56 80.4735 152.419 80.681 151.361 81.121C150.303 81.561 149.352 82.2232 148.572 83.0628C147.792 83.9024 147.201 84.8998 146.84 85.9874L145.24 90.7874H138.88L137.28 85.9874C136.922 84.8837 136.328 83.871 135.54 83.0197C134.751 82.1683 133.787 81.4987 132.714 81.0573C131.641 80.6158 130.484 80.4131 129.325 80.4632C128.166 80.5133 127.031 80.815 126 81.3474L121.44 83.6274L117.04 79.2274L119.44 74.7874C119.972 73.7564 120.274 72.6218 120.324 71.4625C120.374 70.3032 120.172 69.1469 119.73 68.0737C119.289 67.0006 118.619 66.0363 117.768 65.2478C116.916 64.4593 115.904 63.8655 114.8 63.5074L110 61.9074V55.6674L114.8 54.0674C115.904 53.7094 116.916 53.1155 117.768 52.327C118.619 51.5385 119.289 50.5743 119.73 49.5011C120.172 48.428 120.374 47.2716 120.324 46.1123C120.274 44.953 119.972 43.8185 119.44 42.7874L117.16 38.3474L121.56 33.9474L126 36.2274C127.031 36.7598 128.166 37.0615 129.325 37.1116C130.484 37.1617 131.641 36.959 132.714 36.5176C133.787 36.0761 134.751 35.4065 135.54 34.5552C136.328 33.7039 136.922 32.6912 137.28 31.5874L138.88 26.7874L145.12 26.7874L146.72 31.5874C147.078 32.6912 147.672 33.7039 148.46 34.5552C149.249 35.4065 150.213 36.0761 151.286 36.5176C152.359 36.959 153.516 37.1617 154.675 37.1116C155.834 37.0615 156.969 36.7598 158 36.2274L162.56 33.9474L166.96 38.3474L164.56 42.7874C164.049 43.8132 163.764 44.9368 163.725 46.0822C163.686 47.2276 163.894 48.3679 164.334 49.4262C164.774 50.4844 165.436 51.4357 166.275 52.2157C167.115 52.9958 168.112 53.5863 169.2 53.9474L174 55.5474V61.9074ZM142 42.7874C138.836 42.7874 135.742 43.7258 133.111 45.4839C130.48 47.242 128.429 49.7409 127.218 52.6645C126.007 55.5881 125.69 58.8052 126.307 61.9089C126.925 65.0126 128.449 67.8635 130.686 70.1011C132.924 72.3388 135.775 73.8626 138.879 74.48C141.982 75.0974 145.199 74.7805 148.123 73.5695C151.047 72.3585 153.545 70.3077 155.304 67.6765C157.062 65.0454 158 61.9519 158 58.7874C158 54.544 156.314 50.4743 153.314 47.4737C150.313 44.4731 146.243 42.7874 142 42.7874ZM142 66.7874C140.418 66.7874 138.871 66.3182 137.555 65.4392C136.24 64.5601 135.214 63.3107 134.609 61.8489C134.003 60.3871 133.845 58.7786 134.154 57.2267C134.462 55.6749 135.224 54.2494 136.343 53.1306C137.462 52.0118 138.887 51.2498 140.439 50.9411C141.991 50.6325 143.6 50.7909 145.061 51.3964C146.523 52.0019 147.773 53.0273 148.652 54.3429C149.531 55.6585 150 57.2052 150 58.7874C150 60.9092 149.157 62.944 147.657 64.4443C146.157 65.9446 144.122 66.7874 142 66.7874Z" fill="#C5C9CC"></path><path _ngcontent-shj-c82="" d="M127.921 96.4465C107.459 135.096 58.3606 133.547 33.6428 128.083C22.2545 120.585 16.8724 108.438 19.7758 90.5591C29.8727 33.71 80.357 41.9608 80.357 41.9608L104.676 21.7876L109.27 56.1778C109.27 56.1778 122.574 67.1735 127.167 89.6587C127.621 91.8943 127.873 94.1659 127.921 96.4465Z" fill="#ED1C24"></path><path _ngcontent-shj-c82="" d="M77.1415 137.788C58.9411 137.788 43.8608 134.809 33.6426 128.091C58.3605 133.554 107.458 135.104 127.921 96.4539C128.337 117 111.852 137.788 77.1415 137.788Z" fill="#B7272D"></path><path _ngcontent-shj-c82="" d="M86.8064 59.61C82.8023 60.7183 74.5687 68.4758 63.2497 62.0515C51.9308 55.6272 33.5742 60.528 33.5742 83.4461C33.5742 106.364 59.8872 100.866 66.006 96.5888C72.1248 92.3117 80.0806 95.6711 83.4434 98.1213C86.8061 100.572 105.778 105.455 111.593 90.4761C117.409 75.4976 108.838 53.4974 86.8064 59.61Z" fill="white"></path><path _ngcontent-shj-c82="" d="M50.2747 86.3858C53.4769 86.3858 56.0728 82.6219 56.0728 77.9788C56.0728 73.3357 53.4769 69.5718 50.2747 69.5718C47.0725 69.5718 44.4766 73.3357 44.4766 77.9788C44.4766 82.6219 47.0725 86.3858 50.2747 86.3858Z" fill="#1A1A1A"></path><path _ngcontent-shj-c82="" fill-rule="evenodd" clip-rule="evenodd" d="M104.227 81.3271C104.074 76.8854 100.784 73.3369 96.7493 73.3369C92.7138 73.3369 89.4243 76.8861 89.2714 81.3284C91.2568 79.9807 93.8775 79.1614 96.7503 79.1614C99.6221 79.1614 102.242 79.9802 104.227 81.3271Z" fill="#1A1A1A"></path><g _ngcontent-shj-c82="" opacity="0.05" filter="url(#filter0_f_3_21109)"><ellipse _ngcontent-shj-c82="" cx="79" cy="156.5" rx="67" ry="8.5" fill="#222222"></ellipse></g><defs _ngcontent-shj-c82=""><filter _ngcontent-shj-c82="" id="filter0_f_3_21109" x="0" y="136" width="158" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood _ngcontent-shj-c82="" flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend _ngcontent-shj-c82="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur _ngcontent-shj-c82="" stdDeviation="6" result="effect1_foregroundBlur_3_21109"></feGaussianBlur></filter></defs></svg>
          </div>
          <p className={cx("delete-title")}>Bạn có muốn xoá sản phẩm?</p>
        </div>
          <button className={cx("btn-confirm") } onClick={handleConfirm}>Đồng ý</button>
          <button className={cx("btn-cancel")} onClick={handleCancel}>Huỷ</button>
        </div>
      </div>
      )}
      {showConfirmZezo && 
         <div className={cx("modal")}>
         <div className={cx("modal-content")}>
         <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
         <div>
           <div className={cx("svg")}>
              <svg _ngcontent-shj-c82="" width="100" height="100" viewBox="0 0 201 177" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-shj-c82="" d="M179.28 48.9874L171.72 46.4674L175.28 39.3474C175.641 38.6022 175.762 37.7633 175.625 36.9465C175.489 36.1297 175.103 35.3754 174.52 34.7874L166 26.2674C165.409 25.6758 164.647 25.2843 163.822 25.1479C162.997 25.0116 162.15 25.1373 161.4 25.5074L154.28 29.0674L151.76 21.5074C151.494 20.7194 150.989 20.0339 150.315 19.5464C149.641 19.0589 148.832 18.7936 148 18.7874H136C135.161 18.7853 134.343 19.0467 133.661 19.5348C132.98 20.0229 132.468 20.7129 132.2 21.5074L129.68 29.0674L122.56 25.5074C121.815 25.1465 120.976 25.0258 120.159 25.162C119.342 25.2981 118.588 25.6843 118 26.2674L109.48 34.7874C108.888 35.3785 108.497 36.1401 108.361 36.9653C108.224 37.7904 108.35 38.6375 108.72 39.3874L112.28 46.5074L104.72 49.0274C103.932 49.2936 103.247 49.7987 102.759 50.4727C102.271 51.1466 102.006 51.9557 102 52.7874V64.7874C101.998 65.626 102.259 66.444 102.747 67.1259C103.235 67.8078 103.926 68.3191 104.72 68.5874L112.28 71.1074L108.72 78.2274C108.359 78.9727 108.238 79.8116 108.375 80.6283C108.511 81.4451 108.897 82.1995 109.48 82.7874L118 91.3074C118.591 91.8991 119.353 92.2906 120.178 92.4269C121.003 92.5632 121.85 92.4375 122.6 92.0674L129.72 88.5074L132.24 96.0674C132.508 96.8619 133.02 97.552 133.701 98.0401C134.383 98.5282 135.201 98.7896 136.04 98.7874H148.04C148.879 98.7896 149.697 98.5282 150.379 98.0401C151.06 97.552 151.572 96.8619 151.84 96.0674L154.36 88.5074L161.48 92.0674C162.221 92.4192 163.051 92.535 163.86 92.399C164.668 92.2631 165.415 91.882 166 91.3074L174.52 82.7874C175.112 82.1964 175.503 81.4347 175.64 80.6096C175.776 79.7845 175.65 78.9374 175.28 78.1874L171.72 71.0674L179.28 68.5474C180.068 68.2813 180.754 67.7761 181.241 67.1022C181.729 66.4283 181.994 65.6192 182 64.7874V52.7874C182.002 51.9489 181.741 51.1308 181.253 50.4489C180.765 49.767 180.075 49.2558 179.28 48.9874ZM174 61.9074L169.2 63.5074C168.096 63.8655 167.084 64.4593 166.232 65.2478C165.381 66.0363 164.711 67.0006 164.27 68.0737C163.828 69.1469 163.626 70.3032 163.676 71.4625C163.726 72.6218 164.028 73.7564 164.56 74.7874L166.84 79.3474L162.44 83.7474L158 81.3474C156.974 80.8364 155.851 80.5517 154.705 80.5126C153.56 80.4735 152.419 80.681 151.361 81.121C150.303 81.561 149.352 82.2232 148.572 83.0628C147.792 83.9024 147.201 84.8998 146.84 85.9874L145.24 90.7874H138.88L137.28 85.9874C136.922 84.8837 136.328 83.871 135.54 83.0197C134.751 82.1683 133.787 81.4987 132.714 81.0573C131.641 80.6158 130.484 80.4131 129.325 80.4632C128.166 80.5133 127.031 80.815 126 81.3474L121.44 83.6274L117.04 79.2274L119.44 74.7874C119.972 73.7564 120.274 72.6218 120.324 71.4625C120.374 70.3032 120.172 69.1469 119.73 68.0737C119.289 67.0006 118.619 66.0363 117.768 65.2478C116.916 64.4593 115.904 63.8655 114.8 63.5074L110 61.9074V55.6674L114.8 54.0674C115.904 53.7094 116.916 53.1155 117.768 52.327C118.619 51.5385 119.289 50.5743 119.73 49.5011C120.172 48.428 120.374 47.2716 120.324 46.1123C120.274 44.953 119.972 43.8185 119.44 42.7874L117.16 38.3474L121.56 33.9474L126 36.2274C127.031 36.7598 128.166 37.0615 129.325 37.1116C130.484 37.1617 131.641 36.959 132.714 36.5176C133.787 36.0761 134.751 35.4065 135.54 34.5552C136.328 33.7039 136.922 32.6912 137.28 31.5874L138.88 26.7874L145.12 26.7874L146.72 31.5874C147.078 32.6912 147.672 33.7039 148.46 34.5552C149.249 35.4065 150.213 36.0761 151.286 36.5176C152.359 36.959 153.516 37.1617 154.675 37.1116C155.834 37.0615 156.969 36.7598 158 36.2274L162.56 33.9474L166.96 38.3474L164.56 42.7874C164.049 43.8132 163.764 44.9368 163.725 46.0822C163.686 47.2276 163.894 48.3679 164.334 49.4262C164.774 50.4844 165.436 51.4357 166.275 52.2157C167.115 52.9958 168.112 53.5863 169.2 53.9474L174 55.5474V61.9074ZM142 42.7874C138.836 42.7874 135.742 43.7258 133.111 45.4839C130.48 47.242 128.429 49.7409 127.218 52.6645C126.007 55.5881 125.69 58.8052 126.307 61.9089C126.925 65.0126 128.449 67.8635 130.686 70.1011C132.924 72.3388 135.775 73.8626 138.879 74.48C141.982 75.0974 145.199 74.7805 148.123 73.5695C151.047 72.3585 153.545 70.3077 155.304 67.6765C157.062 65.0454 158 61.9519 158 58.7874C158 54.544 156.314 50.4743 153.314 47.4737C150.313 44.4731 146.243 42.7874 142 42.7874ZM142 66.7874C140.418 66.7874 138.871 66.3182 137.555 65.4392C136.24 64.5601 135.214 63.3107 134.609 61.8489C134.003 60.3871 133.845 58.7786 134.154 57.2267C134.462 55.6749 135.224 54.2494 136.343 53.1306C137.462 52.0118 138.887 51.2498 140.439 50.9411C141.991 50.6325 143.6 50.7909 145.061 51.3964C146.523 52.0019 147.773 53.0273 148.652 54.3429C149.531 55.6585 150 57.2052 150 58.7874C150 60.9092 149.157 62.944 147.657 64.4443C146.157 65.9446 144.122 66.7874 142 66.7874Z" fill="#C5C9CC"></path><path _ngcontent-shj-c82="" d="M127.921 96.4465C107.459 135.096 58.3606 133.547 33.6428 128.083C22.2545 120.585 16.8724 108.438 19.7758 90.5591C29.8727 33.71 80.357 41.9608 80.357 41.9608L104.676 21.7876L109.27 56.1778C109.27 56.1778 122.574 67.1735 127.167 89.6587C127.621 91.8943 127.873 94.1659 127.921 96.4465Z" fill="#ED1C24"></path><path _ngcontent-shj-c82="" d="M77.1415 137.788C58.9411 137.788 43.8608 134.809 33.6426 128.091C58.3605 133.554 107.458 135.104 127.921 96.4539C128.337 117 111.852 137.788 77.1415 137.788Z" fill="#B7272D"></path><path _ngcontent-shj-c82="" d="M86.8064 59.61C82.8023 60.7183 74.5687 68.4758 63.2497 62.0515C51.9308 55.6272 33.5742 60.528 33.5742 83.4461C33.5742 106.364 59.8872 100.866 66.006 96.5888C72.1248 92.3117 80.0806 95.6711 83.4434 98.1213C86.8061 100.572 105.778 105.455 111.593 90.4761C117.409 75.4976 108.838 53.4974 86.8064 59.61Z" fill="white"></path><path _ngcontent-shj-c82="" d="M50.2747 86.3858C53.4769 86.3858 56.0728 82.6219 56.0728 77.9788C56.0728 73.3357 53.4769 69.5718 50.2747 69.5718C47.0725 69.5718 44.4766 73.3357 44.4766 77.9788C44.4766 82.6219 47.0725 86.3858 50.2747 86.3858Z" fill="#1A1A1A"></path><path _ngcontent-shj-c82="" fill-rule="evenodd" clip-rule="evenodd" d="M104.227 81.3271C104.074 76.8854 100.784 73.3369 96.7493 73.3369C92.7138 73.3369 89.4243 76.8861 89.2714 81.3284C91.2568 79.9807 93.8775 79.1614 96.7503 79.1614C99.6221 79.1614 102.242 79.9802 104.227 81.3271Z" fill="#1A1A1A"></path><g _ngcontent-shj-c82="" opacity="0.05" filter="url(#filter0_f_3_21109)"><ellipse _ngcontent-shj-c82="" cx="79" cy="156.5" rx="67" ry="8.5" fill="#222222"></ellipse></g><defs _ngcontent-shj-c82=""><filter _ngcontent-shj-c82="" id="filter0_f_3_21109" x="0" y="136" width="158" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood _ngcontent-shj-c82="" flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend _ngcontent-shj-c82="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur _ngcontent-shj-c82="" stdDeviation="6" result="effect1_foregroundBlur_3_21109"></feGaussianBlur></filter></defs></svg>
           </div>
           <p className={cx("delete-title")}>Sản phẩm sẽ bị xoá khỏi giỏ hàng?</p>
         </div>
           <button className={cx("btn-confirm") } onClick={handleConfirm}>Đồng ý</button>
           <button className={cx("btn-cancel")} onClick={handleCancel}>Huỷ</button>
         </div>
       </div>
      }
      {
        showCheckout && 
        <div className={cx("modal")}>
        <div className={cx("modal-content-check")}>
        <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
        <div className={cx("checkout-condition")}>
          <div className={cx("svg")}>
             <svg _ngcontent-shj-c82="" width="100" height="100" viewBox="0 0 201 177" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-shj-c82="" d="M179.28 48.9874L171.72 46.4674L175.28 39.3474C175.641 38.6022 175.762 37.7633 175.625 36.9465C175.489 36.1297 175.103 35.3754 174.52 34.7874L166 26.2674C165.409 25.6758 164.647 25.2843 163.822 25.1479C162.997 25.0116 162.15 25.1373 161.4 25.5074L154.28 29.0674L151.76 21.5074C151.494 20.7194 150.989 20.0339 150.315 19.5464C149.641 19.0589 148.832 18.7936 148 18.7874H136C135.161 18.7853 134.343 19.0467 133.661 19.5348C132.98 20.0229 132.468 20.7129 132.2 21.5074L129.68 29.0674L122.56 25.5074C121.815 25.1465 120.976 25.0258 120.159 25.162C119.342 25.2981 118.588 25.6843 118 26.2674L109.48 34.7874C108.888 35.3785 108.497 36.1401 108.361 36.9653C108.224 37.7904 108.35 38.6375 108.72 39.3874L112.28 46.5074L104.72 49.0274C103.932 49.2936 103.247 49.7987 102.759 50.4727C102.271 51.1466 102.006 51.9557 102 52.7874V64.7874C101.998 65.626 102.259 66.444 102.747 67.1259C103.235 67.8078 103.926 68.3191 104.72 68.5874L112.28 71.1074L108.72 78.2274C108.359 78.9727 108.238 79.8116 108.375 80.6283C108.511 81.4451 108.897 82.1995 109.48 82.7874L118 91.3074C118.591 91.8991 119.353 92.2906 120.178 92.4269C121.003 92.5632 121.85 92.4375 122.6 92.0674L129.72 88.5074L132.24 96.0674C132.508 96.8619 133.02 97.552 133.701 98.0401C134.383 98.5282 135.201 98.7896 136.04 98.7874H148.04C148.879 98.7896 149.697 98.5282 150.379 98.0401C151.06 97.552 151.572 96.8619 151.84 96.0674L154.36 88.5074L161.48 92.0674C162.221 92.4192 163.051 92.535 163.86 92.399C164.668 92.2631 165.415 91.882 166 91.3074L174.52 82.7874C175.112 82.1964 175.503 81.4347 175.64 80.6096C175.776 79.7845 175.65 78.9374 175.28 78.1874L171.72 71.0674L179.28 68.5474C180.068 68.2813 180.754 67.7761 181.241 67.1022C181.729 66.4283 181.994 65.6192 182 64.7874V52.7874C182.002 51.9489 181.741 51.1308 181.253 50.4489C180.765 49.767 180.075 49.2558 179.28 48.9874ZM174 61.9074L169.2 63.5074C168.096 63.8655 167.084 64.4593 166.232 65.2478C165.381 66.0363 164.711 67.0006 164.27 68.0737C163.828 69.1469 163.626 70.3032 163.676 71.4625C163.726 72.6218 164.028 73.7564 164.56 74.7874L166.84 79.3474L162.44 83.7474L158 81.3474C156.974 80.8364 155.851 80.5517 154.705 80.5126C153.56 80.4735 152.419 80.681 151.361 81.121C150.303 81.561 149.352 82.2232 148.572 83.0628C147.792 83.9024 147.201 84.8998 146.84 85.9874L145.24 90.7874H138.88L137.28 85.9874C136.922 84.8837 136.328 83.871 135.54 83.0197C134.751 82.1683 133.787 81.4987 132.714 81.0573C131.641 80.6158 130.484 80.4131 129.325 80.4632C128.166 80.5133 127.031 80.815 126 81.3474L121.44 83.6274L117.04 79.2274L119.44 74.7874C119.972 73.7564 120.274 72.6218 120.324 71.4625C120.374 70.3032 120.172 69.1469 119.73 68.0737C119.289 67.0006 118.619 66.0363 117.768 65.2478C116.916 64.4593 115.904 63.8655 114.8 63.5074L110 61.9074V55.6674L114.8 54.0674C115.904 53.7094 116.916 53.1155 117.768 52.327C118.619 51.5385 119.289 50.5743 119.73 49.5011C120.172 48.428 120.374 47.2716 120.324 46.1123C120.274 44.953 119.972 43.8185 119.44 42.7874L117.16 38.3474L121.56 33.9474L126 36.2274C127.031 36.7598 128.166 37.0615 129.325 37.1116C130.484 37.1617 131.641 36.959 132.714 36.5176C133.787 36.0761 134.751 35.4065 135.54 34.5552C136.328 33.7039 136.922 32.6912 137.28 31.5874L138.88 26.7874L145.12 26.7874L146.72 31.5874C147.078 32.6912 147.672 33.7039 148.46 34.5552C149.249 35.4065 150.213 36.0761 151.286 36.5176C152.359 36.959 153.516 37.1617 154.675 37.1116C155.834 37.0615 156.969 36.7598 158 36.2274L162.56 33.9474L166.96 38.3474L164.56 42.7874C164.049 43.8132 163.764 44.9368 163.725 46.0822C163.686 47.2276 163.894 48.3679 164.334 49.4262C164.774 50.4844 165.436 51.4357 166.275 52.2157C167.115 52.9958 168.112 53.5863 169.2 53.9474L174 55.5474V61.9074ZM142 42.7874C138.836 42.7874 135.742 43.7258 133.111 45.4839C130.48 47.242 128.429 49.7409 127.218 52.6645C126.007 55.5881 125.69 58.8052 126.307 61.9089C126.925 65.0126 128.449 67.8635 130.686 70.1011C132.924 72.3388 135.775 73.8626 138.879 74.48C141.982 75.0974 145.199 74.7805 148.123 73.5695C151.047 72.3585 153.545 70.3077 155.304 67.6765C157.062 65.0454 158 61.9519 158 58.7874C158 54.544 156.314 50.4743 153.314 47.4737C150.313 44.4731 146.243 42.7874 142 42.7874ZM142 66.7874C140.418 66.7874 138.871 66.3182 137.555 65.4392C136.24 64.5601 135.214 63.3107 134.609 61.8489C134.003 60.3871 133.845 58.7786 134.154 57.2267C134.462 55.6749 135.224 54.2494 136.343 53.1306C137.462 52.0118 138.887 51.2498 140.439 50.9411C141.991 50.6325 143.6 50.7909 145.061 51.3964C146.523 52.0019 147.773 53.0273 148.652 54.3429C149.531 55.6585 150 57.2052 150 58.7874C150 60.9092 149.157 62.944 147.657 64.4443C146.157 65.9446 144.122 66.7874 142 66.7874Z" fill="#C5C9CC"></path><path _ngcontent-shj-c82="" d="M127.921 96.4465C107.459 135.096 58.3606 133.547 33.6428 128.083C22.2545 120.585 16.8724 108.438 19.7758 90.5591C29.8727 33.71 80.357 41.9608 80.357 41.9608L104.676 21.7876L109.27 56.1778C109.27 56.1778 122.574 67.1735 127.167 89.6587C127.621 91.8943 127.873 94.1659 127.921 96.4465Z" fill="#ED1C24"></path><path _ngcontent-shj-c82="" d="M77.1415 137.788C58.9411 137.788 43.8608 134.809 33.6426 128.091C58.3605 133.554 107.458 135.104 127.921 96.4539C128.337 117 111.852 137.788 77.1415 137.788Z" fill="#B7272D"></path><path _ngcontent-shj-c82="" d="M86.8064 59.61C82.8023 60.7183 74.5687 68.4758 63.2497 62.0515C51.9308 55.6272 33.5742 60.528 33.5742 83.4461C33.5742 106.364 59.8872 100.866 66.006 96.5888C72.1248 92.3117 80.0806 95.6711 83.4434 98.1213C86.8061 100.572 105.778 105.455 111.593 90.4761C117.409 75.4976 108.838 53.4974 86.8064 59.61Z" fill="white"></path><path _ngcontent-shj-c82="" d="M50.2747 86.3858C53.4769 86.3858 56.0728 82.6219 56.0728 77.9788C56.0728 73.3357 53.4769 69.5718 50.2747 69.5718C47.0725 69.5718 44.4766 73.3357 44.4766 77.9788C44.4766 82.6219 47.0725 86.3858 50.2747 86.3858Z" fill="#1A1A1A"></path><path _ngcontent-shj-c82="" fill-rule="evenodd" clip-rule="evenodd" d="M104.227 81.3271C104.074 76.8854 100.784 73.3369 96.7493 73.3369C92.7138 73.3369 89.4243 76.8861 89.2714 81.3284C91.2568 79.9807 93.8775 79.1614 96.7503 79.1614C99.6221 79.1614 102.242 79.9802 104.227 81.3271Z" fill="#1A1A1A"></path><g _ngcontent-shj-c82="" opacity="0.05" filter="url(#filter0_f_3_21109)"><ellipse _ngcontent-shj-c82="" cx="79" cy="156.5" rx="67" ry="8.5" fill="#222222"></ellipse></g><defs _ngcontent-shj-c82=""><filter _ngcontent-shj-c82="" id="filter0_f_3_21109" x="0" y="136" width="158" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood _ngcontent-shj-c82="" flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend _ngcontent-shj-c82="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur _ngcontent-shj-c82="" stdDeviation="6" result="effect1_foregroundBlur_3_21109"></feGaussianBlur></filter></defs></svg>
          </div>
          <p className={cx("delete-title")}>Bạn cần đăng nhập để tiếp tục thanh toán</p>

        </div>
          <button className={cx("btn-login") } onClick={handleLogin}>Đăng nhập ngay</button>
        </div>
      </div>
      }
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
