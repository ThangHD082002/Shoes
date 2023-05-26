import styles from "./Checkout.module.scss";
import classNames from "classnames/bind";
import * as request from "~/utils/request";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResetContext } from "~/App";
import { useContext } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Checkout() {
  const { resetParentComponent } = useContext(ResetContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [checkEmtyName, setCheckEmtyName] = useState("");
  const [checkEmtyPhone, setCheckEmtyPhone] = useState("");
  const [checkEmtyEmail, setCheckEmtyEmail] = useState("");
  const [checkEmtyAddress, setCheckEmtyAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart"));

  var t = 0;
  for (let i = 0; i < cart.length; i++) {
    t += cart[i].total;
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    if(checkEmtyName != ""){
      setCheckEmtyName("");
    }
  }

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    if(checkEmtyPhone != ""){
      setCheckEmtyPhone("");
    }
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if(checkEmtyEmail != ""){
      setCheckEmtyEmail("");
    }
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
    if(checkEmtyAddress != ""){
      setCheckEmtyAddress("");
    }
  }

  const handleBlurName = (e) => {
    e.preventDefault();
    if(name === ""){
      setCheckEmtyName("Vui lòng nhập tên")
    }
    else{
      setCheckEmtyName("");
    }
  }

  const handleBlurPhone = (e) => {
    e.preventDefault();
    if(phone === ""){
      setCheckEmtyPhone("Vui lòng nhập số điện thoại")
    }
    else{
      setCheckEmtyPhone("");
    }
  }

  const handleBlurEmail = (e) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault();
    if (email == "") {
      setCheckEmtyEmail("Vui lòng nhập email");
    } else if (email != "" && !regex.test(email)) {
      setCheckEmtyEmail("Vui lòng nhập đúng định dạng email ");
    } else {
      setCheckEmtyEmail("");
    }
  }

  const handleBlurAddress= (e) => {
    e.preventDefault();
    if(address === ""){
      setCheckEmtyAddress("Vui lòng nhập địa chỉ")
    }
    else{
      setCheckEmtyAddress("");
    }
  }

  function handlePay(){
    if(name == "" || email == "" || phone == "" || address == "" || checkEmtyName != "" || checkEmtyEmail != "" || checkEmtyPhone != "" || checkEmtyAddress != "" || checkEmtyAddress != ""){
      if(name == ""){
        setCheckEmtyName("Vui lòng nhập tên")
      }
      if(email== ""){
        setCheckEmtyEmail("Vui lòng nhập email")
      }
      if(phone == ""){
        setCheckEmtyPhone("Vui lòng nhập số điện thoại")
      }
      if(address == ""){
        setCheckEmtyAddress("Vui lòng nhập địa chỉ")
      }
    } 
    else{
      var order = {};
      order.username = email;
      order.name = name;
      order.phone = phone;
      order.address = address;
      order.orderDetails = cart;
      order.totalAll = t;
      console.log(order);
      axios
        .post("http://localhost:8080/add/orders", {
          username: email,
          name: name,
          phone: phone,
          address: address,
          totalAll : t,
          orderDetails : cart,
        })
        .then(function (response) {
          // handle success
          console.log(response.data);
          if(response.data.message === 'add order success') {
            localStorage.setItem("cart", JSON.stringify([]));
            setSuccess(true);
            resetParentComponent();
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  }


  return (
    <div className={cx("checkout-infor")}>
      {success && (
        <div className={cx("notify-success")}>
          <div className={cx("svg")}>
            <svg _ngcontent-shj-c82="" width="100" height="100" viewBox="0 0 201 177" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-shj-c82="" d="M179.28 48.9874L171.72 46.4674L175.28 39.3474C175.641 38.6022 175.762 37.7633 175.625 36.9465C175.489 36.1297 175.103 35.3754 174.52 34.7874L166 26.2674C165.409 25.6758 164.647 25.2843 163.822 25.1479C162.997 25.0116 162.15 25.1373 161.4 25.5074L154.28 29.0674L151.76 21.5074C151.494 20.7194 150.989 20.0339 150.315 19.5464C149.641 19.0589 148.832 18.7936 148 18.7874H136C135.161 18.7853 134.343 19.0467 133.661 19.5348C132.98 20.0229 132.468 20.7129 132.2 21.5074L129.68 29.0674L122.56 25.5074C121.815 25.1465 120.976 25.0258 120.159 25.162C119.342 25.2981 118.588 25.6843 118 26.2674L109.48 34.7874C108.888 35.3785 108.497 36.1401 108.361 36.9653C108.224 37.7904 108.35 38.6375 108.72 39.3874L112.28 46.5074L104.72 49.0274C103.932 49.2936 103.247 49.7987 102.759 50.4727C102.271 51.1466 102.006 51.9557 102 52.7874V64.7874C101.998 65.626 102.259 66.444 102.747 67.1259C103.235 67.8078 103.926 68.3191 104.72 68.5874L112.28 71.1074L108.72 78.2274C108.359 78.9727 108.238 79.8116 108.375 80.6283C108.511 81.4451 108.897 82.1995 109.48 82.7874L118 91.3074C118.591 91.8991 119.353 92.2906 120.178 92.4269C121.003 92.5632 121.85 92.4375 122.6 92.0674L129.72 88.5074L132.24 96.0674C132.508 96.8619 133.02 97.552 133.701 98.0401C134.383 98.5282 135.201 98.7896 136.04 98.7874H148.04C148.879 98.7896 149.697 98.5282 150.379 98.0401C151.06 97.552 151.572 96.8619 151.84 96.0674L154.36 88.5074L161.48 92.0674C162.221 92.4192 163.051 92.535 163.86 92.399C164.668 92.2631 165.415 91.882 166 91.3074L174.52 82.7874C175.112 82.1964 175.503 81.4347 175.64 80.6096C175.776 79.7845 175.65 78.9374 175.28 78.1874L171.72 71.0674L179.28 68.5474C180.068 68.2813 180.754 67.7761 181.241 67.1022C181.729 66.4283 181.994 65.6192 182 64.7874V52.7874C182.002 51.9489 181.741 51.1308 181.253 50.4489C180.765 49.767 180.075 49.2558 179.28 48.9874ZM174 61.9074L169.2 63.5074C168.096 63.8655 167.084 64.4593 166.232 65.2478C165.381 66.0363 164.711 67.0006 164.27 68.0737C163.828 69.1469 163.626 70.3032 163.676 71.4625C163.726 72.6218 164.028 73.7564 164.56 74.7874L166.84 79.3474L162.44 83.7474L158 81.3474C156.974 80.8364 155.851 80.5517 154.705 80.5126C153.56 80.4735 152.419 80.681 151.361 81.121C150.303 81.561 149.352 82.2232 148.572 83.0628C147.792 83.9024 147.201 84.8998 146.84 85.9874L145.24 90.7874H138.88L137.28 85.9874C136.922 84.8837 136.328 83.871 135.54 83.0197C134.751 82.1683 133.787 81.4987 132.714 81.0573C131.641 80.6158 130.484 80.4131 129.325 80.4632C128.166 80.5133 127.031 80.815 126 81.3474L121.44 83.6274L117.04 79.2274L119.44 74.7874C119.972 73.7564 120.274 72.6218 120.324 71.4625C120.374 70.3032 120.172 69.1469 119.73 68.0737C119.289 67.0006 118.619 66.0363 117.768 65.2478C116.916 64.4593 115.904 63.8655 114.8 63.5074L110 61.9074V55.6674L114.8 54.0674C115.904 53.7094 116.916 53.1155 117.768 52.327C118.619 51.5385 119.289 50.5743 119.73 49.5011C120.172 48.428 120.374 47.2716 120.324 46.1123C120.274 44.953 119.972 43.8185 119.44 42.7874L117.16 38.3474L121.56 33.9474L126 36.2274C127.031 36.7598 128.166 37.0615 129.325 37.1116C130.484 37.1617 131.641 36.959 132.714 36.5176C133.787 36.0761 134.751 35.4065 135.54 34.5552C136.328 33.7039 136.922 32.6912 137.28 31.5874L138.88 26.7874L145.12 26.7874L146.72 31.5874C147.078 32.6912 147.672 33.7039 148.46 34.5552C149.249 35.4065 150.213 36.0761 151.286 36.5176C152.359 36.959 153.516 37.1617 154.675 37.1116C155.834 37.0615 156.969 36.7598 158 36.2274L162.56 33.9474L166.96 38.3474L164.56 42.7874C164.049 43.8132 163.764 44.9368 163.725 46.0822C163.686 47.2276 163.894 48.3679 164.334 49.4262C164.774 50.4844 165.436 51.4357 166.275 52.2157C167.115 52.9958 168.112 53.5863 169.2 53.9474L174 55.5474V61.9074ZM142 42.7874C138.836 42.7874 135.742 43.7258 133.111 45.4839C130.48 47.242 128.429 49.7409 127.218 52.6645C126.007 55.5881 125.69 58.8052 126.307 61.9089C126.925 65.0126 128.449 67.8635 130.686 70.1011C132.924 72.3388 135.775 73.8626 138.879 74.48C141.982 75.0974 145.199 74.7805 148.123 73.5695C151.047 72.3585 153.545 70.3077 155.304 67.6765C157.062 65.0454 158 61.9519 158 58.7874C158 54.544 156.314 50.4743 153.314 47.4737C150.313 44.4731 146.243 42.7874 142 42.7874ZM142 66.7874C140.418 66.7874 138.871 66.3182 137.555 65.4392C136.24 64.5601 135.214 63.3107 134.609 61.8489C134.003 60.3871 133.845 58.7786 134.154 57.2267C134.462 55.6749 135.224 54.2494 136.343 53.1306C137.462 52.0118 138.887 51.2498 140.439 50.9411C141.991 50.6325 143.6 50.7909 145.061 51.3964C146.523 52.0019 147.773 53.0273 148.652 54.3429C149.531 55.6585 150 57.2052 150 58.7874C150 60.9092 149.157 62.944 147.657 64.4443C146.157 65.9446 144.122 66.7874 142 66.7874Z" fill="#C5C9CC"></path><path _ngcontent-shj-c82="" d="M127.921 96.4465C107.459 135.096 58.3606 133.547 33.6428 128.083C22.2545 120.585 16.8724 108.438 19.7758 90.5591C29.8727 33.71 80.357 41.9608 80.357 41.9608L104.676 21.7876L109.27 56.1778C109.27 56.1778 122.574 67.1735 127.167 89.6587C127.621 91.8943 127.873 94.1659 127.921 96.4465Z" fill="#ED1C24"></path><path _ngcontent-shj-c82="" d="M77.1415 137.788C58.9411 137.788 43.8608 134.809 33.6426 128.091C58.3605 133.554 107.458 135.104 127.921 96.4539C128.337 117 111.852 137.788 77.1415 137.788Z" fill="#B7272D"></path><path _ngcontent-shj-c82="" d="M86.8064 59.61C82.8023 60.7183 74.5687 68.4758 63.2497 62.0515C51.9308 55.6272 33.5742 60.528 33.5742 83.4461C33.5742 106.364 59.8872 100.866 66.006 96.5888C72.1248 92.3117 80.0806 95.6711 83.4434 98.1213C86.8061 100.572 105.778 105.455 111.593 90.4761C117.409 75.4976 108.838 53.4974 86.8064 59.61Z" fill="white"></path><path _ngcontent-shj-c82="" d="M50.2747 86.3858C53.4769 86.3858 56.0728 82.6219 56.0728 77.9788C56.0728 73.3357 53.4769 69.5718 50.2747 69.5718C47.0725 69.5718 44.4766 73.3357 44.4766 77.9788C44.4766 82.6219 47.0725 86.3858 50.2747 86.3858Z" fill="#1A1A1A"></path><path _ngcontent-shj-c82="" fill-rule="evenodd" clip-rule="evenodd" d="M104.227 81.3271C104.074 76.8854 100.784 73.3369 96.7493 73.3369C92.7138 73.3369 89.4243 76.8861 89.2714 81.3284C91.2568 79.9807 93.8775 79.1614 96.7503 79.1614C99.6221 79.1614 102.242 79.9802 104.227 81.3271Z" fill="#1A1A1A"></path><g _ngcontent-shj-c82="" opacity="0.05" filter="url(#filter0_f_3_21109)"><ellipse _ngcontent-shj-c82="" cx="79" cy="156.5" rx="67" ry="8.5" fill="#222222"></ellipse></g><defs _ngcontent-shj-c82=""><filter _ngcontent-shj-c82="" id="filter0_f_3_21109" x="0" y="136" width="158" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood _ngcontent-shj-c82="" flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend _ngcontent-shj-c82="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur _ngcontent-shj-c82="" stdDeviation="6" result="effect1_foregroundBlur_3_21109"></feGaussianBlur></filter></defs></svg>
          </div>
          <p className={cx("success-name")}>Mua sản phẩm thành công</p>
        </div>
      )}
      <div className={cx("grid")}>
        <div className={cx("grid__row")}>
          <div className={cx("grid__colum-8-12")}>
            <div className={cx("infor-title")}>
              <h1 className={cx("infor-title-name")}>NHẬP THÔNG TIN CỦA BẠN</h1>
            </div>
            <div className={cx("infor-row")}>
              <div className={cx("infor-text")}>
                <div className={cx("infor-name-phone")}>
                  <div className={cx("infor-name")}>
                    <p className={cx("infor-name-text")}>Họ và tên</p>
                    <input 
                    onChange={handleChangeName}
                    onBlur={handleBlurName}
                    value={name}
                    type="text" 
                    className={cx("name-input")} 
                    placeholder="Enter Name"
                    />
                    <span className={cx("input-empty")}>{checkEmtyName}</span>
                  </div>
                  <div className={cx("infor-phone")}>
                    <p className={cx("infor-phone-text")}>Số điện thoại</p>
                    <input 
                    onChange={handleChangePhone}
                    onBlur={handleBlurPhone}
                    value={phone}
                    type="text" 
                    className={cx("phone-input")} 
                    placeholder="Enter Phone"
                    />
                    <span className={cx("input-empty")}>{checkEmtyPhone}</span>
                  </div>
                </div>
                <div className={cx("infor-email-address")}>
                  <div className={cx("infor-email")}>
                    <p className={cx("infor-emai-text")}>Email</p>
                    <input 
                    onChange={handleChangeEmail}
                    onBlur={handleBlurEmail}
                    value={email}
                    type="text" 
                    className={cx("email-input")} 
                    placeholder="Enter Email"
                    />
                    <span className={cx("input-empty")}>{checkEmtyEmail}</span>
                  </div>
                  <div className={cx("infor-address")}>
                    <p className={cx("infor-address-text")}>Địa chỉ</p>
                    <input 
                    onChange={handleChangeAddress}
                    onBlur={handleBlurAddress}
                    value={address}
                    type="text" 
                    className={cx("address-input")} 
                    placeholder="Enter Address"
                    />
                    <span className={cx("input-empty")}>{checkEmtyAddress}</span>
                  </div>
                </div>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300" width="406" height="306" class="illustration styles_illustrationTablet__1DWOa"><title>_</title><path d="M109.48,50.44c-35.14,8.4-63.09,28.83-68.05,67.07-4.18,32.21.13,89.27,58.91,99.41,114.38,19.74,203.77,29.11,239-25.79,32.34-50.38,29.88-125.7-34.19-139.51C259.84,41.85,184.78,32.44,109.48,50.44Z" fill="#e6e6e6" opacity="0.3"/><ellipse cx="200" cy="251.22" rx="140.79" ry="15.19" fill="#e6e6e6" opacity="0.45"/><path d="M94.81,213.87s-8.63-2.32-10.54-10.34c0,0,13.35-2.76,13.79,11Z" fill="#ed1c24" opacity="0.58"/><path d="M95.86,213s-6.06-9.5-.8-18.43c0,0,10.19,6.41,5.73,18.43Z" fill="#ed1c24" opacity="0.73"/><path d="M97.42,213s3.14-10.07,12.75-12c0,0,1.83,6.52-6.18,12Z" fill="#ed1c24"/><polygon points="91.16 212.81 92.96 224.76 103.97 224.76 105.54 212.81 91.16 212.81" fill="#24285b"/><path d="M94.81,213.87s-8.63-2.32-10.54-10.34c0,0,13.35-2.76,13.79,11Z" fill="#ed1c24" opacity="0.58"/><path d="M95.86,213s-6.06-9.5-.8-18.43c0,0,10.19,6.41,5.73,18.43Z" fill="#ed1c24" opacity="0.73"/><path d="M97.42,213s3.14-10.07,12.75-12c0,0,1.83,6.52-6.18,12Z" fill="#ed1c24"/><polygon points="91.16 212.81 92.96 224.76 103.97 224.76 105.54 212.81 91.16 212.81" fill="#24285b"/><rect x="76.09" y="236.49" width="49.64" height="11.9" transform="translate(201.83 484.87) rotate(-180)" fill="#ccc"/><rect x="86.95" y="224.85" width="49.64" height="11.9" transform="translate(223.53 461.59) rotate(-180)" fill="#e6e6e6" opacity="0.43"/><rect x="112.06" y="33.6" width="179.52" height="214.79" fill="#e6e6e6"/><rect x="193.85" y="41.99" width="33.58" height="4.9" opacity="0.12"/><circle cx="181.69" cy="44.97" r="5.47" fill="#fff"/><rect x="128.57" y="58.96" width="146.5" height="168.46" opacity="0.08"/><g opacity="0.12"><rect x="143.47" y="176.91" width="20.2" height="35.43"/><rect x="176.4" y="163.95" width="20.2" height="48.39"/><rect x="209.33" y="143.19" width="20.2" height="69.15"/><rect x="242.25" y="124.3" width="20.2" height="88.04"/></g><circle cx="201.82" cy="237.94" r="6.43" opacity="0.12"/><path d="M234,177.1s-25.43,5.7-35.42,23.38,31,48.19,31,48.19l28.35.1,6.54-29.63-14.78-21.08Z" opacity="0.08"/><path d="M285.86,174s33.22-3.52,32,14.06-19.88,55-19.88,55H257.14s-31-47.5-15.9-62.78S259.74,178.11,285.86,174Z" fill="#ed1c24"/><polygon points="298.01 248.77 273.17 255.47 251.14 244.28 247.79 238.32 270 238.32 305.34 238.32 298.01 248.77" fill="#24285b"/><path d="M301.88,193c-3.11-10.41,2.77-21.78,13.89-13.45,7.62,5.71,16.67,23.91,17.13,40.76,1.08,38.72-46.42-2.94-52.32-25.12l5.85-3.45s9.84,18.58,20.58,22.6C314.75,217.26,306.48,208.39,301.88,193Z" fill="#ed1c24"/><path d="M301.88,193c-3.11-10.41,2.77-21.78,13.89-13.45,7.62,5.71,16.67,23.91,17.13,40.76,1.08,38.72-46.42-2.94-52.32-25.12l5.85-3.45s9.84,18.58,20.58,22.6C314.75,217.26,306.48,208.39,301.88,193Z" fill="#fff" opacity="0.46"/><path d="M284.69,174.22a39.55,39.55,0,0,0-.44,4.47c-.07,2.06-.73,5.11-4,5.71-5,.93-6.34-7-6.34-7s-3.15-7.42,2.27-8.43C281.09,168.07,285.69,167.41,284.69,174.22Z" fill="#f4a28c"/><path d="M265.4,185.38s3.11,6.52-4.74,19.88c-4.49,7.65,9.34,20.41,9.34,20.41l34.42,3.45L298,243.05H257.14s-17.93-29.16-19.31-44.17S265.4,185.38,265.4,185.38Z" opacity="0.08"/><path d="M274.26,177.74s-.29-2.41-2.39-2.3S270.6,180,274.26,177.74Z" fill="#f4a28c"/><path d="M283.48,176.4s-.73-2.31,1.22-3.08S287.76,177,283.48,176.4Z" fill="#f4a28c"/><polygon points="296.39 236.2 299.27 209.97 255.22 209.97 259.61 237.54 258.98 241.08 296.86 241.38 296.39 236.2" fill="#ffd200"/><path d="M278.66,248.77s-8.36,2.92-5.49,6.7,7.41-2.5,7.41-2.5Z" fill="#ed1c24"/><path d="M255.22,210,264,221.5a45.09,45.09,0,0,0,19.87,14.9l13,5-34.93-.28-2.95,0,.63-3.54Z" opacity="0.08"/><path d="M284.8,173.92a3,3,0,0,0,2.75-.25,2.26,2.26,0,0,0,.6-1.55c.28-2.77-.3-6.74-2.07-9s-5.74-2.08-8.26-1.7a10.46,10.46,0,0,0-3.72,1.14,8.08,8.08,0,0,0-3,3.51c-1.6,3.38-1.83,8.8,2.41,10,6.15,1.73,9.34-5,9.34-5a10.66,10.66,0,0,0,1.55,2.6A1.48,1.48,0,0,0,284.8,173.92Z" fill="#24285b"/><path d="M278.4,247.31s33.79-17.25,36.67-8.08-20.41,14.51-35.44,15.06Z" fill="#24285b"/><circle cx="276.81" cy="224.1" r="3.77" fill="#fff"/><path d="M270.19,248.66s-26.94-26.7-32.47-18.83,15,20,29.18,25.11Z" fill="#24285b"/><path d="M269.14,250.67s8,7.11,3.36,9.21-5.6-4.94-5.6-4.94Z" fill="#ed1c24"/><path d="M265.4,185.38a11.42,11.42,0,0,0-10.15-12.49c-6.09-.65-14.1-.25-21.22,4.21-13.81,8.66-29.09,15.57-25.32,31.26s31.18,22.28,31.18,22.28l3.65-6s-24.16-8.16-19.76-20.92C227.74,192.25,262.8,211.47,265.4,185.38Z" fill="#ed1c24"/><path d="M265.4,185.38a11.42,11.42,0,0,0-10.15-12.49c-6.09-.65-14.1-.25-21.22,4.21-13.81,8.66-29.09,15.57-25.32,31.26s31.18,22.28,31.18,22.28l3.65-6s-24.16-8.16-19.76-20.92C227.74,192.25,262.8,211.47,265.4,185.38Z" fill="#fff" opacity="0.46"/><path d="M242.94,225.67s7.62,5.16,4.85,6.58-7.44-2.36-7.44-2.36Z" fill="#f4a28c"/><path d="M281.53,178.38a4,4,0,1,0-4.11,4.74l1.74,9.11,1.8-.34-1.74-9.11A4,4,0,0,0,281.53,178.38Zm-3.52,3a2.24,2.24,0,1,1,1.78-2.62A2.25,2.25,0,0,1,278,181.33Z" fill="#24285b"/><path d="M285.4,192.37s-2.73-6.7-6.47-6.15S281,195,281,195Z" fill="#f4a28c"/><rect x="162.26" y="132.22" width="28.67" height="4.83" fill="#fff" opacity="0.46"/><rect x="162.26" y="144.94" width="28.67" height="4.83" fill="#fff" opacity="0.46"/><rect x="144.87" y="132.22" width="8.46" height="4.83" fill="#ed1c24"/><rect x="144.87" y="144.94" width="8.46" height="4.83" fill="#ffd200"/><path d="M226.78,94.25a25,25,0,1,1-.53-5.07h0c.13.68.24,1.36.34,2A25.48,25.48,0,0,1,226.78,94.25Z" fill="#ed1c24"/><path d="M201.82,69.3v25l24.44-5.08S222.85,69.14,201.82,69.3Z" fill="#ffd200"/><path d="M226.78,94.25A25,25,0,0,1,188,115l13.87-20.75,24.43-5.08c.13.68.24,1.36.34,2A25.48,25.48,0,0,1,226.78,94.25Z" fill="#fff" opacity="0.46"/><rect x="112.06" y="71.01" width="53.76" height="46.5" opacity="0.08"/><rect x="104.27" y="65.83" width="56.71" height="46.5" fill="#24285b"/><path d="M133.81,73.64c.84,0,1.1.29,1.1,1.13v1.79c3.36.47,5.29,2.15,6.72,5.07.44.88.26,1.36-.73,1.79l-1.79.81c-.84.4-1.24.22-1.72-.66a4.57,4.57,0,0,0-4.67-2.81c-3.11,0-4.53.91-4.53,3a2.75,2.75,0,0,0,2.52,2.45,19.65,19.65,0,0,0,2.63.4,17.47,17.47,0,0,1,4.86,1,6.79,6.79,0,0,1,2.15,1.17,7.07,7.07,0,0,1,1.94,5.12c0,4-2.67,6.68-7.38,7.37v1.9c0,.84-.26,1.14-1.1,1.14h-2c-.84,0-1.13-.3-1.13-1.14v-1.86a8.3,8.3,0,0,1-7.3-5.62,1.18,1.18,0,0,1,.84-1.68l1.79-.66c.91-.33,1.31-.11,1.71.8q1.22,3.07,4.93,3.07c3.36,0,5-1.06,5-3.21a2.24,2.24,0,0,0-1.57-2.27A12.29,12.29,0,0,0,132.5,91a16.76,16.76,0,0,1-4.9-1.06,6.9,6.9,0,0,1-2.12-1.21,6.67,6.67,0,0,1-2-5c0-3.94,2.49-6.57,7.16-7.19V74.77c0-.84.29-1.13,1.13-1.13Z" fill="#fff"/><rect x="237.11" y="72.86" width="25.35" height="4.82" fill="#fff" opacity="0.46"/><rect x="237.11" y="83.4" width="25.35" height="4.82" fill="#fff" opacity="0.46"/><rect x="237.11" y="93.94" width="25.35" height="4.82" fill="#fff" opacity="0.46"/><rect x="247.9" y="104.48" width="14.56" height="4.82" fill="#fff" opacity="0.46"/></svg>
              </div>
            </div>
          </div>
          <div className={cx("grid__colum-4-12")}>
            <div className={cx("checkout-contain")}>
              <h1 className={cx("checkout-title")}>ĐƠN HÀNG</h1>
              <p className={cx("checkout-discount-name")}>NHẬP MÃ KHUYẾN MÃI</p>
              <input type="text" className={cx("input-checkout")} />
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
              <button className={cx("checkout-submit")} onClick={handlePay}>THANH TOÁN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
