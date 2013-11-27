<?php

    include_once('functions.php');

    /*$sDbHost     = 'localhost';
    $sDbName     = 'getrudis';
    $sDbUser     = 'root';
    $sDbPassword = 'aphex114';*/

    $sDbHost     = 'localhost';
    $sDbName     = 'fahnjin_getrudis';
    $sDbUser     = 'fahnjin_getrudis';
    $sDbPassword = 'aphex114';

    $connection = mysql_connect($sDbHost, $sDbUser, $sDbPassword);
    if (!$connection) {
        die('Something went wrong connecting to database: ' . mysql_error());
    }

    $selectDb = mysql_select_db($sDbName, $connection);
    if (!$selectDb) {
        die ('I can not open database ' . $sDbName . '!: ' . mysql_error());
    }

?>