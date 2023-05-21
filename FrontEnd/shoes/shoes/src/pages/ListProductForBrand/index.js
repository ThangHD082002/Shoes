import styles from "./ListProductForBrand.module.scss"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route } from 'react-router-dom';
import classNames from "classnames/bind";
import { Fragment } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";

const cx = classNames.bind(styles);

function ListProductForBrand(){

    const filter = 'https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg';
    const [productForBrand, setProductForBrand] = useState([]);
    
    const queryString = window.location.search.substring(1);

    const parameters = queryString.split('&');

    var brid;

    // Duyệt qua từng parameter và tìm parameter cần tìm
    for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i].split('=');
        if (parameter[0] === 'brid') {
            brid = parameter[1];
        }
    }

    console.log(typeof brid);


    let varToken = localStorage.getItem("token");

    useEffect(() => {
        request.getProductByBrand("list/product-brand", {
            headers: {
              Authorization: `Bearer ${varToken}`},
              params: {
                id: brid
              },
          })
          .then(function (response) {
            // handle success
            // console.log(response);
            setProductForBrand(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
    }, [])


    return (
        <Fragment>
             <div className={cx("filter")}
             >
                <img src= {filter} className={cx("filter-img")} />
            </div>
            <div className={cx("home-product")}>
                <div className={cx("grid__row")}>
                    {productForBrand.map((pb) =>(
                        <div key={pb.id} className={cx("grid__colum-2-10")}>
                        <a href={`/detail-product/${pb.id}`} className={cx("item")}>
                            <div className={cx("item-img-contain")}>
                                <img src={pb.img} className={cx("img-product")} />
                                <div className={cx("img-bought")}>
                                    Mua ngay
                                </div>
                            </div>
                            
                            <h3 className={cx("item-name")}>{pb.name}</h3>
                            <div className={cx("item-price")}>
                                <p className={cx("item-price-old")}>600000đ</p>
                                <p className={cx("item-price-new")}>{pb.price}</p>
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

export default ListProductForBrand;