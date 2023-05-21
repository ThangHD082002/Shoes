import styles from "./DetailProduct.module.scss"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route } from 'react-router-dom';
import classNames from "classnames/bind";
import { Fragment } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import * as request from "~/utils/request";
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
var myArray = [];
function DetailProduct(){
    
    const {pid} = useParams();
    const [productById, setProductById] = useState([]);
    const [product, setProduct] = useState({})
    const [sizeCart, setSizeCart] = useState("");
    const [colorCart, setcolorCart] = useState("");
    const size = [
        
    ];
    const color = [

    ];



    let varToken = localStorage.getItem("token");

    useEffect(() => {
        request.getInforProduct("infor/product", {
            headers: {
              Authorization: `Bearer ${varToken}`},
              params: {
                id: pid
              },
          })
          .then(function (response) {
            // handle success
            console.log(response);
            setProductById(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
    }, [])

    // useEffect(() => {
    //     request.getInforProduct("id/product", {
    //         headers: {
    //           Authorization: `Bearer ${varToken}`},
    //           params: {
    //             id: pid
    //           },
    //       })
    //       .then(function (response) {
    //         // handle success
    //         console.log(response);
    //         setProduct(response);
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })
    //       .finally(function () {
    //         // always executed
    //       }); 
    // }, [])
    // console.log(productById)


    productById.forEach(function (p){
        const element = {name: p.size.name}
        const exists = size.some(item => item.name === element.name);
        if(exists === false) {
            size.push(element);
        }
    })

    productById.forEach(function (p){
        const element = {name: p.color.name}
        const exists = color.some(item => item.name === element.name);
        if(exists === false) {
            color.push(element);
        }
    })

    // console.log(color);


    const handleChangeSize = (e) => {
        e.preventDefault();
        setSizeCart(e.target.value)
        
    }

    const handleChangeColor = (e) => {
        e.preventDefault();
        setcolorCart(e.target.value)
        
    }


    
    const handleSubmitAddCart = (e) => {
        if(localStorage.getItem("cart") === null){
            var cart = [];
            var elementcart = {
                id: (productById[0] && productById[0].product.id) && productById[0].product.id,
                size: sizeCart,
                color: colorCart,
                sl: 1
            }
            if(sizeCart != "" && colorCart != ""){
                cart.push(elementcart)
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            
        }
        else{
            var cart = JSON.parse(localStorage.getItem("cart"))
            var elementcart = {
                id: (productById[0] && productById[0].product.id) && productById[0].product.id,
                size: sizeCart,
                color: colorCart,
                sl: 1
            }
            if(sizeCart != "" && colorCart != ""){
                cart.push(elementcart)
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }

    console.log(size)

    return(
        <Fragment>
            <div className={cx("grid")}>
                <div className={cx("grid__row ")}>
                    <div className={cx("grid__colum-half")}>
                        <div className={cx("img-title")}>
                            {(productById[0] && productById[0].product.img) && <img src={productById[0].product.img} className={cx("img")}/>}
                        </div>
                    </div>
                    <div className={cx("grid__colum-half")}>
                        <div className={cx("infor-wrap")}>
                            {(productById[0] && productById[0].product.name) && <h1 className={cx("infor-name")}>{productById[0].product.name}</h1>}
                            {(productById[0] && productById[0].product.id) && <p className={cx("infor-id")}>Mã sản phẩm: {productById[0].product.id}</p>}
                            {(productById[0] && productById[0].product.price) && <p className={cx("infor-price")}>{productById[0].product.price}  VND</p>}
                            <form onSubmit={handleSubmitAddCart}>
                            <div className={cx("infor-select-wrap")}>
                                <div className={cx("select-size-wrap")}>
                                    <p className={(cx("size-text"))}>Size</p>
                                    <select className={cx("size-select")} name="size" onChange={handleChangeSize}>
                                        {size.map((s) => (
                                            <option 
                                            value= {s.name} 
                                            key={s.name}
                                            >{s.name}</option>
                                        ))}
                                        
                                    </select>
                                </div>
                                <div className={cx("select-color-wrap")}>
                                    <p className={(cx("color-text"))}>Color</p>
                                    <select className={cx("color-select")} name="color" onChange={handleChangeColor}>
                                    {color.map((c) => (
                                            <option value= {c.name} key={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={cx("submit-detail-contain")}>
                                <button type="submit" className={cx("submit-detail")}>THÊM VÀO GIỎ HÀNG</button>
                                <div className={cx("star")}>
                                    <FontAwesomeIcon icon={faHeart} className={cx("icon-heart")} />
                                </div>
                            </div>
                            
                            <button type="submit" className={cx("submit-detail-pay")}>THANH TOÁN</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default DetailProduct;