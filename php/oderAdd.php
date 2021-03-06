<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set("display_errors", 1);

//require 'phpmailer/PHPMailer.php';
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

$mailTovar = '';
$mailNabor = '';

$params = [
    'orderJson' => isset($_GET['item']) ? json_encode(json_decode($_GET['item'], true)) : "",
    'promo' => htmlspecialchars($_GET['promo']),
    'name' => htmlspecialchars($_GET['name']),
    'surname' => htmlspecialchars($_GET['surname']),
    'email' => htmlspecialchars($_GET['email']),
    'phone' => htmlspecialchars($_GET['phone']),
    'delivery' => htmlspecialchars(1),
    'pay' => htmlspecialchars(0),
    'comment' => htmlspecialchars(''),
    'address' => htmlspecialchars($_GET['address']),
    'update_at' => date("Y-m-d H:i:s"),
    'create_at' => date("Y-m-d H:i:s")
];

$query = "";
foreach ($params as $key => $value) { $query .= ":".$key.", "; }

$config = [
    'host' => 'localhost',
    'name' => 'fpspbmailr_n2',
    'user' => 'nruneev',
    'password' => '1WinnoW1_1',
];

$db = new mysqli($config['host'], $config['user'], $config['password'], $config['name']);
if ($db->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}

$db->query("INSERT INTO orders (orderJson, promo, name, surname, email, phone, delivery_id, pay_id, comment, address, update_at, create_at) VALUES ('".$params['orderJson']."', '".$params['promo']."', '".$params['name']."', '".$params['surname']."', '".$params['email']."', '".$params['phone']."', '".$params['delivery']."', '".$params['pay']."', '".$params['comment']."', '".$params['address']."', '".$params['update_at']."', '".$params['create_at']."')");
$id = $db->insert_id;

$out = '';

$out .= "<html>";
$out .= "<head>";
$out .= "</head>";
$out .= "<body>";

$out .= "<table style='padding-top: 20px; border: 1px dashed #c1c1c1; padding: 20px 50px'>";

$out .= "<tr>";
$out .= "<td style='width: 100%'>";
$out .= "<h2 style='text-align: center; margin-bottom: 0; color: #818181; text-transform: uppercase; font-size: 18px; line-height: 25px; letter-spacing: .541667px; font-weight: 400;'>ИНТЕРНЕТ МАГАЗИН МОДНЫХ НОСКОВ</h2>";
$out .= "<img style='width: 592px; display: block; margin: 0 auto 25px;' src='https://template-comments.000webhostapp.com/static/media/logo.b7099ec4.png' alt='logo'/>";
$out .= "<p style='line-height: 18px; margin: 0 auto 25px; text-align: center; font-size: 14px; color: #101010; width: 592px; font-family: Bebas Neue'>";
$out .= "<b>Здравствуйте, ".$_GET['surname'] . ' ' . $_GET['name']."</b></br>";
$delivery = "";
if($_GET['delivery'] === "SDEK") {
    $url = 'https://integration.cdek.ru/new_orders.php';

    $priceDelivery = $_GET['priceDelivery'];
    $phone = $_GET['phone'];
    $email = $_GET['email'];
    $nameClient = $_GET['surname']. ' ' . $_GET['name'];
    $priceAll = $_GET['priceAll'];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>
<deliveryrequest account="lkF4bMkgvNCtyoLN2AivcZWI1IS9QrIs"
    date="'.date("Y-m-d H:i:s").'" number="'.$id.'" ordercount="1" secure="HUMAmsbKdutWXHMWcfG9crJUglmXHq15">
    <order comment="Заказ №'.$id.'" deliveryrecipientcost="'.$priceDelivery.'"
        deliveryrecipientvatrate="VATX" deliveryrecipientvatsum="0.0"
        number="number-'.$id.'" phone="'.$phone.'" reccitycode="'.$_GET['CityID'].'"
        recipientemail="'.$email.'" recipientname="'.$nameClient.'"
        sendcitycode="137" tarifftypecode="137">
        <address flat="'.$_GET['room'].'" house="'.$_GET['home'].'" street="'.$_GET['street'].'"/>
        <sender company="Интернет-Магазин Happestar" name="Happestar">
            <address flat="секция 25.2" house="90" street="ул. Бухарестская"/>
            <phone>+79117813100</phone>
        </sender>
        <package barcode="barcode-'.$id.'" number="so'.$id.'" sizea="10.0" sizeb="10.0" sizec="10.0" weight="1000.0">
            <item amount="1" comment="Заказ №'.$id.'" cost="'.$_GET['priceAll'].'"
                payment="'.$priceAll.'" paymentvatrate="VATX" paymentvatsum="0.0"
                warekey="warekey-'.$id.'" weight="1000.0"/>
        </package>
    </order>
</deliveryrequest>';


    //setting the curl parameters.
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
// Following line is compulsary to add as it is:
    curl_setopt($ch, CURLOPT_POSTFIELDS,
        "xml_request=" .$xml);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
    $data = curl_exec($ch);
    curl_close($ch);

    //convert the XML result into array
    $array_data = json_decode(json_encode(simplexml_load_string($data)), true);

    $nacladnay = $array_data['Order'][0]['@attributes']['DispatchNumber'];

    $delivery = "получить, когда СДЭК подтвердит Ваш заказ и свяжется с Вами для уточнения деталей доставки. Номер накладной для отслеживания: №".$nacladnay;
} elseif ($_GET['delivery'] === "SDEK_PICKUP") {
    $url = 'https://integration.cdek.ru/new_orders.php';

    $priceDelivery = $_GET['priceDelivery'];
    $phone = $_GET['phone'];
    $email = $_GET['email'];
    $nameClient = $_GET['surname']. ' ' . $_GET['name'];
    $priceAll = $_GET['priceAll'];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>
<deliveryrequest account="lkF4bMkgvNCtyoLN2AivcZWI1IS9QrIs"
    date="'.date("Y-m-d H:i:s").'" number="'.$id.'" ordercount="1" secure="HUMAmsbKdutWXHMWcfG9crJUglmXHq15">
    <order comment="Заказ №'.$id.'" deliveryrecipientcost="'.$priceDelivery.'"
        deliveryrecipientvatrate="VATX" deliveryrecipientvatsum="0.0"
        number="number-'.$id.'" phone="'.$phone.'" reccitycode="'.$_GET['CityID'].'"
        recipientemail="'.$email.'" recipientname="'.$nameClient.'"
        sendcitycode="137" tarifftypecode="368">
        <address PvzCode="'.$_GET['codePVZ'].'"/>
        <sender company="Интернет-Магазин Happestar" name="Happestar">
            <address flat="секция 25.2" house="90" street="ул. Бухарестская"/>
            <phone>+79117813100</phone>
        </sender>
        <package barcode="barcode-'.$id.'" number="so'.$id.'" sizea="10.0" sizeb="10.0" sizec="10.0" weight="1000.0">
            <item amount="1" comment="Заказ №'.$id.'" cost="'.$_GET['priceAll'].'"
                payment="'.$priceAll.'" paymentvatrate="VATX" paymentvatsum="0.0"
                warekey="warekey-'.$id.'" weight="1000.0"/>
        </package>
    </order>
</deliveryrequest>';


    //setting the curl parameters.
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
// Following line is compulsary to add as it is:
    curl_setopt($ch, CURLOPT_POSTFIELDS,
        "xml_request=" .$xml);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
    $data = curl_exec($ch);
    curl_close($ch);

    //convert the XML result into array
    $array_data = json_decode(json_encode(simplexml_load_string($data)), true);

    $nacladnay = $array_data['Order'][0]['@attributes']['DispatchNumber'];

    $delivery = "получить в пункте выдачи заказов СДЭК по адресу: ".$_GET['address'].". Номер накладной для отслеживания: №".$nacladnay;
} elseif ($_GET['delivery'] === "PICKUP") {
    $delivery = "забрать в нашем магазине по адресу: ".$_GET['address'].".";
} elseif ($_GET['delivery'] === "HAPPESTAR") {
    $delivery = "получить, когда наш курьер свяжется с Вами для уточнения деталей доставки.";
}
$out .= "Мы рады, что вы оформили заказ на нашем сайте. Ваш заказ №".$id." оформлен и подтвержден. В ближайшее время вы сможете его ".$delivery;
$out .= "</p>";
$basket = json_decode($_GET['item'], true);
if(isset($basket)) {
    $item = 1;
    $out .= "<table border='1' bordercolor='#c1c1c1' cellpadding=5 cellspacing=0 style='width: 592px;'>";
    $out .= "<tr>";
    $out .= "<td>№</td>";
    $out .= "<td>Изображение</td>";
    $out .= "<td>Название товара</td>";
    $out .= "<td>Артикул</td>";
    $out .= "<td>Размер</td>";
    $out .= "<td>Количество, шт</td>";
    $out .= "<td>Цена</td>";
    $out .= "</tr>";
    $tovars = $basket;
    foreach ($tovars as $key => $tovar) {
        $orders = ($tovar['id']);
        if(!is_array($tovar['article'])) {
            $orders++;
            $db->query("UPDATE tovars SET orders = '" . $orders . "' WHERE id = " . $tovar['id']);

            $size = $tovar['sizes'];
            $out .= "<tr>";
            $out .= "<td>" . $item++ . "</td>";
            $out .= "<td><img src='http://happestar.ru" . $tovar['src'] . "' width=55></td>";
            $out .= "<td>" . $tovar['name'] . "</td>";
            $out .= "<td>" . $tovar['article'] . "</td>";
            $out .= "<td>" . $tovar['sizes'] . "</td>";
            $out .= "<td>" . $tovar['count'] . "</td>";
            $out .= "<td>" . $tovar['cost'] . "</td>";
            $out .= "</tr>";
        }
    }
    $out .= "</table>";

    $item = 1;
    $out .= "<table border='1' bordercolor='#c1c1c1' cellpadding=5 cellspacing=0 style='width: 592px;'>";
    foreach ($tovars as $key => $tovar) {
        $orders = ($tovar['id']);
        if(is_array($tovar['article'])) {
            $out .= "<tr>";
            $out .= "<td>Изображение</td>";
            $out .= "<td>Название товара в наборе №" . $item++ . "</td>";
            $out .= "<td>Артикул</td>";
            $out .= "<td>Размер</td>";
            $out .= "<td>Цена</td>";
            $out .= "</tr>";
            foreach ($tovar['item'] as $key2 => $ids) {
                $out .= "<tr>";
                $out .= "<td><img src='http://happestar.ru" . $ids['src'] . "' width='55'></td>";
                $out .= "<td>" . $ids['name'] . "</td>";
                $out .= "<td>" . $ids['article'] . "</td>";
                $out .= "<td>" . $ids['sizes'] . "</td>";
                $out .= "<td>" . $ids['cost'] . " Руб.</td>";
                $out .= "</tr>";
            }
        }
    }
    $out .= "</table>";
}
$out .= "<p style='line-height: 18px; margin: 20px auto 10px; text-align: right; font-size: 14px; color: #101010; width: 592px; font-family: Bebas Neue'>";
$out .= "<span style='font-weight: bold; color: #5D5D5D; text-transform: uppercase'>Доставка: </span>".$_GET['priceDelivery']." Руб.</p>";
$out .= "<p style='line-height: 18px; margin: 0 auto 25px; text-align: right; font-size: 14px; color: #101010; width: 592px; font-family: Bebas Neue'>";
$out .= "<span style='font-weight: bold; color: #5D5D5D; text-transform: uppercase'>Итого: </span>".$_GET['priceAll']." Руб.</p>";
$out .= "<p style='line-height: 18px; margin: 30px auto 25px; text-align: center; font-size: 14px; color: #101010; width: 592px; font-family: Bebas Neue'>";
$out .= "Спасибо, что воспользовались нашим сайтом! По всем возникшим вопросам просьба свяжитесь с нами <a href='tel:+79117813100'>по телефону</a> или написав нам на <a href='mailto:happestar@mail.ru'>почту</a>. Наш магазин находится по адресу: Санкт-Петербург, ТК Фрунзенский, ул. Бухарестская 90, 2 этаж, секция 25.2 С.";
$out .= "</p>";
$out .= "</td>";
$out .= "</tr>";
$out .= "</table>";
$out .= "</body>";
$out .= "</html>";

$mail = new PHPMailer(true);
$mail->isSMTP();

$mail->SMTPDebug = 0;

$mail->Host = 'ssl://smtp.mail.ru';

$mail->SMTPAuth = true;
$mail->Username = 'Happestar@mail.ru'; // логин от вашей почты
$mail->Password = '1711rpm'; // пароль от почтового ящика
$mail->SMTPSecure = 'SSL';
$mail->Port = '465';

$mail->CharSet = 'UTF-8';
$mail->From = 'Happestar@mail.ru';  // адрес почты, с которой идет отправка
$mail->FromName = 'Интернет-Магазин Happestar'; // имя отправителя

try {
    $mail->addAddress($_GET['email'], 'Name');
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mail->isHTML(true);

$mail->Subject = "Ваш заказ №".$id." подтвержден и оформлен";
$mail->Body = $out;
$mail->AltBody = "";

//$mail->SMTPDebug = 1;

try {
    if ($mail->send()) {
        $answer = '1';
    } else {
        $answer = '0';
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mails = new PHPMailer(true);
$mails->isSMTP();

$mails->SMTPDebug = 0;

$mails->Host = 'ssl://smtp.mail.ru';

$mails->SMTPAuth = true;
$mails->Username = 'Happestar@mail.ru '; // логин от вашей почты
$mails->Password = '1711rpm'; // пароль от почтового ящика
$mails->SMTPSecure = 'SSL';
$mails->Port = '465';

$mails->CharSet = 'UTF-8';
$mails->From = 'Happestar@mail.ru';  // адрес почты, с которой идет отправка
$mails->FromName = 'Интернет-Магазин Happestar'; // имя отправителя

try {
    $mails->addAddress('Happestar@mail.ru', 'Name');
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mails->isHTML(true);

$mails->Subject = "Новый заказ №".$id;

$out2 = '';

$out2 .= "<html>";
$out2 .= "<head>";
$out2 .= "</head>";
$out2 .= "<body>";

$out2 .= "<table border=1 cellpadding=5 cellspacing=0>";

$out2 .= "<tr>";
$out2 .= "<td>№ заказа</td>";
$out2 .= "<td>".$id."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>ФИО</td>";
$out2 .= "<td>".$_GET['surname'] . ' ' . $_GET['name']."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>Email</td>";
$out2 .= "<td>".$_GET['email']."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>Телефон</td>";
$out2 .= "<td>".$_GET['phone']."</td>";
$out2 .= "</tr>";

$delivery = "";
if($_GET['delivery'] === "SDEK") {
    $delivery = "Доставка СДЭК";
} elseif ($_GET['delivery'] === "SDEK_PICKUP") {
    $delivery = "Самовывоз СДЭК";
} elseif ($_GET['delivery'] === "PICKUP") {
    $delivery = "Самовывоз";
} elseif ($_GET['delivery'] === "HAPPESTAR") {
    $delivery = "Курьерская доставка";
}

$out2 .= "<tr>";
$out2 .= "<td>Доставка</td>";
$out2 .= "<td>".($delivery)."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>Оплата</td>";
$pay = '';
if ($_GET['pay'] === 'Cash'){
    $pay = 'Наличными при получении';
} else if ($_GET['pay'] === 'CashLess') {
    $pay = 'Оплата картой при получении';
} else {
    $pay = 'Оплата онлайн на сайте';
}

$out2 .= "<td>".$pay."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>Адрес</td>";
$out2 .= "<td>".$_GET['address']."</td>";
$out2 .= "</tr>";

$out2 .= "<tr>";
$out2 .= "<td>Общая цена</td>";
$out2 .= "<td>".$_GET['priceAll']." Руб.</td>";
$out2 .= "</tr>";

$out2 .= "</table>";

$out2 .= "</br>";
$out2 .= "</br>";

$basket = json_decode($_GET['item'], true);
if(isset($basket)) {
    $item = 1;
    $out2 .= "<table border=1 cellpadding=5 cellspacing=0>";
    $out2 .= "<tr>";
    $out2 .= "<td>№</td>";
    $out2 .= "<td>Изображение</td>";
    $out2 .= "<td>Название товара</td>";
    $out2 .= "<td>Артикул</td>";
    $out2 .= "<td>Размер</td>";
    $out2 .= "<td>Количество, шт</td>";
    $out2 .= "<td>Цена</td>";
    $out2 .= "</tr>";
    $tovars = $basket;
    foreach ($tovars as $key => $tovar) {
        if (!is_array($tovar['article'])) {
            $size = $tovar['sizes'];
            $out2 .= "<tr>";
            $out2 .= "<td>" . $item++ . "</td>";
            $out2 .= "<td><img src='http://happestar.ru" . $tovar['src'] . "' width=75></td>";
            $out2 .= "<td>" . $tovar['name'] . "</td>";
            $out2 .= "<td>" . $tovar['article'] . "</td>";
            $out2 .= "<td>" . $tovar['sizes'] . "</td>";
            $out2 .= "<td>" . $tovar['count'] . "</td>";
            $out2 .= "<td>" . $tovar['cost'] . " Руб.</td>";
            $out2 .= "</tr>";
        }
    }
    $out2 .= "</table>";

    $item = 1;
    $out2 .= "<table border='1' cellpadding=5 cellspacing=0>";
    foreach ($tovars as $key => $tovar) {
        $orders = ($tovar['id']);
        if(is_array($tovar['article'])) {
            $out2 .= "<tr>";
            $out2 .= "<td>Изображение</td>";
            $out2 .= "<td>Название товара в наборе №" . $item++ . "</td>";
            $out2 .= "<td>Артикул</td>";
            $out2 .= "<td>Размер</td>";
            $out2 .= "<td>Цена</td>";
            $out2 .= "</tr>";
            foreach ($tovar['item'] as $key2 => $ids) {
                $out2 .= "<tr>";
                $out2 .= "<td><img src='http://happestar.ru" . $ids['src'] . "' width='75'></td>";
                $out2 .= "<td>" . $ids['name'] . "</td>";
                $out2 .= "<td>" . $ids['article'] . "</td>";
                $out2 .= "<td>" . $ids['sizes'] . "</td>";
                $out2 .= "<td>" . $ids['cost'] . " Руб.</td>";
                $out2 .= "</tr>";
            }
        }
    }
    $out .= "</table>";
}

$out2 .= "</body>";
$out2 .= "</html>";

$mails->Body = $out2;
$mails->AltBody = "";

//$mail->SMTPDebug = 1;

try {
    if ($mails->send()) {
        $answer = '1';
    } else {
        $answer = '0';
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }
} catch (\PHPMailer\PHPMailer\Exception $e) {}

echo $id;

