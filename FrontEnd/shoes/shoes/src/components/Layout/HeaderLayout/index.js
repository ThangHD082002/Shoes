import Header from "../component/Header"
import classNames from 'classnames/bind';
import styles from "./HeaderLayout.module.scss"


const cx = classNames.bind(styles)

function HeaderLayout({children}){
    return (
        <div className = {cx('contain-header')}>
            <Header />
            <div className = {cx('content-header')}>{children}</div>
        </div>
    )
}

export default HeaderLayout