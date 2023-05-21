import styles from "~/components/Layout/component/Header/Header.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Layout/component/Button";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import * as request from "~/utils/request";
import { faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faConnectdevelop,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2]);
    }, 3000);
  }, []);

  const x = JSON.parse(localStorage.getItem('cart'));
  return (
    <Fragment>
      <div className={cx("header")}>
        <div className={cx("grid")}>
          <div className={cx("header-navbar")}>
            <ul className={cx("navbar-list")}>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>ShoesVn</a>
              </li>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={cx("icon-heart", "icon")}
                  />
                  Yêu thích
                </a>
              </li>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>
                  <FontAwesomeIcon
                    icon={faConnectdevelop}
                    className={cx("icon-product", "icon")}
                  />
                  Sản phẩm
                </a>
              </li>
            </ul>
            <ul className={cx("navbar-list")}>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>
                  <FontAwesomeIcon
                    icon={faBell}
                    className={cx("icon-notify", "icon")}
                  />
                  Thông báo
                </a>
              </li>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className={cx("icon-facebook", "icon")}
                  />
                  Kết nối
                </a>
              </li>
              <li className={cx("navbar-item")}>
                <a className={cx("navbar-item-link")}>Giới thiệu</a>
              </li>
            </ul>
          </div>
          <div className={cx("header-menu")}>
            <div className={cx("logo")}>
              <a href={`/`}>
                <img
                  src={require("~/assest/images/Logo/logo.png")}
                  alt=""
                  className={cx("logo-img")}
                />
              </a>
            </div>
            <div className={cx("search")}>
              <input
                placeholder="Search product without you want"
                spellCheck={false}
              />
              <button className={cx("clear")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
              <button className={cx("search-button")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            <div className={cx("cart")}>
              <a href={`/cart?id=6&c=7`} className={cx("cart-link")}>
                <div className={cx("cart-wrap")}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className={cx("cart-icon")}
                  />
                  <span className={cx("cart-notice")}>{x.length}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("title-slide")}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <a href="#" className={cx("slice-free")}>FREE SHIPPING VỚI HOÁ ĐƠN TỪ 80K !</a>
            <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </Fragment>
  );
}

export default Header;
