<?php
$data = [
    "version" => "1.0",
    "senderCityId" => "137",
    "senderCityPostCode" => "190000",
    "receiverCityId" => "".$_GET['ID_City'],
    "receiverCityPostCode" => "".$_GET['postalCode'],
    "currency" => "RUB",
    "tariffList" => array(
        [
            "id" => 139
        ],
        [
            "id" =>  366
        ]
    ),
    "goods" => array(

        [
            "weight" => $_GET['weight']/1000,
            "length" => $_GET['length'],
            "width" => $_GET['width'],
            "height" => $_GET['height']
        ]
    )
];

$data_string = json_encode($data, JSON_UNESCAPED_UNICODE);
$curl = curl_init('http://api.cdek.ru/calculator/calculate_tarifflist.php');
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
// Принимаем в виде массива. (false - в виде объекта)
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
);
$result = curl_exec($curl);
curl_close($curl);

echo ($result);


