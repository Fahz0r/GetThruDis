<?php /* Smarty version Smarty-3.1.12, created on 2013-10-12 09:12:33
         compiled from "templates\index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:2730252590e3df123e6-12671979%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f90be83b235fb03cc225b11607032e9ddd415899' => 
    array (
      0 => 'templates\\index.tpl',
      1 => 1381568553,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2730252590e3df123e6-12671979',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.12',
  'unifunc' => 'content_52590e3e169542_91470522',
  'variables' => 
  array (
    'grabRecords' => 0,
    'scores' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52590e3e169542_91470522')) {function content_52590e3e169542_91470522($_smarty_tpl) {?><html>
<head>
    <title>Details</title>
</head>
<body>
poop
<?php  $_smarty_tpl->tpl_vars['scores'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['scores']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['grabRecords']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['scores']->key => $_smarty_tpl->tpl_vars['scores']->value){
$_smarty_tpl->tpl_vars['scores']->_loop = true;
?>
    <?php echo $_smarty_tpl->tpl_vars['scores']->value['status'];?>
 on level 1 - Player #<?php echo $_smarty_tpl->tpl_vars['scores']->value['id'];?>
 <?php echo $_smarty_tpl->tpl_vars['scores']->value['message'];?>

<?php } ?>
</body>
</html><?php }} ?>