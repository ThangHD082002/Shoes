import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("grid")}>
          <div className={cx("grid__row", "app_content")}>
            <div className={cx("grid__colum-2-12")} >
                <Sidebar />
            </div>
              <div className={cx("grid__colum-10-12")}>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
