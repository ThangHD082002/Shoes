import styles from "./Home.module.scss"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route } from 'react-router-dom';
import classNames from "classnames/bind";
import { Fragment } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";

import image from "~/assest/images/Filter/filter.jpg"

// const path = "src/assest/images/Logo/logo.jpg";

// const imageLink = require("src/assest/images/Logo/logo.jpg");
const cx = classNames.bind(styles);
function Home(){

    const [test, setTest] = useState(true);
    const [result, setResult] = useState([])

    const product = [
        {id: 1},
        {id: 2},
        {id: 3},
    ];
    let varToken = localStorage.getItem("token");
    

    useEffect(() => {
        request.getListUser("list/product", {
            headers: {
              Authorization: `Bearer ${varToken}`},
          })
          .then(function (response) {
            // handle success
            // console.log(response);
            setResult(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
    }, [])

    
    console.log(result);
    


    const filter = 'https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg';

    return (
        <Fragment>
             <div className={cx("filter")}
             >
                <img src= {filter} className={cx("filter-img")} />
            </div>
            <div className={cx("home-product")}>
                <div className={cx("grid__row")}>
                    {result.map((r) =>(
                        <div key={r.id} className={cx("grid__colum-2-10")}>
                        <a href={`/detail-product/${r.id}`} className={cx("item")}>
                            <div className={cx("item-img-contain")}>
                                <img src={r.img} className={cx("img-product")} />
                                <div className={cx("img-bought")}>
                                    Mua ngay
                                </div>
                            </div>
                            
                            <h3 className={cx("item-name")}>{r.name}</h3>
                            <div className={cx("item-price")}>
                                <p className={cx("item-price-old")}>600000đ</p>
                                <p className={cx("item-price-new")}>{r.price}</p>
                            </div>
                            <div className={cx("item-action")}>
                                <div className={cx("item-heart")}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className={cx("item-feel")}>
                                    <FontAwesomeIcon icon={faStar} className={cx("item-feel-icon")}/>
                                    <FontAwesomeIcon icon={faStar} className={cx("item-feel-icon")}/>
                                    <FontAwesomeIcon icon={faStar} className={cx("item-feel-icon")}/>
                                    <FontAwesomeIcon icon={faStar} className={cx("item-feel-icon")}/>
                                    <FontAwesomeIcon icon={faStar} className={cx("item-feel-icon")}/>
                                </div>
                            </div>
                        </a>
                        
                    </div>
                    ))}
                    
                    
                    {/* <ul>
                        {product.map((p) => (
                            <li key={p.id}>
                                <Link to={`/detail-product/${p.id}`}><p>{p.id}</p></Link>
                            </li>
                        ))}
                    </ul> */}
                    
                    
                </div>
            </div>

                

        </Fragment>
           
    )
}

export default Home;