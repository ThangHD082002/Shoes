import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)

function Button({to, href, onClick, children, submit}){
    let Comp = 'button';

    


    const props = {
        onClick,
    };
    


    if(to){
        props.to = to;
        Comp = Link;
    } else if(href){
        props.href = href;
        Comp = 'a';
    }

    const classSub = cx('wraper',{
        submit
    });

    return (
        <Comp {...props} className={cx(classSub)}>
            <span>{children}</span>
        </Comp>
    )

}

export default Button;