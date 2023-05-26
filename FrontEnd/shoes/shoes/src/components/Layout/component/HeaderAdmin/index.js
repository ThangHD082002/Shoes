import styles from "./HeaderAdmin.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBagShopping, faRightFromBracket, faShop, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faBell, faMoon } from "@fortawesome/free-regular-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import * as request from "~/utils/request";
const cx = classNames.bind(styles);


function HeaderAdmin(){

    const [showActionUser, setShowActionUser] = useState('show-user-none');
    const [userAdmin, setUserAdmin] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    // var user = localStorage.getItem('username');
    // var role = localStorage.getItem('role');

    function handleLogoutAdmin(){
        if(showActionUser === "show-admin-user-block"){
            setShowActionUser('show-user-none')
        }
        else{
            setShowActionUser("show-admin-user-block")
        }
        
    }

    useEffect(() => {
        setUserAdmin(localStorage.getItem('username'));
        setUserRole(localStorage.getItem('role'));
      }, [])

    

    function handleHideLogout(){
        setShowActionUser('show-user-none')
    }

    function handleLogout(){
        localStorage.setItem('username', "");
        localStorage.setItem('role',"");
        navigate("/login");

    }

    return (
        <div className={cx("header-contain")}>
            <div className={cx("grid")}>
                <div className={cx("header-navbar")}>
                    <div className={cx("header-icon")} onClick={handleHideLogout}>
                        <FontAwesomeIcon icon={faShop} />
                    </div>
                    <ul className={cx("navbar-list")}>
                        <li className={cx("navbar-item")}>
                            <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAbFBMVEXaJR3//wDYAB7tqhPZGx3ZFB799AX1zw3ywg/vtBH55AnfVRraIB3bLB3cNhzniBbkcxjzyQ787wbxvRDiZRn76wjhXhr44ArojBb32gvurxLjbxjeThv21QzlehfiaxnmghfeRxvrnhTplhXOlKhZAAAB0UlEQVRoge2X2ZKCMBBFSZOwhriB4gYu//+Pw6pRgoKdPExVzptSntJL07k6jsVisVgs/wkhzLlZvmDG5HD2wZSbC88T3JCcFYQsTeUCK0ICQ7lUqRCyTszkwpakoqRG5BDU8o2RXHiyruVZYkJOS9KQmsgFNq08NJJL1sozA2qako6t/lwg7OUH/bnwqJdH2h8juiUPYt25wOEpd1G5MBgSPeU7xeXJy5LnoftOSCQUl/OpN4KLgMwkmH6IcLjMc19gzgTBdT9dvb/OvMOUHb5bW1w2ezQ5LL0pau/402Ay4X93++LHE5uz2zf3bdadfAXS7JM62+Ke1WQ17g4SZInhkI+5c0QkPRDvVOrdSctaZ1eV/NcpeZcrd0GhRw7KcV9pSaWpiEP0lOm6OKvQUqZhZNJ1lOmRVPSUaXaUhJF0kuoo0yAdeQHl0it8me6KczMfC+DyNsCXxmdF7J53OD22Abo09sWZhP1hRllfM/Blul3oXiGJoGgHCFsau4p4fl1TINpugCyNbUUcHGYc3Pp9XGlsivM6VTigrKYoQn1zGlfrz1EukeYAPGHsVSr3scOMwx2Zix9/+DjEPmZeEufj76aJkX+8FovFYrFYLEP+AGZbEYlhqJD7AAAAAElFTkSuQmCC"} className={cx("img-navbar")}/>
                        </li>
                        <li className={cx("navbar-item")}>
                            <FontAwesomeIcon icon={faBagShopping} className={cx("navbar-icon")}/>
                            <span className={cx("icon-notice")}>{0}</span>
                        </li>
                        <li className={cx("navbar-item")}>
                            <FontAwesomeIcon icon={faMoon} className={cx("navbar-icon")}/>
                        </li>
                        <li className={cx("navbar-item")}>
                            <FontAwesomeIcon icon={faBell} className={cx("navbar-icon")}/>
                        </li>
                    </ul>
                    <div className={cx("user")} onClick={handleLogoutAdmin}>
                        <div className={cx("user-svg")}>
                            <svg _ngcontent-uhu-c31="" width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-uhu-c31="" fill-rule="evenodd" clip-rule="evenodd" d="M4.1508 16.6667L4.16247 16.6691C5.66318 17.5923 7.87369 18 10.5401 18C15.6386 18 18.06 15.1326 17.9989 12.2963L17.9988 12.2965C17.9915 11.9837 17.9544 11.6722 17.8881 11.3656C17.2134 8.26284 15.2593 6.74436 15.2593 6.74436L14.5846 2L11.0124 4.78378C11.0124 4.78378 3.59703 3.64521 2.11395 11.4887C1.68748 13.9558 2.47804 15.6332 4.1508 16.6667ZM11.4852 7.4169C11.672 7.32541 11.8307 7.24766 11.9596 7.21389C15.1957 6.3704 16.4547 9.40864 15.6005 11.4743C14.7463 13.5401 11.9596 12.865 11.4657 12.5281C10.9717 12.1912 9.80313 11.7276 8.90437 12.3178C8.0056 12.908 4.14062 13.6679 4.14062 10.5042C4.14062 7.34053 6.83694 6.6667 8.49952 7.55201C9.79771 8.24327 10.8196 7.74284 11.4852 7.4169Z" fill="#ED1C24"></path><path _ngcontent-uhu-c31="" d="M6.59385 10.9093C7.06421 10.9093 7.44551 10.3899 7.44551 9.7492C7.44551 9.1085 7.06421 8.58911 6.59385 8.58911C6.12349 8.58911 5.74219 9.1085 5.74219 9.7492C5.74219 10.3899 6.12349 10.9093 6.59385 10.9093Z" fill="#ED1C24"></path><path _ngcontent-uhu-c31="" d="M13.295 10.9093C13.7654 10.9093 14.1467 10.3899 14.1467 9.7492C14.1467 9.1085 13.7654 8.58911 13.295 8.58911C12.8247 8.58911 12.4434 9.1085 12.4434 9.7492C12.4434 10.3899 12.8247 10.9093 13.295 10.9093Z" fill="#ED1C24"></path></svg>
                        </div>
                        <div class={cx("user-infor")}>
                            <p class={cx("user-name")}>{userAdmin}</p>
                            <p class={cx("user-role")}>{userRole}</p>
                            
                        </div>
                       
                    </div>
                    <div class={showActionUser} onClick={handleLogout}>
                        <button class={cx("btn-logout")}> <FontAwesomeIcon icon={faRightFromBracket} className={cx("logout-icon")}/>    Log out</button>
                    </div>
                </div>
                <div className={cx("gach")}></div>
                <div className={cx("street")}>
                    <p>Người dùng <FontAwesomeIcon icon={faAngleRight} /> Quản lí</p>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin;