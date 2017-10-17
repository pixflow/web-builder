<?php
/**
 * The file that defines the builder views core class
 *
 * A class definition that templates use in builder
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Builder view class.
 *
 * This includes templates a builder.
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */

class Karma_Views {

	/**
	 * The list of template names
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private $templates = array(
		'header',
		'navbar',
		'footer',
	);

	/*
	 * Print navbar html source to the builder
	 *
	 * @return	void
	 */
	public function load_builder_templates(){

		foreach ( $this->templates as $temp ){
			$func_name = 'load_' . $temp . '_template' ;
			call_user_func( array( $this, $func_name ) );
		}
	}

	/*
	 * Print navbar html source to the builder
	 *
	 * @return void
	 */
	public function load_navbar_template(){

		include KARMA_BUILDER_DIR . 'public/templates/main-template.php';

	}

	/*
	 * Print header html source to the builder
	 *
	 * @return void
	 */
	public function load_header_template(){

		include KARMA_BUILDER_DIR . 'public/templates/header-template.php';

	}

	/*
	 * Print footer html source to the builder
	 *
	 * @return void
	 */
	public function load_footer_template(){

		include KARMA_BUILDER_DIR . 'public/templates/footer-template.php';

	}


	/*
	 * Print element setting panel source
	 *
	 * @return void
	 */
	public function load_elements_setting_panel(){

		?>
		<script type="text/html" id="tmpl-karma-element-setting-panel" >
		<?php include KARMA_BUILDER_DIR . 'public/templates/element-setting-panel-template.php'; ?>
		</script>
		<?php

	}


	/*
	 * Print controller js template
	 *
	 * @return void
	 */
	public function load_controller_js_templates( $controller ){

		?>
		<script type="text/html" id="tmpl-karma-<?php echo $controller; ?>-controller" >
			<?php include KARMA_BUILDER_DIR . "public/templates/controller/{$controller}/template.php"; ?>
		</script>
		<?php

	}

	/*
	 * enqueue controller script file
	 *
	 * @return void
	 */
	public function load_controller_script( $controller ){

		wp_enqueue_script( $controller, KARMA_BUILDER_URL . "public/templates/controller/{$controller}/script.js" );

	}

	/*
	 * Print extend js template
	 *
	 * @return void
	 */
	public function load_extend_js_templates( $extend ){

		?>
		<script type="text/html" id="tmpl-karma-<?php echo $extend; ?>-extend" >
			<?php include KARMA_BUILDER_DIR . "public/templates/extends/{$extend}/template.php"; ?>
		</script>
		<?php

	}

	/*
	 * enqueue controller script file
	 *
	 * @return void
	 */
	public function load_extend_script( $extend ){

		wp_enqueue_script( $extend, KARMA_BUILDER_URL . "public/templates/extends/{$extend}/script.js" );

	}



}