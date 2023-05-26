import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EmployeeAdmin.module.scss";
import classNames from "classnames/bind";
import { faBroom, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const cx = classNames.bind(styles);

function EmployeeAdmin() {
  const [employeeRequest, setEmployeeRequest] = useState([]);
  const [managerRequestForFix, setManagerRequestForFix] = useState({});
  const [resetDelete, setResetDelete] = useState(true);
  const [resetUpdate, setResetUpdate] = useState(true);
  const [male, setMale] = useState("male-manager");
  const [female, setFemale] = useState("female-manager");
  const [roleEmployee, setRoleEmployee] = useState("role-employee");
  const [statusActive, setStatusActive] = useState("status-active");
  const [statusDisabled, setStatusDisabled] = useState("status-disabled");
  const [input, setInput] = useState('');
  const [changeInput, setChangeInput] = useState(true);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddManagerForFix, setShowAddManagerForFix] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState("");
  const [isPhoneEmpty, setIsPhoneEmpty] = useState("");
  const [isStatusEmpty, setIsStatusEmpty] = useState("");
  const [isRoleEmpty, setIsRoleEmpty] = useState("");
  const [isGenderEmpty, setIsGenderEmpty] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState("");
  const [isCheckSuccessRegister, setIsCheckSuccessRegister] = useState("");
  const [clickFix, setClickFix] = useState(true);
  const [
    isCheckFaildRegister,
    setIsCheckFaildRegister,
    isCheckSuccessPassword,
  ] = useState("");

  const [emailFix, setEmailFix] = useState("");
  const navigate = useNavigate();
  let link = "";


  let varToken = localStorage.getItem("token");

  useEffect(() => {

    var role = localStorage.getItem("role");
      console.log(role);
      if(role == "CUSTOMER"){
        navigate('/admin/error-role')
      }

    request
      .getUserByRole("users-by-role", {
        headers: {
          Authorization: `Bearer ${varToken}`,
        },
        params: {
          role: "EMPLOYEE",
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setEmployeeRequest(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [resetDelete]);

  console.log(employeeRequest);

  useEffect(() => {

    var role = localStorage.getItem("role");
    console.log(role);
    if(role == "CUSTOMER"){
      navigate('/admin/error-role')
    }

      request.getEmployeeByName("user-by-username-and-role", {
          headers: {
            Authorization: `Bearer ${varToken}`},
            params: {
              username: input,
              role: "EMPLOYEE"
            },
        })
        .then(function (response) {
          // handle success
          // console.log(response);
          setEmployeeRequest(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        }); 
  }, [changeInput])

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
    setChangeInput(!changeInput);
  }

  function handleResetrSearch(){
    setInput("");
    setChangeInput(!changeInput);
  }

  // add employee

  const handleSubmit = (e) => {
    if(showAddEmployee === true){
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
        link = "/admin";
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
        if (status == "") {
          setIsStatusEmpty("Vui lòng nhập trạng thái")
        }
        if (role == "") {
          setIsRoleEmpty("Vui lòng nhập chức năng")
        }
      } else {
        console.log(1);
        console.log(email);
        console.log(pass)
        console.log(gender);
        console.log(phone);
            axios
          .post("http://localhost:8080/add/user", {
            username: email,
            password: pass,
            phone : phone,
            gender: gender,
          })  
          .then(function (response) {
            console.log(response);
            if (response.message == "Register Faild") {
              console.log(response);
              link = "/admin";
              setIsCheckFaildRegister("Tài khoản đã tồn tại vui lòng nhập lại");
              if(isCheckSuccessRegister != ""){
                setIsCheckSuccessRegister("");
              }
            } else {
              link = "/admin";
              setIsCheckSuccessRegister("Bạn đã đăng kí thành công");
              axios.post("http://localhost:8080/add/user-role", {
                username: email,
                role_id: "1"
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
          // } else{
          //   axios
          //   .post("http://localhost:8080/update-user", {
          //     headers: {
          //       Authorization: `Bearer ${varToken}`,
          //     },
          //     username: email,
          //     phone: phone,
          //     status : status,
          //     gender: gender,
          //     roleOld: "MANAGER",
          //     role: role,
              
          //   })  
          //   .then(function (response) {
          //     console.log(response.message);
          //     if (response.message != "update thành công") {
          //       link = "/admin";
          //       setIsCheckFaildRegister("Update không thành công");
          //       if(isCheckSuccessRegister != ""){
          //         setIsCheckSuccessRegister("");
          //       }
          //     } else {
          //       link = "/admin";
          //       setIsCheckSuccessRegister("Update Quản lí thành công");
          //       if(isCheckFaildRegister != ""){
          //         setIsCheckFaildRegister("");
          //       }
          //     }
          //   })
          //   .catch(function (error) {
          //     // handle error
          //     console.log(error);
          //   })
          //   .finally(function () {
          //     // always executed
          //   });
          // }
  
      }
      navigate(link);
    }


    else{
      e.preventDefault();
    if (
      isEmailEmpty != "" ||
      isPhoneEmpty != "" ||
      isGenderEmpty != "" ||
      isStatusEmpty != "" ||
      isRoleEmpty != "" || 
      role == "" ||
      status == "" ||
      gender == "" ||
      email == "" ||
      phone == "" 
    ) {
      link = "/admin";
      if (email == "") {
        setIsEmailEmpty("Vui lòng nhập email");
      }
      if (phone == "") {
        setIsPhoneEmpty("Vui lòng nhập số điện thoại");
      }
      if (gender == "") {
        setIsGenderEmpty("Vui lòng chọn giới tính");
      }
      if (status == "") {
        setIsStatusEmpty("Vui lòng nhập trạng thái")
      }
      if (role == "") {
        setIsRoleEmpty("Vui lòng nhập chức năng")
      }
    } else {
      console.log(2);
          axios
        .post("http://localhost:8080/update-user", {
          headers: {
            Authorization: `Bearer ${varToken}`,
          },
          username: email,
          phone  : phone,
          status : status,
          gender: gender,
          roleOld: "EMPLOYEE",
          role : role,
        })  
        .then(function (response) {
          console.log(response);
          if (response.message == "Register Faild") {
            console.log(response);
            link = "/admin";
            setIsCheckFaildRegister("update không thành công");
            if(isCheckSuccessRegister != ""){
              setIsCheckSuccessRegister("");
            }
          } else {
            link = "/admin";
            setIsCheckSuccessRegister("Update thành công");
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
        // } else{
        //   axios
        //   .post("http://localhost:8080/update-user", {
        //     headers: {
        //       Authorization: `Bearer ${varToken}`,
        //     },
        //     username: email,
        //     phone: phone,
        //     status : status,
        //     gender: gender,
        //     roleOld: "MANAGER",
        //     role: role,
            
        //   })  
        //   .then(function (response) {
        //     console.log(response.message);
        //     if (response.message != "update thành công") {
        //       link = "/admin";
        //       setIsCheckFaildRegister("Update không thành công");
        //       if(isCheckSuccessRegister != ""){
        //         setIsCheckSuccessRegister("");
        //       }
        //     } else {
        //       link = "/admin";
        //       setIsCheckSuccessRegister("Update Quản lí thành công");
        //       if(isCheckFaildRegister != ""){
        //         setIsCheckFaildRegister("");
        //       }
        //     }
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
        // }

    }
    navigate(link);
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

  function handleCancel(){
    setShowAddEmployee(false);
    setShowAddManagerForFix(false);
  }

  function handleAddEmployee(){
    setShowAddEmployee(true);
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    if(isStatusEmpty != ""){
      setIsStatusEmpty("");
    }
  }
  
  const handleBlurStatus= (e) => {
    e.preventDefault();
    if(status === ""){
      setIsStatusEmpty("Vui lòng nhập trạng thái");
    }
    else{
      setIsStatusEmpty("");
    }
  }

  const handleChangeRole = (e) => {
    setRole(e.target.value);
    if(isRoleEmpty != ""){
      setIsRoleEmpty("");
    }
  }
  console.log(role);
  const handleBlurRole= (e) => {
    e.preventDefault();
    if(role === ""){
      setIsRoleEmpty("Vui lòng nhập chức năng");
    }
    else{
      setIsRoleEmpty("");
    }
  }

  // show infor

  useEffect(() => {
    if(managerRequestForFix[0]){
      setEmail(managerRequestForFix[0].username);
      setPhone(managerRequestForFix[0].phone);
      setGender(managerRequestForFix[0].gender);
      setStatus(managerRequestForFix[0].su);
      setRole(managerRequestForFix[0].roles[0].name)
    }
    
  }, [clickFix])

  console.log(emailFix)

  useEffect(() => {
    if(managerRequestForFix[0]){
      setEmail(managerRequestForFix[0].username);
      setPhone(managerRequestForFix[0].phone);
      setGender(managerRequestForFix[0].gender);
      setStatus(managerRequestForFix[0].su);
      setRole(managerRequestForFix[0].roles[0].name)
    }
    
  }, [clickFix])

  function handleShowInfor(user){

    setEmail("");
    setPhone("");
    setGender("");
    setIsEmailEmpty("");
    setIsPhoneEmpty("");
    setIsPasswordEmpty("");
    setIsConfirmPasswordEmpty("")
    setIsStatusEmpty("")
    setIsRoleEmpty("");
    setIsGenderEmpty("");
    setIsCheckFaildRegister("");
    setIsCheckSuccessRegister("");
    
    request
      .getManagerByName("user-by-username-and-role", {
        headers: {
          Authorization: `Bearer ${varToken}`,
        },
        params: {
          username: user,
          role: "EMPLOYEE",
        },
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        setManagerRequestForFix(response);
        setClickFix(!clickFix);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

      setShowAddManagerForFix(true);
  }


  return (
    <div className={cx("user-contain")}>
      {showAddEmployee&&
         <div className={cx("modal")}>
         <div className={cx("login-container")}>
         <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
           <div className={cx("login-header")}>
             <h1 className={cx("title")}>Thêm nhân viên</h1>
             {/* <div className={cx("title-icon")}>
               <div className={cx("icon-face")}>
                 <FontAwesomeIcon icon={faFacebookF} />
               </div>
               <div className={cx("icon-google")}>
                 <FontAwesomeIcon icon={faGooglePlusG} />
               </div>
               <div className={cx("icon-linked")}>
                 <FontAwesomeIcon icon={faLinkedinIn} />
               </div>
             </div> */}
           </div>
           {/* <p className={cx("text-enter")}>Enter your Information to Register</p> */}
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
             <button submit className={cx("btn-add-manager")}>SIGN UP</button>
           </form>
         </div>
       </div>
      }
      {showAddManagerForFix&&
          <div className={cx("modal")}>
          <div className={cx("login-container")}>
          <button className={cx("btn-x")} onClick={handleCancel}><FontAwesomeIcon icon={faXmark} className={cx("btn-icon")}/></button>
            <div className={cx("login-header")}>
              <h1 className={cx("title")}>Sửa Thông tin</h1>
              {/* <div className={cx("title-icon")}>
                <div className={cx("icon-face")}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </div>
                <div className={cx("icon-google")}>
                  <FontAwesomeIcon icon={faGooglePlusG} />
                </div>
                <div className={cx("icon-linked")}>
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </div>
              </div> */}
            </div>
            {/* <p className={cx("text-enter")}>Enter your Information to Register</p> */}
            <span className={cx("sucess-register")}>{isCheckSuccessRegister}</span>
            <p className={cx("faild-register")}>{isCheckFaildRegister}</p>
            <form onSubmit={handleSubmit}>
              <div className={cx("login-body")}>
                <input
                  // value={(managerRequestForFix[0]&& managerRequestForFix[0].username) && managerRequestForFix[0].username}
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
                  value={status}
                  onChange={handleChangeStatus}
                  onBlur={handleBlurStatus}
                  name="password"
                  className={cx("input-password")}
                  id="emailId"
                  placeholder="Enter Status"
                />
                <span className={cx("input-empty")}>{isStatusEmpty}</span>
    
                <input
                  value={role}
                  onChange={handleChangeRole}
                  onBlur={handleBlurRole}
                  name="confirmPass"
                  className={cx("input-password")}
                  id="confirmPass"
                  placeholder="Enter Role"
                />
                <span className={cx("input-empty")}>{isRoleEmpty}</span>
    
                <div className={cx("gender-contain")}>
                    <label className={cx("male")}>
                      <input type="radio" checked={gender === 'Nam'} name="gender" value="Nam"  className={cx("checkbox")} onChange={handleChangeMale}/>
                      Nam
                    </label>
                    <label className={cx("female")}>
                      <input type="radio" checked={gender === 'Nữ'} name="gender" value="Nữ"  className={cx("checkbox")} onChange={handleChangeFemale}/>
                      Nữ
                    </label>
                    
              </div>
              <span className={cx("input-empty")}>{isGenderEmpty}</span>
    
                
              </div>
              <button submit className={cx("btn-add-manager")}>UPDATE</button>
            </form>
          </div>
        </div>
      }
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
            <div className={cx("add-manager")} onClick={handleAddEmployee}>
              <p>
                {" "}
                <FontAwesomeIcon icon={faPlus} /> Thêm nhân viên
              </p>
            </div>
          </div>
          <div className={cx("table-contain")}>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                  <th>Ngày tạo</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {employeeRequest.map((e) => (
                  <tr>
                    <td>
                      <p className={cx("name")}>{e.username}</p>
                    </td>
                    <td className={cx("name")}>
                      <p className={cx("phone")}>{e.phone}</p>
                    </td>
                    <td>
                      {/* <p className={male}>{m.gender}</p> */}
                      {/* <p className={m.gender === 'Nam' ? "male" : "female"}>{m.gender}</p> */}
                      <p className={e.gender === "Nam" ? male : female}>
                        {e.gender}
                      </p>
                    </td>
                    <td>
                      <p className={cx("date-created")}>{e.dateCreated}</p>
                    </td>
                    <td>
                      <p className={roleEmployee}>{e.roles[0].name}</p>
                    </td>
                    <td>
                      {/* <p className={statusActive}>{m.su}</p> */}
                      <p
                        className={
                          e.su === "Active" ? statusActive : statusDisabled
                        }
                      >
                        {e.su}
                      </p>
                    </td>
                    <td>
                    <ul className={cx("action-list")}>
                        <li className={cx("action-item")}>Xoá</li>
                        <li className={cx("action-item")} onClick={() => handleShowInfor(e.username)}>Sửa</li>
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
  );
}

export default EmployeeAdmin;
