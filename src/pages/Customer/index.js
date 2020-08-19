import React, { useState } from 'react';
import {useHistory} from "react-router-dom";


const Customer = () => {
    let history = useHistory();
    return (
        <div className='wrapper'>
            <div className='linker'>
                <ul>
                    <li><a href={'./'}>Главная</a></li>
                    <li><a onClick={() => history.goBack()}>Назад</a></li>
                    <li><span>Покупателю</span></li>
                </ul>
                <h1>Покупателю</h1>
            </div>

            <h1 className='title-delivery'>Как вернуть неподошедший товар?</h1>
            <p className='article-delivery'>
                <ul>
                    <li>Вы можете вернуть купленный товар если соблюдены следующие условия: сохранен товарный вид изделия (в том числе оригинальная упаковка); срок обращения не превышает 14 календарных дней со дня получения заказа.</li>
                    <li>Возврат товара, приобретенного в интернет-магазине осуществляется только предварительно связавшись с нами любым доступным для вас способом.</li>
                    <li>Возврат товара приобретенного в розничном магазине надлежащего качества осуществляется в течение 14 дней в том магазине, где он был приобретен.</li>
                    <li>Претензии по качеству товара предъявляются в магазине по месту покупки.</li>
                    <li>Все случаи возврата товаров в нашем магазине регулируются действующими на территории России законами:</li>
                    <li>Постановлением Правительства от 19 января 1998 г. N 55, «Об утверждении Правил продаж отдельных видов товаров, перечня товаров длительного пользования, на которые не распространяется требование покупателя о безвозмездном предоставлении ему на период ремонта или замены аналогичного товара перечня непродовольственных товаров надлежащего качества, не подлежащих возврату на аналогичный товар других размеров, формы, габарита, фасона, расцветки или комплектации»;</li>
                    <li>Правила продажи товаров дистанционным способом;</li>
                    <li>Федеральным Законом от 07 февраля 1992 года N 2300-1 «О защите прав потребителей».</li>
                    <li>Возврат денежных средств осуществляется без учета стоимости доставки. Не подошел размер? Просто верните товар курьеру, оплатив только стоимость доставки — 300 рублей.</li>
                </ul>
            </p>
            <h1 className='title-delivery'>Как и когда вы вернёте деньги?</h1>
            <p className='article-delivery'>
                Возврат денежных средств будут осуществлён тем способом, которым вы производили оплату заказа.
                Срок возврата составляет от нескольких дней при возврате денежным переводом, до двух недель при возврате денег на банковскую карту.
            </p>
        </div>
    )
};


export { Customer };
