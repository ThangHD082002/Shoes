import styles from "./AdminLayout.module.scss";
import classNames from "classnames/bind";
import HeaderAdmin from "../HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";

const cx = classNames.bind(styles);

function AdminLayout({children}){
    return (
        <div className={cx("admin-contain")}>
            <div className={cx("grid-admin")}>
                <div className={cx("grid__row")}>
                    <div className={cx("grid__colum-2-12")}>
                        <SidebarAdmin />
                    </div>
                    <div className={cx("grid__colum-10-12")}>
                        <div className={cx("eight-contain")}>
                            <HeaderAdmin />
                            <div className={cx("children")}>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;