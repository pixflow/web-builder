<?php
/**
 * The file that defines the builder views core class
 *
 * A class definition that templates use in builder
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 */

/**
 * Builder view class.
 *
 * This includes templates a builder.
 *
 *
 * @since      1.0.0
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
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

		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/templates/main-template.php';

	}

	/*
	 * Print header html source to the builder
	 *
	 * @return void
	 */
	public function load_header_template(){

		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/templates/header-template.php';

	}

	/*
	 * Print footer html source to the builder
	 *
	 * @return void
	 */
	public function load_footer_template(){

		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/templates/footer-template.php';

	}


	/*
	 * Print element setting panel source
	 *
	 * @return void
	 */
	public function load_elements_setting_panel(){

		?>
		<script type="text/html" id="tmpl-karma-element-setting-panel" >
		<?php include plugin_dir_path( dirname( __FILE__ ) ) . 'public/templates/element-setting-panel-template.php'; ?>
		</script>
		<?php

	}



}