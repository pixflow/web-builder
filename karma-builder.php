<?php

use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern ;

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://pixflow.net
 * @since             0.1.0
 * @package           Karma_Builder
 *
 * @wordpress-plugin
 * Plugin Name:       Karma Builder
 * Plugin URI:        http://pixflow.net/products/karma-builder
 * Description:       Visually create your website in fastest and easiest way with Fully Customized Karma Builder.
 * Version:           0.1.0
 * Author:            Pixflow
 * Author URI:        http://pixflow.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       karma-builder
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-karma-builder-activator.php
 */
function karma_activate_builder() {

	require_once plugin_dir_path( __FILE__ ) . 'includes/class-karma-builder-activator.php';
	\KarmaBuilder\BuilderActivator\Karma_Builder_Activator::activate();

}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-karma-builder-deactivator.php
 */
function karma_deactivate_builder() {

	require_once plugin_dir_path( __FILE__ ) . 'includes/class-karma-builder-deactivator.php';
	\KarmaBuilder\BuilderDeactivator\Karma_Builder_Deactivator::deactivate();

}

register_activation_hook( __FILE__, 'karma_activate_builder' );
register_deactivation_hook( __FILE__, 'karma_deactivate_builder' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-karma-builder.php';

/**
 * The class responsible for explain about factory design pattern.
 */
require_once plugin_dir_path( __FILE__ )  . 'includes/class-karma-factory-pattern.php';


/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.1.0
 */
function karma_run_builder() {

	$class_factory = new Karma_Factory_Pattern();
	$plugin = $class_factory::$builder;
	$plugin->run();

}

add_action('init','karma_run_builder');