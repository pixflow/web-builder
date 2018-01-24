<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/admin
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Admin {

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {


	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Karma_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Karma_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( KARMA_BUILDER_NAME, plugin_dir_url( __FILE__ ) . 'css/karma-builder-admin.css', array(), KARMA_BUILDER_VERSION, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @param string $hook hook name
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts( $hook ) {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Karma_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Karma_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */


		if ( $hook == 'post-new.php' || $hook == 'post.php' ) {
			$this->enqueue_tab_editor_script();
		}

		wp_enqueue_script( KARMA_BUILDER_NAME, plugin_dir_url( __FILE__ ) . 'js/karma-builder-admin.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );

	}

	/**
	 * Register the JavaScript for the add karma builder tab.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_tab_editor_script() {

		global $post;
		if ( 'page' === $post->post_type || 'post' === $post->post_type ) {

			wp_enqueue_script( KARMA_BUILDER_NAME . '-tab-editor', plugin_dir_url( __FILE__ ) . 'js/karma-tab-editor.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
			$karma_tab_editor_data = array(
				'post_id'   => $post->ID,
				'use_karma' => get_post_meta( $post->ID, 'karma_page', true ),
				'builder'   => esc_url( $this->generate_builder_url( $post->id ) )
			);
			wp_localize_script( KARMA_BUILDER_NAME . '-tab-editor', 'karmaTabEditorData', $karma_tab_editor_data );

		}

	}


	/**
	 * Publish the content of page and print the result
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function publish(){

		$models = $_POST['models'];
		$id = $_POST['id'];
		$builder_core = Karma_Builder_Core::get_instance();
		$models = json_decode( stripslashes( $models ), true );
		if ( $builder_core->publish_post( $models, $id ) ) {
			echo '{ "result" : "true", "msg" : "success" }';
		} else {
			echo '{ "result" : "false", "msg" : "error" }';
		}
		Karma_Factory_Pattern::$builder_loader->set_is_karma_page( $id, true );
		Cache_Manager::remove_cache_file( $id );
		wp_die();

	}

	/**
	 * Save the content of page and print the result
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function save(){

		$models = $_POST['models'];
		$id = $_POST['id'];
		$builder_core = Karma_Builder_Core::get_instance();
		$models = json_decode( stripslashes( $models ), true );
		if ( $builder_core->save_post( $models, $id ) ) {
			echo '{ "result" : "true", "msg" : "success" }';
		} else {
			echo '{ "result" : "false", "msg" : "error" }';
		}
		Cache_Manager::remove_cache_file( $id );
		wp_die();

	}

	/**
	 * enqueue style for builder page
	 *
	 * @since     1.0.0
	 * @return    void
	 */

	public function load_builder_assets(){

		//wp_enqueue_style( KARMA_BUILDER_NAME, plugin_dir_url( __FILE__ ) . 'css/pages/karma-builder.css', KARMA_BUILDER_VERSION, false );
		//wp_enqueue_style(KARMA_BUILDER_NAME,plugin_dir_url( __FILE__ ) . '../builder/css/builder-styles.css', KARMA_BUILDER_VERSION, false);


	}

	/**
	 * get post ID and return karma builder URL for post
	 *
	 * @param   integer $post_id    post ID
	 *
	 * @since   1.0.0
	 * @return  string      URL that open Karma to edit post
	 */

	public function generate_builder_url( $post_id ){

		$builder_url = get_permalink( $post_id );
		$builder_url .= ( false === strpos( $builder_url, '?' ) ) ? '?load_builder=true' : '&load_builder=true' ;
		return $builder_url;

	}
}
