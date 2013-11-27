<?php

include('libs/Smarty.class.php');
include('scores/inc/config.php');
$smarty = new Smarty;

$smarty->assign('getDeaths', getLatestDeath());
require('header.php');
$smarty->display('index.tpl');

?>