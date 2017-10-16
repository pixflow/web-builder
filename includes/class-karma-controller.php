<?php
if ( ! defined( 'ABSPATH' ) ) {
	/** Exit if accessed directly. */
	die('Silence is golden');
}

/**
 * The file that defines the builder controllers
 *
 * A class definition that controllers use in elements panel
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Controller/includes
 */

/**
 * Builder controllers.
 *
 * This includes builder builder controllers and load their dependency.
 *
 *
 * @since      1.0.0
 * @package    Karma_Controller
 * @subpackage Karma_Controller/includes
 * @author     Pixflow <info@pixflow.net>
 */


class Karma_Controller {

	const TITLE2 = 'title2';
	const TITLE = 'title';
	const IMAGE = 'image';
	const RANGE = 'range';
	const TEXT = 'text';
	const RADIO_IMAGE = 'radio-image';



	/**
	 * Load and register the controllers in builder
	 *
	 * @since    1.0.0
	 * @access   public
	 */
	public function register_controllers(){

		$class_info = new ReflectionClass( __CLASS__ );
		$available_controller = $class_info->getConstants();
		$available_controller  = apply_filters( 'karma_controller', $available_controller  );
		$karma_view = Karma_Factory_Pattern::$builder_views;
		foreach ( $available_controller as $controller ){
			$karma_view->load_controller_js_templates( $controller );
			$karma_view->load_controller_script( $controller );
		}

	}

}

