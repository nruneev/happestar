import './index.sass'
import React, {useState} from 'react';

export const Promo = (element) => {
    console.log(element)
    return (<p className={'loginPromoLink'}>{element.item.name}: {element.item.price} Рублей</p>)
}

const AdminsPromoPage = () => {
    if (sessionStorage.getItem('loginAdmin') !== 'ok') {
        document.location.href = "/admin/login";
    }

    let [preload, setPreload] = useState(false)

    let [item, setItem] = useState({
        name: "",
        price: "",
    })

    let [promos, setPromo] = useState([]);

    console.log(promos)

    const saveEdit = () => {
        fetch("/php/savePromo.php?promo=" + item.name + "&price=" + item.price).then(() => document.location.href = document.location.href);
    }

    if (!preload) {
        fetch("/php/loadPromo.php").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                let peom = []
                data.map((el) => peom.push({
                    name: el.promo,
                    price: el.price
                }));
                setPromo(peom)
                setPreload(true);
            }).catch(reason => console.log(reason));
    }

    return (
        <div className={'wrapper adminBlockFlex'}>
            <div className={'loginNavigation'}>
                <a href={'oder'} className={'loginNavigationItem'}>
                    История Заказов
                </a>
                <a href={'good'} className={'loginNavigationItem'}>
                    Товары
                </a>
                <a href={'text'} className={'loginNavigationItem'}>
                    Текст на сайте
                </a>
                <a href={'photo'} className={'loginNavigationItem'}>
                    Фото на сайте
                </a>
                <a href={'promo'} className={'loginNavigationItem activeLoginBlock'}>
                    Промо
                </a>
            </div>
            <div className={'loginRightBlock'}>
                <h1>Промо</h1>
                <div className={'login-input'}>
                    <p>Главная страница</p>
                    <input placeholder={'Промо'} type={'text'} value={item.name} onChange={(e) => setItem({
                        ...item,
                        name: e.target.value
                    })}/>
                </div>
                <div className={'login-input'}>
                    <p>Покупателю</p>
                    <input placeholder={'Покупателю'} type={'number'} value={item.price} onChange={(e) => setItem({
                        ...item,
                        price: e.target.value
                    })}/>
                </div>
                <div onClick={() => saveEdit()} className={'login-btn'}>
                    <p>Сохранить</p>
                </div>
                {promos.map((el) => {
                    return(<Promo item={el}/>)
                })}
            </div>
        </div>
    )
}

export { AdminsPromoPage }
