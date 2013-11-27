<html>
<head>
    <title>Scores</title>
</head>
<body>
{foreach $grabRecords as $scores}
    {$scores.status} on difficulty {$scores.level} - Player #{$scores.id} {$scores.message}<br>
{/foreach}
</body>
</html>