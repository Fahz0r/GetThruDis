<?php
include_once('../scores/inc/config.php');
print('What are you trying to do mate? F off.');
$status = $_POST['pStatus'];
$message = $_POST['pMessage'];
$level = $_POST['pLevel'];

if(isset($status) && isset($message) && isset($level)){
    $sQuery = "
		INSERT INTO
			disdata
		SET
			status = '".mysql_real_escape_string($status)."',
			message = '".mysql_real_escape_string($message)."',
			level = '".mysql_real_escape_string($level)."'
		";
    mysql_query($sQuery);
    return true;
}
else{
    $sQuery = "
		INSERT INTO
			disdata
		SET
			status = 'failed',
			message = 'tried direct linking to the database function',
			level = '-1'
		";
    mysql_query($sQuery);
    return true;
}
?>