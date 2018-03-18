<?php
use KarmaBuilder\FPD\Karma_Factory_Pattern as Builder;
$assets = Builder::$builder_loader->get_custom_assets_value();
$custom_css = ( '' != $assets['style'] ) ? $assets['style'] : '// Write global custom css here';
$custom_js  = ( '' != $assets['script'] ) ? $assets['script'] : '/* Write global custom javascript code here */';
?>
<div class="karma-code-editor-container">
	<div class="karma-code-editor karma-custom-css" data-language="css"><?php echo $custom_css; ?></div>
	<div class="karma-code-editor karma-custom-js" data-language="javascript"><?php echo $custom_js; ?></div>
	<div class="karma-code-editor-tip"><?php _e( 'To see the changes publish and reload page.', 'karma-builder' ) ?></div>
</div>