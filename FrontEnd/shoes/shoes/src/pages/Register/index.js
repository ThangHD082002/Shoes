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
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState("");
  const [isPhoneEmpty, setIsPhoneEmpty] = useState("");
  const [isGenderEmpty, setIsGenderEmpty] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState("");
  const [isCheckSuccessRegister, setIsCheckSuccessRegister] = useState("");
  const [checkRegister, setCheckRegister] = useState(false);
  const [checkClickRegister, setCheckClickRegister] = useState(false);
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
      isPhoneEmpty != "" ||
      isGenderEmpty != "" ||
      gender == "" ||
      email == "" ||
      pass == "" ||
      phone == "" ||
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
      if (phone == "") {
        setIsPhoneEmpty("Vui lòng nhập số điện thoại");
      }
      if (gender == "") {
        setIsGenderEmpty("Vui lòng chọn giới tính");
      }
      if (pass == "") {
        setIsPasswordEmpty("Vui lòng nhập password");
      }
      if (confirmPass == "") {
        setIsConfirmPasswordEmpty("Vui lòng confirm password");
      }
    } else {
    //   request
    //     .postCheckRegister("add/user", {
    //       username: email,
    //       password: pass,
    //       phone : phone,
    //       gender: gender
    //     })  
    //     .then(function (response) {
    //       console.log(response.message);
    //       if (response.message == "Register Faild") {
    //         link = "/register";
    //         setIsCheckFaildRegister("Tài khoản đã tồn tại vui lòng nhập lại");
    //         if(isCheckSuccessRegister != ""){
    //           setIsCheckSuccessRegister("");
    //         }
    //       } else {
    //         link = "/register";
    //         setIsCheckSuccessRegister("Bạn đã đăng kí thành công");
    //         request.postAddUserRole("add/user-role", {
    //           username: email,
    //           role_id: ""
    //         })
    //         .then(function (response) {
    //           console.log(response.message);
    //         })
    //         .catch(function (error) {
    //           // handle error
    //           console.log(error);
    //         })
    //         .finally(function () {
    //           // always executed
    //         });
    //         if(isCheckFaildRegister != ""){
    //           setIsCheckFaildRegister("");
    //         }
    //       }
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });
    //   // DoRegister(email, pass);
    // }
    // navigate(link);

    axios
        .post("http://localhost:8080/add/user", {
          username: email,
          password: pass,
          phone : phone,
          gender: gender,
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
            axios.post("http://localhost:8080/add/user-role", {
              username: email,
              role_id: "2"
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


  const handleBlurPhone = (e) => {
    e.preventDefault();
    if(phone === ""){
      setIsPhoneEmpty("Vui lòng nhập số điện thoại");
    }
    else{
      setIsPhoneEmpty("");
    }
  }

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


const handleChangePhone = (e) => {
  setPhone(e.target.value);
  if(isPhoneEmpty != ""){
    setIsPhoneEmpty("");
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


  const handleChangeMale = (e) => {
    setGender(e.target.value);
    if(isGenderEmpty != ""){
      setIsGenderEmpty("");
    }
  }

  const handleChangeFemale = (e) => {
    setGender(e.target.value);
    if(isGenderEmpty != ""){
      setIsGenderEmpty("");
    }
  }

  console.log(gender);

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
              value={phone}
              onChange={handleChangePhone}
              onBlur={handleBlurPhone}
              name="phone"
              className={cx("input-phone")}
              id="phoneId"
              placeholder="Enter Phone"
            />
            <span className={cx("input-empty")}>{isPhoneEmpty}</span>

            <input
              value={pass}
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
              name="password"
              className={cx("input-password")}
              id="emailId"
              placeholder="Enter Password"
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

            <div className={cx("gender-contain")}>
                <label className={cx("male")}>
                  <input type="radio" name="gender" value="Nam"  className={cx("checkbox")} onChange={handleChangeMale}/>
                  Nam
                </label>
                <label className={cx("female")}>
                  <input type="radio" name="gender" value="Nữ"  className={cx("checkbox")} onChange={handleChangeFemale}/>
                  Nữ
                </label>
                
          </div>
          <span className={cx("input-empty")}>{isGenderEmpty}</span>

            
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
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300" width="406" height="306" class="illustration styles_illustrationTablet__1DWOa"><ellipse cx="192.98" cy="241.9" rx="158.36" ry="17.97" fill="#e6e6e6" opacity="0.3"/><path d="M83,134.28S59.47,145.55,56.4,171.52s-11.74,76.12,52.09,73.26,93.93-6.42,78.88-55.19S83,134.28,83,134.28Z" fill="#ffd200"/><path d="M80.59,147.77a18.58,18.58,0,0,0,8.49,19.08c8.66,5.71,22,26,32.33,36.26a16.9,16.9,0,0,1,5,12.23c0,1.85.75,3.9,3.19,5.9,7.18,5.87,37.31,8.8,54.16-9.26s-5.37-27-5.37-27l-74.06-40.09Z" opacity="0.09"/><path d="M244.3,236.18s1.57,4,5.51,4.86,6.08,5.74-2.53,5-13.34.56-12.1-4.17.68-5.44.68-5.44Z" fill="#f4a28c"/><path d="M186.48,232.85s-.66,4.21,2.27,7,2.31,8-4.7,3-11.76-6.31-8.29-9.75,3.35-4.34,3.35-4.34Z" fill="#f4a28c"/><path d="M194,173s52.65.54,52.14,63.33l-12.42,2.11s-2.39-66.31-70.81-34.72l3.57-26.12Z" fill="#24285b"/><path d="M194,173s52.65.54,52.14,63.33l-12.42,2.11s-2.39-66.31-70.81-34.72l3.57-26.12Z" opacity="0.09"/><polygon points="198.13 115.2 202.7 116.42 199.45 112.92 198.13 115.2" fill="#ffd200"/><path d="M126.31,146.28s9.1,23,31.31,18.95,30.65-50.64,30.65-50.64,8.78-5.71,4.53-12.08-11.16,7.41-11.16,7.41-9.57,39.26-30.28,26.53Z" fill="#f4a28c"/><path d="M126.31,146.28s9.1,23,31.31,18.95,30.65-50.64,30.65-50.64,8.78-5.71,4.53-12.08-11.16,7.41-11.16,7.41-9.57,39.26-30.28,26.53Z" opacity="0.09"/><path d="M126.59,99.56l4.8,1s37.1,20.14,30.2,40.31,8.17,39.32,8.17,39.32L137.5,202.91S95.36,182,101.67,124.4C101.67,124.4,104.6,97.57,126.59,99.56Z" fill="#ed1c24"/><rect x="192.95" y="106.63" width="6.75" height="57.63" transform="translate(78.08 -71.69) rotate(25.68)" fill="#e6e6e6"/><path d="M298,232s-10.24-2.8-12.47-12.33c0,0,15.87-3.21,16.32,13.17Z" fill="#ed1c24" opacity="0.58"/><path d="M299.23,231s-7.16-11.31-.86-21.89c0,0,12.07,7.66,6.71,21.92Z" fill="#ed1c24" opacity="0.73"/><path d="M301.07,231s3.78-11.95,15.21-14.21c0,0,2.15,7.76-7.4,14.24Z" fill="#ed1c24"/><polygon points="293.64 230.71 295.72 244.92 308.8 244.97 310.73 230.78 293.64 230.71" fill="#24285b"/><rect x="203.21" y="34.29" width="72.58" height="50.82" fill="#e6e6e6" opacity="0.66"/><rect x="275.36" y="105.48" width="65.55" height="45.9" fill="#e6e6e6" opacity="0.43"/><circle cx="222.36" cy="49.44" r="8.47" fill="#e6e6e6"/><rect x="241.2" y="42.25" width="23.85" height="33.13" fill="#c1c1c1" opacity="0.45"/><rect x="215.35" y="64.27" width="16.38" height="11.11" fill="#c1c1c1"/><polygon points="124.83 74.26 118.15 97.81 131.39 100.56 130.94 82.32 124.83 74.26" fill="#f4a28c"/><path d="M131.21,86.31a8.89,8.89,0,0,1-4-3.11s-.34,4.47,4,9.44Z" fill="#ce8172" opacity="0.31"/><path d="M138.54,75s-.66,7.44-2.76,12.09a3.74,3.74,0,0,1-5,1.86c-2.33-1.09-5.16-3.24-5.29-7.27l-1.06-6.81a6.72,6.72,0,0,1,4.16-6.54C133.29,66,139.17,70.44,138.54,75Z" fill="#f4a28c"/><path d="M129.61,79.86s.45-2.84-1.72-3-2.84,3.94,0,4.83Z" fill="#f4a28c"/><path d="M137.88,79.61l1.55,3.2a1.2,1.2,0,0,1-1.07,1.72l-2.9,0Z" fill="#f4a28c"/><rect x="174.18" y="106.15" width="26.38" height="2.63" transform="translate(78.84 -79.29) rotate(30)" fill="#24285b"/><path d="M144.9,190.4l-7.4,12.51s-26.83-13-34.52-48.18,17.68-21.47,17.68-21.47Z" opacity="0.18"/><path d="M137.5,202.91s24.86-50.68,61.62-50.49-11,81.78-11,81.78L176,229.27s18-35,13.42-46.27S177.84,249.47,137.5,202.91Z" fill="#24285b"/><path d="M116.23,102.4s11.06-5.61,16.68,5.79,1.19,60.43,24,63S191.29,150,191.29,150s1.88-10,5-11.66,5.87,8.85,0,15c0,0-10.06,37.79-42,38.64S84.74,128.28,116.23,102.4Z" fill="#f4a28c"/><path d="M138.59,65.3s7.27,8.55-2.14,10.34-11.35,3.48-10.45,13,4.63,18.29-7.85,24.26-1.75,16-4.05,27.7-13.27,19.78-27.32,11.8S64.06,124,79.12,111.77s34-15.2,34-34.92S128.86,56.11,138.59,65.3Z" fill="#24285b"/><circle cx="296.19" cy="128.98" r="10.14" fill="#c1c1c1" opacity="0.43"/><rect x="294.97" y="113.44" width="17.63" height="17.63" fill="#c1c1c1" opacity="0.43"/><rect x="318.36" y="113.44" width="13.15" height="29.22" fill="#c1c1c1" opacity="0.43"/><rect x="188.08" y="150.71" width="9.97" height="5.63" transform="translate(67.35 -58.7) rotate(20.87)" fill="#ed1c24"/><rect x="188.08" y="150.71" width="9.97" height="5.63" transform="translate(67.35 -58.7) rotate(20.87)" fill="#fff" opacity="0.44"/></svg>
      </div>
    </div>
  );
}

export default Register;
