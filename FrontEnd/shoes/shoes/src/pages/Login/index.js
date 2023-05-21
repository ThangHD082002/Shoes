import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Layout/component/Button";
import { useCallback, useEffect, useState } from "react";
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
const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState("");
  const [isCheckFaildLogin, setIsCheckFaildLogin] = useState("");
  const navigate = useNavigate();
  let varToken = localStorage.getItem("token");
  console.log(varToken);

  // request.getListUser("list-product-group", {
  //     headers: {
  //       Authorization: `Bearer ${varToken}`},
  //   })
  //   .then(function (response) {
  //     // handle success

  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // always executed
  //   }); !important

  // const instance = axios.create({
  //   baseURL: "http://localhost:8080/users",
  //   headers: {
  //     Authorization: `Bearer ${varToken}`,
  //   },
  // });
  // instance()
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // always executed
  //   });

  // axios
  //   .get("http://localhost:8080/users", {
  //     headers: {
  //       Authorization: `Bearer ${varToken}`,
  //     },
  //   })
  //   .then(function (response) {
  //     // handle success
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // always executed
  //   });

  const handleSubmit = (e) => {
    let link = "";
    e.preventDefault();
    if (
      isEmailEmpty != "" ||
      isPasswordEmpty != "" ||
      email == "" ||
      pass == ""
    ) {
      if (email == "") {
        setIsEmailEmpty("Vui lòng nhập email");
      }
      if (pass == "") {
        setIsPasswordEmpty("Vui lòng nhập password");
      }
    } else {
      axios
        .post("http://localhost:8080/token/login", {
          username: email,
          password: pass,
        })
        .then(function (response) {
          // handle success
          console.log(response.data);
          if (response.data.message === "creatae token success") {
            localStorage.setItem("token", response.data.result.token);
            localStorage.setItem("username", response.data.result.username);
            navigate("/");
          } else {
            setIsCheckFaildLogin("Tài khoản hoặc mật khẩu không đúng");
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

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (isEmailEmpty != "") {
      setIsEmailEmpty("");
    }
  };
  const handleChangePassword = (e) => {
    setPass(e.target.value);
    if (isPasswordEmpty != "") {
      setIsPasswordEmpty("");
    }
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("login-container")}>
        <div className={cx("login-header")}>
          <h1 className={cx("title")}>Sign in</h1>
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
        <p className={cx("text-enter")}>Enter your account to login</p>
        <span className={cx("faild-login")}>{isCheckFaildLogin}</span>
        <form onSubmit={handleSubmit}>
          <div className={cx("login-body")}>
            <input
              value={email}
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
              name="email"
              className={cx("input-email")}
              id="emailId"
              placeholder="Email"
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
          </div>
          <div className={cx("sign-up-contain")}>
            <p className={cx("sign-up-note")}>you don't have an account?</p>
            <a className={cx("sign-up-link")} href="/register">
              Sign up
            </a>
          </div>
          <Button submit>SIGN IN</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
