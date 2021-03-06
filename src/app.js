import './app.sass'
import React, { useState, useEffect } from 'react'
import {CartContext, PackContext} from './utils/contexts';
import { Header } from './components/Header'
import { Main } from './pages/Main';
import { Catalog } from './pages/Catalog';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import {
    BrowserRouter as Router,
    Route, Switch,
} from 'react-router-dom';
import {Pack} from "./pages/Pack";
import {Partner} from "./pages/Partner";
import {Contacts} from "./pages/Contacts";
import {Good} from "./pages/Good";
import {Cart} from "./pages/Cart";
import {Customer} from "./pages/Customer";
import {AboutUs} from "./pages/AboutUs";
import {Admins} from "./pages/Admin";
import {AdminsOder} from "./pages/Admin/oder";
import {AdminsGood} from "./pages/Admin/goods";
import {AdminsCurrentOder} from "./pages/Admin/oder/current";
import {AdminsGoodEdit} from "./pages/Admin/goods/edit";
import {AdminsGoodNew} from "./pages/Admin/goods/new";
import {AdminsTextPage} from "./pages/Admin/text";
import {AdminsPhotoPage} from "./pages/Admin/photo";
import {AdminsPromoPage} from "./pages/Admin/promo";
import {Sale} from "./pages/Sale";
import {New} from "./pages/New";
import {NotFound} from "./pages/NotFound";
import {Oders} from "./pages/Oders";
import {Black50} from "./pages/black20";
import {Anime} from "./pages/Anime";


const cartItemField = 'cartItems';
const packItemField = 'packItems';


const App = () => {
    let cartItemsSaved = JSON.parse(localStorage.getItem(cartItemField)) || [];
    let [cartItems, setItemsCart] = useState(cartItemsSaved);

    let packItemsSaved = JSON.parse(localStorage.getItem(packItemField)) || [];
    let [packItems, setItemPack] = useState(packItemsSaved);

    const removeItem = (id) => setItemsCart(cartItems.filter((el) => el.id !== id));

    const setItem = (item, count) => {
        let cartItem, index;
        for(let i = 0; i < cartItems.length; i++) {
            let el = cartItems[i];
            if(el.id === item.id) {
                cartItem = el;
                index = i;
                break;
            }
        }

        if (count < 1) {
            setItemsCart([...cartItems.slice(0, index), ...cartItems.slice(index + 1, cartItems.length)]);
            return;
        }

        if(cartItem) {
            cartItem.count = count;
            setItemsCart([...cartItems.slice(0, index), cartItem, ...cartItems.slice(index + 1, cartItems.length)]);
        }
        else if (count > 1){
            cartItem = {...item, count: count};
            setItemsCart([...cartItems, cartItem]);
        }
        else {
            cartItem = {...item, count: 1};
            setItemsCart([...cartItems, cartItem]);
        }
    };

    const removeItemPack = (id) => {
        let element = packItems.filter((el) => el.ids === id);
        setItemPack(packItems = packItems.filter((el) => el.id !== element[0].id));
    }

    const setItemsPack = (item, count) => {
        let packItem, index;
        item.id = Math.abs(Math.random() * 100);
        for(let i = 0; i < packItems.length; i++) {
            let el = packItems[i];
            if(el.id === item.id) {
                packItem = el;
                index = i;
                break;
            }
        }

        if (count < 1) {
            setItemPack([...packItems.slice(0, index), ...packItems.slice(index + 1, packItems.length)]);
            return;
        }

        if(packItem) {
            packItem.count = count;
            setItemPack([...packItems.slice(0, index), packItem, ...packItems.slice(index + 1, packItems.length)]);
        }
        else {
            packItem = {...item, count: 1};
            setItemPack([...packItems, packItem]);
        }
    };

    let [isOpened, setIsOpen] = useState(false);

    useEffect(() => {
        changeScrollAbility(isOpened);
        localStorage.setItem(cartItemField, JSON.stringify(cartItems))
    });

    return (
        <PackContext.Provider value={{ packItems, setItem: setItemsPack, removeItemPack}}>
            <CartContext.Provider value={{ cartItems, setItem: setItem, removeItem }}>
                <div className='app' id='app'>
                        <Router>
                            <BurgerMenu isOpen={isOpened} closeMenu={() => setIsOpen(false)}/>
                            <div id='rest'>
                                <Header openMenu={() => setIsOpen(true)}/>
                                <Switch>
                                    <Route path='/' exact>
                                        <Main/>
                                    </Route>
                                    <Route path='/happestar' exact>
                                        <Main/>
                                    </Route>
                                    <Route path='/catalog'>
                                        <Catalog/>
                                    </Route>
                                    <Route path='/sale'>
                                        <Sale/>
                                    </Route>
                                    <Route path='/new'>
                                        <New/>
                                    </Route>
                                    <Route path='/cart'>
                                        <Cart/>
                                    </Route>
                                    <Route path='/history'>
                                        <AboutUs/>
                                    </Route>
                                    <Route path='/customer'>
                                        <Customer/>
                                    </Route>
                                    <Route path='/good'>
                                        <Good/>
                                    </Route>
                                    <Route path='/oders'>
                                        <Oders/>
                                    </Route>
                                    <Route path='/black50'>
                                        <Black50/>
                                    </Route>
                                    <Route path='/pack'>
                                        <Pack/>
                                    </Route>
                                    <Route path='/partner'>
                                        <Partner/>
                                    </Route>
                                    <Route path='/admin/login'>
                                        <Admins/>
                                    </Route>
                                    <Route path='/admin/oder'>
                                        <AdminsOder/>
                                    </Route>
                                    <Route path='/admin/current'>
                                        <AdminsCurrentOder/>
                                    </Route>
                                    <Route path='/admin/good'>
                                        <AdminsGood/>
                                    </Route>
                                    <Route path='/admin/edit'>
                                        <AdminsGoodEdit/>
                                    </Route>
                                    <Route path='/admin/new'>
                                        <AdminsGoodNew/>
                                    </Route>
                                    <Route path='/admin/text'>
                                        <AdminsTextPage/>
                                    </Route>
                                    <Route path='/anime'>
                                        <Anime/>
                                    </Route>
                                    <Route path='/admin/photo'>
                                        <AdminsPhotoPage/>
                                    </Route>
                                    <Route path='/admin/promo'>
                                        <AdminsPromoPage/>
                                    </Route>
                                    <Route path='/contacts'>
                                        <Contacts/>
                                    </Route>
                                    <Route>
                                        <NotFound/>
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                </div>
            </CartContext.Provider>
        </PackContext.Provider>
    )
};


function changeScrollAbility(isMenuOpened) {
    document.body.style.overflow = isMenuOpened ? 'hidden' : null;
}


export default App
