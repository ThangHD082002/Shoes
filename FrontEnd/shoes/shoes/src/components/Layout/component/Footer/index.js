import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("footer-contain")}>
      <div className={cx("grid")}>
        <div className={cx("grid__row")}>
          <div className={cx("grid__colum-2-10")}>
            <div className={cx("footer-one")}>
              <div className={cx("footer-logo")}>
                <a href={`/`}>
                  <img
                    src={require("~/assest/images/Logo/footer.png")}
                    alt=""
                    className={cx("logo-img")}
                  />
                </a>
              </div>
              <h1 className={cx("shoesuni")}>ShoesUni</h1>
            </div>
          </div>
          <div className={cx("grid__colum-2-10")}>
            <h2 className={cx("footer-title")}>SẢN PHẨM</h2>
            <ul className={cx("footer-list")}>
              <li className={cx("footer-item")}>Giày Nam</li>
              <li className={cx("footer-item")}>Giày Nữ</li>
              <li className={cx("footer-item")}>Phụ Kiện</li>
            </ul>
          </div>
          <div className={cx("grid__colum-2-10")}>
            <h2 className={cx("footer-title")}>VỀ CỬA HÀNG</h2>
            <ul className={cx("footer-list")}>
              <li className={cx("footer-item")}>Tuyển dụng</li>
              <li className={cx("footer-item")}>Về ShoesUni</li>
              <li className={cx("footer-item")}>Nhượng quyền</li>
            </ul>
          </div>
          <div className={cx("grid__colum-2-10")}>
            <h2 className={cx("footer-title")}>HỖ TRỢ</h2>
            <ul className={cx("footer-list")}>
              <li className={cx("footer-item")}>Bảo Mật</li>
              <li className={cx("footer-item")}>Phản hồi</li>
              <li className={cx("footer-item")}>Tư vấn</li>
            </ul>
          </div>
          <div className={cx("grid__colum-2-10")}>
            <h2 className={cx("footer-title")}>LIÊN HỆ</h2>
            <ul className={cx("footer-list")}>
              <li className={cx("footer-item")}>Email: shoesuni@gmail.com</li>
              <li className={cx("footer-item")}>Hotline: 0382239908</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
