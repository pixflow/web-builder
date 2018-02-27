<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><?php echo __( 'KARMA BUILDER', 'karma' ) . ' | ' . get_the_title(); ?> </title>
	<link rel="preconnect" href="https://fonts.typonine.com/" crossorigin>
	<?php wp_head(); ?>
</head>
<body class="karma-builder karma-device-mode-desktop">
<style>
	@font-face {
		font-family: HelveticaNeue;
		src: url("<?php echo  KARMA_BUILDER_URL . 'builder/font/helvetica.ttf' ?>");
		font-weight: 400;
		font-style: normal; }
	@font-face {
		font-family: HelveticaNeue;
		src: url("<?php echo  KARMA_BUILDER_URL . 'builder/font/helvetica_med.ttf' ?> ");
		font-weight: 500;
		font-style: normal; }
</style>
<div class="karma-builder-toolbar">
	<div class="karma-header-container">
		<div class="karma-builder-left">
			<div class="karma-builder-menu">
				<ul>
					<li class="builder-brand">
						<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/Karma-logo.svg' ); ?>
					</li>
					<li class="builder-pages">
						<div class="builder-page-label"><?php  _e('Pages:', 'karma'); ?> </div>
						<div class="builder-page-name">Home</div>
					</li>
					<li class="builder-sites-setting">
						<div class="builder-setting-label"><?php  _e('Setting', 'karma'); ?></div>
					</li>
					<li class="builder-sites-setting">
						<div class="builder-Typography-label"><a href="<?php echo get_home_url() . '/?builder-page=karma-typography-page' ?>" target="_blank" > <?php  _e( 'Typography', 'karma' ); ?> </a></div>
					</li>
					<li class="builder-upgrade">
						<div class="builder-upgrade-text"><?php  _e( 'Upgrade', 'karma' ); ?></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="karma-builder-right">
		<div class="karma-builder-controls">
			<ul>

				<li class="builder-publish"><div class="builder-publish-button"><div class="builder-publish-text"><?php  _e( 'Publish', 'karma' ); ?></div></div></li>
				<li class="builder-notification">
					<div class="builder-notification-icon"><?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/navigation.svg' ); ?></div>
					<div class="builder-notification-number"><div class="builder-notification-red-circle"></div></div>
				</li>
				<li class="builder-user-profile">
					<div><?php echo Karma_Helper_Utility::get_user_avatar(); ?> </div>
				</li>
			</ul>
		</div>
	</div>
	</div>
</div>
