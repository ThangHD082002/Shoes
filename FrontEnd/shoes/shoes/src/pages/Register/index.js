import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Layout/component/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import * as request from "~/utils/request";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { act } from "react-dom/test-utils";
const cx = classNames.bind(styles);
function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState("");
  const [isCheckSuccessRegister, setIsCheckSuccessRegister] = useState("");
  const [
    isCheckFaildRegister,
    setIsCheckFaildRegister,
    isCheckSuccessPassword,
  ] = useState("");

  const navigate = useNavigate();
  let link = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isEmailEmpty != "" ||
      isPasswordEmpty != "" ||
      isConfirmPasswordEmpty != "" ||
      email == "" ||
      pass == "" ||
      confirmPass == "" ||
      pass != confirmPass
    ) {
      if (pass != confirmPass) {
        setIsConfirmPasswordEmpty("mật khẩu không trùng khớp");
      }
      link = "/register";
      if (email == "") {
        setIsEmailEmpty("Vui lòng nhập email");
      }
      if (pass == "") {
        setIsPasswordEmpty("Vui lòng nhập password");
      }
      if (confirmPass == "") {
        setIsConfirmPasswordEmpty("Vui lòng confirm password");
      }
    } else {
      request
        .postCheckRegister("add/user", {
          username: email,
          password: pass
        })  
        .then(function (response) {
          console.log(response.message);
          if (response.message == "Register Faild") {
            link = "/register";
            setIsCheckFaildRegister("Tài khoản đã tồn tại vui lòng nhập lại");
            if(isCheckSuccessRegister != ""){
              setIsCheckSuccessRegister("");
            }
          } else {
            link = "/register";
            setIsCheckSuccessRegister("Bạn đã đăng kí thành công");
            if(isCheckFaildRegister != ""){
              setIsCheckFaildRegister("");
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      // DoRegister(email, pass);

        request.postAddUserRole("add/user-role", {
          username: email,
          role_id: 1
        })
        .then(function (response) {
          console.log(response.message);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    navigate(link);
  };

  const handleBlurEmail = (e) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault();
    if (email == "") {
      setIsEmailEmpty("Vui lòng nhập email");
    } else if (email != "" && !regex.test(email)) {
      setIsEmailEmpty("Vui lòng nhập định dạng email ");
    } else {
      setIsEmailEmpty("");
    }
  };

  const handleBlurPassword = (e) => {
    e.preventDefault();
    if (pass === "") {
      setIsPasswordEmpty("Vui lòng nhập password");
    } else if (pass != "" && pass.length < 3) {
      setIsPasswordEmpty("Mật khẩu phải trên 2 kí tự");
    } else {
      setIsPasswordEmpty("");
    }
  };

  const handleBlurConfirmPassword = (e) => {
    e.preventDefault();
    if (confirmPass === "") {
      setIsConfirmPasswordEmpty("Vui lòng confirm password");
    } else {
      setIsConfirmPasswordEmpty("");
    }
  };

  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if(isEmailEmpty != ""){
      setIsEmailEmpty("");
    }
  }
  const handleChangePassword = (e) => {
    setPass(e.target.value);
    if(isPasswordEmpty != ""){
      setIsPasswordEmpty("");
    }
  }
  const handleChangeConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
    if(isConfirmPasswordEmpty != ""){
      setIsConfirmPasswordEmpty("");
    }
  }

  return (
    <div className={cx("modal")}>
      <div className={cx("login-container")}>
        <div className={cx("login-header")}>
          <h1 className={cx("title")}>Sign up</h1>
          <div className={cx("title-icon")}>
            <div className={cx("icon-face")}>
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className={cx("icon-google")}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </div>
            <div className={cx("icon-linked")}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
          </div>
        </div>
        <p className={cx("text-enter")}>Enter your Information to Register</p>
        <span className={cx("sucess-register")}>{isCheckSuccessRegister}</span>
        <p className={cx("faild-register")}>{isCheckFaildRegister}</p>
        <form onSubmit={handleSubmit}>
          <div className={cx("login-body")}>
            <input
              value={email}
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
              name="email"
              className={cx("input-email")}
              id="emailId"
              placeholder="Email example: admin@2002.com"
            />
            <span className={cx("input-empty")}>{isEmailEmpty}</span>

            <input
              value={pass}
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
              name="password"
              className={cx("input-password")}
              id="emailId"
              placeholder="Password"
            />
            <span className={cx("input-empty")}>{isPasswordEmpty}</span>

            <input
              value={confirmPass}
              onChange={handleChangeConfirmPassword}
              onBlur={handleBlurConfirmPassword}
              name="confirmPass"
              className={cx("input-password")}
              id="confirmPass"
              placeholder="Confirm password"
            />
            <span className={cx("input-empty")}>{isConfirmPasswordEmpty}</span>
          </div>
          <div className={cx("sign-up-contain")}>
            <p className={cx("sign-up-note")}>Welcome to join with</p>
            <a className={cx("sign-up-link")} href="/">
              ShoesUni
            </a>
          </div>
          <a href="/login" className={cx("sign-in-link")}>
            Sign in
          </a>
          <Button submit>SIGN UP</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
