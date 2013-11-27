<?php /* Smarty version Smarty-3.1.15, created on 2013-11-27 09:11:05
         compiled from "index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1322252850f4087e235-94515928%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e43b807af9cc8df7d350c3baf9e47f167c9520a0' => 
    array (
      0 => 'index.tpl',
      1 => 1385508414,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1322252850f4087e235-94515928',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52850f40b7f4b7_79199536',
  'variables' => 
  array (
    'getDeaths' => 0,
    'deaths' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52850f40b7f4b7_79199536')) {function content_52850f40b7f4b7_79199536($_smarty_tpl) {?>
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
                <b>INFO VERSION 0.91 (27-11-2013):</b><br><br>
                - Added rare item<br>
                - Added some secret things<br>
                - Rewrote a part of the monster fighting mechanism (works smoother/faster now)<br>
                - Added more pause CONTINUE buttons to keep an even pace<br>
                - Added a delay before the CONTINUE button appears<br>
                - Cleaned up some unused code or code that did nothing<br>
                <br>
                <b>BUG REPORT</b><br>
                - Fairly rare sighting of a phantom CONTINUE-button<br>
                - 0-hp-but-still-alive-bug still there *sigh*
            </div>
        </div>
        <div class="content">
            <div id="deathBanner">
                <horse>
                <?php  $_smarty_tpl->tpl_vars['deaths'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['deaths']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['getDeaths']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['deaths']->key => $_smarty_tpl->tpl_vars['deaths']->value) {
$_smarty_tpl->tpl_vars['deaths']->_loop = true;
?>
                    <?php if ($_smarty_tpl->tpl_vars['deaths']->value['status']=='win') {?>
                    [ This just in ! ] Player #<?php echo $_smarty_tpl->tpl_vars['deaths']->value['id'];?>
 beat
                        <?php if ($_smarty_tpl->tpl_vars['deaths']->value['level']==0) {?> easy
                        <?php } elseif ($_smarty_tpl->tpl_vars['deaths']->value['level']==1) {?> normal
                        <?php } elseif ($_smarty_tpl->tpl_vars['deaths']->value['level']==2) {?> hard
                        <?php }?> mode !
                    <?php } else { ?>
                    [ Breaking news ! ] Player #<?php echo $_smarty_tpl->tpl_vars['deaths']->value['id'];?>
 <?php echo $_smarty_tpl->tpl_vars['deaths']->value['message'];?>
 !
                    <?php }?>
                <?php } ?>
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
    <?php echo $_smarty_tpl->getSubTemplate ('footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>
</html><?php }} ?>
