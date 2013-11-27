
<body>
    <section id="header"><a href="index1.php"><img src="img/logo3.png"></a>
        <div id="feather"><a href="http://studio-anjin.co.uk/" target="_new">
            <img src="img/feather.png"></a>
        </div>
    </section>
    <div id="playBar"></div>
    <div id="mainContent">
        <div class="content">
            <div id="fixes">
                <b>INFO VERSION 0.911 (27-11-2013):</b><br><br>
                - Added rare item<br>
                - Added some secret things<br>
                - Re rewrote a part of the monster fighting mechanism (left in some stupid things)<br>
                - Added more pause CONTINUE buttons to keep an even pace<br>
                - Added a delay before the CONTINUE button appears<br>
                - Cleaned up some unused code or code that did nothing<br>
                - [0.911] Added new item to lift the Numpty scroll<br>
                <br>
                <b>BUG FIX REPORT [0.911]</b><br>
                - Phantom CONTINUE button is now gone<br>
                - Pretty sure I've found the 0-hp-but-still-alive-bug now and fixed it for good!
            </div>
        </div>
        <div class="content">
            <div id="deathBanner">
                <horse>
                {foreach $getDeaths as $deaths}
                    {if $deaths.status == 'win'}
                    [ This just in ! ] Player #{$deaths.id} beat
                        {if $deaths.level == 0} easy
                        {elseif $deaths.level == 1} normal
                        {elseif $deaths.level == 2} hard
                        {/if} mode !
                    {else}
                    [ Breaking news ! ] Player #{$deaths.id} {$deaths.message} !
                    {/if}
                {/foreach}
                </horse>
            </div>
            <div id="news">
                <b>ABOUT THE GAME</b><br><br>
                GETRUDIS is a rogue-like dungeon crawler text adventure with a twist of dark humour, created by Robin
                de Bekker (Fah, or Fahz0r). It's been entirely written in jQuery, so it is playable on mobile devices as
                well ! Proper info page to follow.<br>
                <br>
                <b>NEWS 18th OF NOVEMBER 2013</b><br>
                Release time ! That's it really. Can't be arsed to write anything more.
            </div>
        </div>
        <div id="twit">
            <a class="twitter-timeline"
               height="340"
               href="https://twitter.com/search?q=%23getrudis"
               data-widget-id="402795951925891072"
               data-chrome="nofooter transparent">Tweets about "#getrudis"</a>
        </div>
    </div>
    {include file='footer.tpl'}
</body>
</html>