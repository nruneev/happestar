<?php
    $config = [
        'host' => 'localhost',
        'name' => 'fpspbmailr_n2',
        'user' => 'nruneev',
        'password' => '1WinnoW1_1',
    ];
    $mysqli = new mysqli($config['host'], $config['user'], $config['password'], $config['name']);
    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    $count = 0;
    if(isset($_GET['promo'])) {
        $res = $mysqli->query('SELECT filter FROM promos WHERE promo="'.$_GET['promo'].'" AND toggle=1');
        while($row = mysqli_fetch_assoc($res)) {
            $test = $row;
        }
        echo json_encode($test);
    }
