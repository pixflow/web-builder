<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="<?php echo  KARMA_BUILDER_URL . 'builder/css/builder-styles.css' ?>" type="text/css">
	<title><?php echo __( 'KARMA BUILDER', 'karma' ) . ' | ' . get_the_title(); ?> </title>
</head>
<body class="karma-builder">
<div class="karma-builder-toolbar">
	<div class="karma-builder-left">
		<div class="karma-builder-menu">
			<ul>
				<li class="builder-brand">
					<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/karma.svg' ) ?>
				</li>
				<li class="builder-pages">
					<div class="builder-page-label"><?php  _e('Pages:', 'karma') ?> </div>
					<div class="builder-page-name">Home</div>
				</li>
				<li class="builder-sites-setting"><?php  _e('Setting', 'karma') ?></li>
				<li class="builder-upgrade">
					<div class="builder-upgrade-icon"><?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/upgrade.svg' ) ?></div>
					<div class="builder-upgrade-text"><?php  _e('Upgrade', 'karma') ?></div>
				</li>
			</ul>
		</div>
	</div>
	<div class="karma-builder-right">
		<div class="karma-builder-controls">
			<ul>
				<li class="builder-save"><?php  _e('Save', 'karma') ?></li>
				<li class="builder-publish"><?php  _e('Publish', 'karma') ?></li>
				<li class="builder-notification">
					<div class="builder-notification-icon"><?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/navigation.svg' ) ?></div>
					<div class="builder-notification-number">7</div>
				</li>
				<li class="builder-user-profile">
					<img src="<?php echo KARMA_BUILDER_URL ?>builder/media/profile.png ">
				</li>
			</ul>
		</div>
	</div>
</div>
