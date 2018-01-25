<?php
/**
 * The file that defines the builder views core class
 *
 * A class definition that templates use in builder
 *
 * @link       http://pixflow.net
 * @since      0.1.0
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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */

class Karma_Views {

	/**
	 * The list of environment template names
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private $environment_templates = array(
		'header',
		'main',
		'footer',
	);

	/**
	 * The list of builder template names
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private $builder_templates = array(
		'element-panel-add-element',
		'element-panel-templates',
		'element-panel-section',
		'element-panel-unsplash',
		'element-panel-upgrade',
		'element-panel-list',
		'element-panel-header',
		'element-panel-footer',
		'element-panel-shop',
		'element-panel-image',
		'element-panel-top-header',
		'element-panel-price-filter',
		'element-setting-panel',
		'element-panel-category-filter',
		'element-panel-permium',
	);

	/**
	 * The list of builder template names that need to load inside iframe
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private $builder_iframe_templates = array(
		'delete-message-box',
		'new-section',
		'blank-page'

	);


	/*
	 * Print navbar html and create builder environment
	 *
	 * @return	void
	 */
	public function load_builder_environment(){

		foreach ( $this->environment_templates as $temp ){
			include KARMA_BUILDER_DIR . 'builder/templates/environment/' . $temp . '-template.php';
		}

	}

	/*
	 * Print Element Panel, Setting Panel and other buttons html
	 *
	 * @return	void
	 */
	public function load_builder_templates(){

		foreach ( $this->builder_templates as $temp ){
			?>
			<script type="text/html" id="tmpl-karma-<?php echo $temp; ?>" >
				<?php include KARMA_BUILDER_DIR . 'builder/templates/builder/' . $temp . '-template.php'; ?>
			</script>
			<?php
		}

	}

	/*
	 * Print Element Panel, Setting Panel and other buttons html inside iframe
	 *
	 * @return	void
	 */
	public function load_builder_iframe_templates(){

		foreach ( $this->builder_iframe_templates as $temp ){
			?>
			<script type="text/html" id="tmpl-karma-<?php echo $temp; ?>" >
				<?php include KARMA_BUILDER_DIR . 'builder/templates/builder/' . $temp . '-template.php'; ?>
			</script>
			<?php
		}

	}


	/*
	 * Print controller js template
	 *
	 * @return void
	 */
	public function load_controller_js_templates( $controller ){

		?>
		<script type="text/html" id="tmpl-karma-<?php echo $controller; ?>-controller" >
			<?php include KARMA_BUILDER_DIR . "builder/templates/controller/{$controller}/template.php"; ?>
		</script>
		<?php

	}

	/*
	 * enqueue controller script file
	 *
	 * @return void
	 */
	public function load_controller_script( $controller ){

		wp_enqueue_script( $controller, KARMA_BUILDER_URL . "builder/templates/controller/{$controller}/script.min.js" );

	}

	/*
	 * Print extend js template
	 *
	 * @return void
	 */
	public function load_extend_js_templates( $extend ){

		?>
		<script type="text/html" id="tmpl-karma-<?php echo $extend; ?>-extend" >
			<?php include KARMA_BUILDER_DIR . "builder/templates/extends/{$extend}/template.php"; ?>
		</script>
		<?php

	}

	/*
	 * enqueue controller script file
	 *
	 * @return void
	 */
	public function load_extend_script( $extend ){

		wp_enqueue_script( $extend, KARMA_BUILDER_URL . "builder/templates/extends/{$extend}/script.min.js" );

	}

	/*
	 * Enqueue blank page
	 *
	 * @return {html} html of template
	 */
	public function get_blank_page_template(){

		ob_start();
		include( KARMA_BUILDER_DIR . "builder/templates/builder/blank-page-template.php" );
		return ob_get_clean();

	}

}