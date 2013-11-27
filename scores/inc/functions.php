<?php
function getRecords(){
    $aRecords = array();
    $sQuery = "
                SELECT
                    id,
                    status,
                    message,
                    level
                FROM
                    disdata
                    ";
    $rResult = mysql_query($sQuery);

    while($aRow = mysql_fetch_assoc($rResult)){
        $aRecords[] = $aRow;
    }
    return $aRecords;
}

function getLatestDeath(){
    $sQuery = "
                SELECT
                    *
                FROM
                    disdata
                ";

    $rResult = mysql_query($sQuery);
    $num_rows = mysql_num_rows($rResult);
    $iLimit = $num_rows;
    //echo $iLimit;

    $aDeaths = array();
    $sQuery = "
                SELECT
                    id,
                    status,
                    message,
                    level
                FROM
                    disdata
                WHERE
                    id = '".mysql_real_escape_string($iLimit)."'
                ";
    $rResult = mysql_query($sQuery);
    while($aRow = mysql_fetch_assoc($rResult)){
        $aDeaths[] = $aRow;
    }
    return $aDeaths;
}
?>