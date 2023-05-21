import styles from "~/components/Layout/component/Sidebar/Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link, Route } from 'react-router-dom';
import * as request from "~/utils/request";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Sidebar(){

    const [brands, setBrands] = useState([]);

    let varToken = localStorage.getItem("token");

    useEffect(() => {
        request.getListUser("list/brand", {
            headers: {
              Authorization: `Bearer ${varToken}`},
          })
          .then(function (response) {
            // handle success
            // console.log(response);
            setBrands(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
    }, [])

    console.log(brands);

    return(
        <div className={cx("side-bar")}>
            <h3 className={cx("heading")}>
                <FontAwesomeIcon icon={faList} className={cx("heading-icon")}/>
                <p className={cx("heading-name")}>Danh mục</p>
            </h3>
            <ul className={cx("list")}>
                {brands.map((b) => (
                    <li key = {b.id}className={cx("item")}>
                        <a href={`/list-product-for-brand?brid=${b.id}`}className={cx("item-link")}>{b.name}</a>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Sidebar