import './index.sass'
import React from 'react';
import { CartContext } from '../../utils/contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCartArrowDown} from 'react-icons/fa'
import { STATUS } from '../../utils/requests';

const statusClasses = new Map();
statusClasses.set(STATUS.NONE, '');
statusClasses.set(STATUS.NEW, 'new');
statusClasses.set(STATUS.SELL, 'sell');


const ItemCardGood = ({ item, width, size }) => {
    if(width) {
        width -= 4;
        let items = document.getElementsByClassName('item');
        items && [].forEach.call(items, ((item) => item.style.width = width));
    }

    const { setItem, cartItems } = useContext(CartContext);
    const { t } = useTranslation();

    let itemInCart = cartItems.find((el) => (el.ids === item.id && el.sizes === size[0]));

    let button =
        <>
            <div className='info'>
                <label className='cost'>{item.cost}₽</label>
            </div>
        </>;

    let statusClass = statusClasses.get(item.status);

    return (
        <article className={'product ' + statusClass}>
            <div className="product__wrap">
                <a href={"/good?id=" + item.id} className='product__image-wrap'>
                    <img className="product__image " src={item.src} alt={item.name}/>
                </a>
                <h3 className="product__title">
                    <a href={"//good?id=" + item.id}>{item.name}</a>
                </h3>
                {button}
            </div>
        </article>
    )
};


export { ItemCardGood };