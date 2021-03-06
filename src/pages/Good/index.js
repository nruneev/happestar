import './index.sass'
import React, {useContext, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {get_item} from "../../utils/helpers";
import {CartContext} from "../../utils/contexts";
import {get_items, useFetch} from "../../utils/requests";
import {ItemCardGood} from "../../components/ItemCardGood";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Good = () => {
    let history = useHistory();
    let itemer = useFetch(get_items, []);

    let [preload, setPreload] = useState(true);

    let [descr, setDescr] = useState(0);

    let classDescr = ''

    switch (descr) {
        case 0:
            classDescr = '';
            break;
        case 1:
            classDescr = 'first';
            break;
        case 2:
            classDescr = 'second';
            break;
        case 3:
            classDescr = 'third';
            break;
        case 4:
            classDescr = 'four';
            break;
    }

    let query = useQuery();
    const id = query.get('id');

    itemer = itemer.filter((el) => el.id !== id)
    itemer = itemer.slice(0, 4);
    console.log(itemer);

    let [actualPhotos, setActual] = useState(0);
    let [count, setCount] = useState(1);

    let [item, pushItem] = useState({});

    if (preload) {
        get_item(id).then((result) => {
            console.log(result);
            let color = '';
            switch (result[0].color_id) {
                case '1':
                    color = 'gray';
                    break;
                case '2':
                    color = 'black';
                    break;
                case '3':
                    color = 'white';
                    break;
                case '4':
                    color = 'red';
                    break;
                case '5':
                    color = 'orange';
                    break;
                case '6':
                    color = 'yellow';
                    break;
                case '7':
                    color = 'green';
                    break;
                case '8':
                    color = 'pink';
                    break;
                case '9':
                    color = 'blue';
                    break;
                case '10':
                    color = 'gradient';
                    break;
            }
            pushItem({
                id: result[0].id,
                article: result[0].article,
                src: result[0].photoMain,
                composition: result[0].composition,
                photos: [result[0].photoMain, result[0].photoLeft, result[0].photoDetail],
                name: result[0].name,
                cost: result[0].price,
                sizes: ['35 - 39', '40 - 45'],
                color: color,
                delivery: result[0].delivery,
                pay: result[0].pay,
                description: result[0].description,
                discount: result[0].discount,
                prev_cost: result[0].price,
            })
            setPreload(false);
        });
    }

    const {setItem, cartItems } = useContext(CartContext);
    let isAdd = false;
    let [activeSize, setActiveSize] = useState('');
    let itemInCart = cartItems.find((el) => el.ids === item.id && el.sizes === activeSize);
    console.log(itemInCart);

    let classNamess = '';

    let counter = itemInCart ?
        <ul className='_counter_'>
            <li className="_minus" onClick={() => setItem(itemInCart, --itemInCart.count)}>–</li>
            <li className="_num">{itemInCart.count}</li>
            <li className="_plus" onClick={() => setItem(itemInCart, ++itemInCart.count)}>+</li>
        </ul> :
        <>
            <ul className="_counter_">
                <li className="_minus" onClick={() => {
                    if (count > 0) {
                        setCount(--count)
                    }
                }}>–</li>
                <li className="_num">{count}</li>
                <li className="_plus" onClick={() => setCount(++count)}>+</li>
            </ul>
        </>;

    if (itemInCart) {
        isAdd = true;
    } else {
        itemInCart = item;
        itemInCart.count = 0;
    }

    if(preload) {
        return (<div>Загрузка</div>)
    }

    return (
        <div className='wrapper'>
            <div className='wrapperss'>
                <div className="prod">
                    <div className="mod_top"></div>
                    <div className="photos">
                        <div className='thumbs'>
                            {item.photos.map((el, key) => {
                                const classer = key === actualPhotos ? 'selected' : '';
                                if (el !== '') {
                                    return (
                                        <div className={'swiper-slide ' + classer} onClick={() => setActual(key)}><img
                                            src={el}/></div>)
                                }
                            })}
                        </div>
                        <div className="main-wrap">
                            <img src={item.photos[actualPhotos]} alt={item.name}/>
                        </div>
                    </div>
                    <div className="content">
                        <div className='linkerer'>
                            <ul>
                                <li><Link to={'./'}>Главная</Link></li>
                                <li><a onClick={() => history.goBack()}>Назад</a></li>
                                <li><Link to={'./catalog'}>Каталог</Link></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <h1 className="title">{item.name}</h1>
                        <div className="info">
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <ul className="colors" data-title="цвета">
                                <li>
                                    <span className={"_no_css_class active-color " + item.color}></span>
                                </li>
                            </ul>
                            <ul className="sizes " data-title="размер">
                                {item.sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === size ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(size)}>{size}</li>
                                })}
                            </ul>
                            <div className="art" data-title="количество">
                                <td className="count">
                                    {counter}
                                </td>
                            </div>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{parseInt(item.cost, 10) - parseInt(item.discount, 10)} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => {
                                if (!isAdd) {
                                    if (activeSize !== '') {
                                        setItem({
                                            id: Math.abs(Math.random() * 100),
                                            ids: item.id,
                                            article: item.article,
                                            src: item.src,
                                            name: item.name,
                                            cost: item.cost,
                                            discount: item.discount,
                                            prev_cost: item.cost,
                                            status: item.status,
                                            tags: item.tags,
                                            isNabor: false,
                                            sizes: activeSize
                                        }, count)
                                    } else {
                                        alert('Выберите размер!')
                                    }
                                }
                            }} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                        <ul className={'accrd ' + classDescr}>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 1) {
                                    setDescr(0)
                                } else {
                                    setDescr(1)
                                }
                            }}>
                                <div className='ttl'>Описание</div>
                                <div className='descr'>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 2) {
                                    setDescr(0)
                                } else {
                                    setDescr(2)
                                }
                            }}>
                                <div className='ttl'>Cостав</div>
                                <div className='descr'>
                                    <p>{item.composition}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 3) {
                                    setDescr(0)
                                } else {
                                    setDescr(3)
                                }
                            }}>
                                <div className='ttl'>Доставка</div>
                                <div className='descr'>
                                    <p>
                                        {item.delivery}
                                    </p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 4) {
                                    setDescr(0)
                                } else {
                                    setDescr(4)
                                }
                            }}>
                                <div className='ttl'>Оплата</div>
                                <div className='descr'>
                                    <p>
                                        {item.pay}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='prod_mobile'>
                    <div className="mod_top">
                        <div className='linkerer'>
                            <ul>
                                <li><Link to={'./'}>Главная</Link></li>
                                <li><a onClick={() => history.goBack()}>Назад</a></li>
                                <li><Link to={'./catalog'}>Каталог</Link></li>
                                <li><span>{item.name}</span></li>
                            </ul>
                        </div>
                        <p>{item.name}</p>
                    </div>
                    <div className='photos'>
                        <img src={item.photos[actualPhotos]} alt={item.name}/>
                        <div className='thumbs liner'>
                            {item.photos.map((el, key) => {
                                const classer = key === actualPhotos ? 'selected' : '';
                                if (el !== '') {
                                    return (
                                        <div className={'swiper-slide ' + classer} onClick={() => setActual(key)}><img
                                            src={el}/></div>)
                                }
                            })}
                        </div>
                    </div>
                    <div className='content'>
                        <div className='info'>
                            <p className="art" data-title="Артикул">{item.article}</p>
                            <ul className="colors" data-title="цвета">
                                <li>
                                    <span className={"_no_css_class active-color " + item.color}></span>
                                </li>
                            </ul>
                            <ul className="sizes " data-title="размер">
                                {item.sizes.map((size, key) => {
                                    classNamess = isAdd ? "act" : "";
                                    let className = activeSize === size ? "active" : "";
                                    return <li className={className} onClick={() => setActiveSize(size)}>{size}</li>
                                })}
                            </ul>
                            <div className="art" data-title="количество">
                                <td className="count">
                                    {counter}
                                </td>
                            </div>
                        </div>
                        <div className="cost ">
                            <span className="cur _rub_">{parseInt(item.cost, 10) - parseInt(item.discount, 10)} <i className="rub-symbol">₽</i></span>
                        </div>
                        <div className="btns">
                            <button onClick={() => {
                                if (!isAdd) {
                                    if (activeSize !== '') {
                                        setItem({
                                            id: Math.abs(Math.random() * 100),
                                            ids: item.id,
                                            article: item.article,
                                            src: item.src,
                                            name: item.name,
                                            cost: item.cost,
                                            discount: item.discount,
                                            prev_cost: item.cost,
                                            status: item.status,
                                            tags: item.tags,
                                            isNabor: false,
                                            sizes: activeSize
                                        }, count)
                                    } else {
                                        alert('Выберите размер!')
                                    }
                                }
                            }} className={"_incart  js---buy-btn " + classNamess}>
                                {isAdd ? "Товар уже в корзине" : "Положить в корзину"}
                            </button>
                        </div>
                        <ul className={'accrd ' + classDescr}>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 1) {
                                    setDescr(0)
                                } else {
                                    setDescr(1)
                                }
                            }}>
                                <div className='ttl'>Описание</div>
                                <div className='descr'>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 2) {
                                    setDescr(0)
                                } else {
                                    setDescr(2)
                                }
                            }}>
                                <div className='ttl'>Cостав</div>
                                <div className='descr'>
                                    <p>{item.composition}</p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 3) {
                                    setDescr(0)
                                } else {
                                    setDescr(3)
                                }
                            }}>
                                <div className='ttl'>Доставка</div>
                                <div className='descr'>
                                    <p>
                                        {item.delivery}
                                    </p>
                                </div>
                            </li>
                            <li className='child' onClick={() => {
                                if (descr !== 0 && descr === 4) {
                                    setDescr(0)
                                } else {
                                    setDescr(4)
                                }
                            }}>
                                <div className='ttl'>Оплата</div>
                                <div className='descr'>
                                    <p>
                                        {item.pay}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container'>
                <h1>МЫ РЕКОМЕНДУЕМ</h1>
                <div className='product-list'>
                    {itemer.map((el) => {return <ItemCardGood item={el}/>})}
                </div>
            </div>
        </div>
    )
};

export { Good };
