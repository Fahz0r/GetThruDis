<?php

include('libs/Smarty.class.php');
include('inc/config.php');

$smarty = new Smarty;
$smarty->assign('grabRecords', getRecords());

$smarty->display('templates/index.tpl');
?>