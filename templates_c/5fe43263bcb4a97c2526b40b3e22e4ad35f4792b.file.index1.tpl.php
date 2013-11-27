<?php /* Smarty version Smarty-3.1.15, created on 2013-11-18 01:19:46
         compiled from "index1.tpl" */ ?>
<?php /*%%SmartyHeaderCode:532852896b327ef4c0-68050483%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5fe43263bcb4a97c2526b40b3e22e4ad35f4792b' => 
    array (
      0 => 'index1.tpl',
      1 => 1384737530,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '532852896b327ef4c0-68050483',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52896b32b4e108_74729402',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52896b32b4e108_74729402')) {function content_52896b32b4e108_74729402($_smarty_tpl) {?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/html">
<?php echo $_smarty_tpl->getSubTemplate ('header1.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body>
<div class="main">
    <div id="top"><button id="moveUp">Up</button></div>
    <div id="left"><button id="moveLeft">Left</button></div>
    <div id="bgBox"></div>
    <div id="textBox"></div>
    <div id="textBox2"><b>NOTICE</b><br>
        Hello you! What a smashing idea to play this on your smart- or iPhone but sadly the game only
        looks good in LANDSCAPE mode. So tilt that device and get crackin'! <br>
        <br><br> (Also, bonus points if you are currently reading this on the bog.)</div>
    <div id="creditBox"><b>Graphics and programming by:</b> <br>Fahz0r<br><br>
        <b>Splel cheking:</b> <br>Ray Stevens<br><br>
        <b>Special thanks to:</b> <br>Kyle for helping out with the game balance and the rest of the team
        for endlessly testing it.</div>
    <div id="creditBox2"><b>Visit our website</b><br>
        <a href="http://studio-anjin.co.uk/" target="_new">Studio Anjin</a>
    </div>
    <div id="right"><button id="moveRight">Right</button></div>
    <div id="down"><button id="moveDown">Down</button></div>
    <br>
    <div id="healthBar"></div>
    <div id="armorBar"></div>
    <div id="weaponBar"></div>
    <div id="inventory">
    </div>
    <div id="coorXY"></div>
    <div id="coorRoom"></div>
    <div id="chance"></div>
</div>

<div id="map"></div>

</body>
</html><?php }} ?>
