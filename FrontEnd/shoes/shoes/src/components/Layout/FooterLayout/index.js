import Header from "../component/Header";
import Footer from "../component/Footer";
import styles from "./FooterLayout.module.scss";
import classNames from "classnames/bind";



const cx = classNames.bind(styles);
function FooterLayout({children}) {
  return (
    <div className = {cx('contain-header')}>
            <Header />
            <div className = {cx("container")}>
                <div className = {cx('content-header')}>{children}</div>
            </div>
            
            <Footer />
        </div>
  );
}

export default FooterLayout;