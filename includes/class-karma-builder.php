<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Pixity_Builder {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Pixity_Builder_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The Core that's core of the builder
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Pixity_Builder_Core    $core    Core of the builder.
	 */
	public $core;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'karma-builder';
		$this->version = '1.0.0';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->load_core();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Pixity_Builder_Loader. Orchestrates the hooks of the plugin.
	 * - Pixity_Builder_i18n. Defines internationalization functionality.
	 * - Pixity_Builder_Admin. Defines all hooks for the admin area.
	 * - Pixity_Builder_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-karma-builder-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-karma-builder-public.php';

		/**
		 * The class responsible for Loading templates in frontend
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-views.php';

		$this->loader = new Pixity_Builder_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Pixity_Builder_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Pixity_Builder_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Pixity_Builder_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_action( 'wp_ajax_save_content', $plugin_admin, 'save_content' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Pixity_Builder_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Pixity_Builder_Loader. Orchestrates the hooks of the plugin.
	 * - Pixity_Builder_i18n. Defines internationalization functionality.
	 * - Pixity_Builder_Admin. Defines all hooks for the admin area.
	 * - Pixity_Builder_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_core() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-core.php';
		$this->core = Pixity_Builder_Core::get_instance();

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {

		if ( self::is_in_builder() && $this->user_have_access_page() ){
			$this->prevent_from_loading_wordpress();
		}

		if( $this->is_in_iframe() ){
			// Don't display the admin bar when in live editor mode
			add_filter( 'show_admin_bar', '__return_false' );
			$this->genrate_page_model();
			$this->loader->add_filter( 'do_shortcode_tag', $this, 'create_builder_element_model', 10, 3 );
		}

		$this->loader->run();

	}

	/**
	 * Check for loading script and styles for builder
	 *
	 * @since     1.0.0
	 * @return    boolean	true if should load otherwise false.
	 */
	private function is_in_iframe(){

		if( isset( $_GET['in_builder'] ) && true === (boolean) $_GET['in_builder'] ){
			return true ;
		}else {
			return false;
		}

	}

	/**
	 * Prevent from load builder and load Karma views
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	private function prevent_from_loading_wordpress() {

		// Don't display the admin bar when in live editor mode
		add_filter( 'show_admin_bar', '__return_false' );
		$builder_views = new Karma_Views();
		$builder_views->load_builder_templates();
		die();

	}


	/**
	 * Get the current page url
	 *
	 * @since    1.0.0
	 *
	 * @return String	Permalink of current page
	 */
	public static function get_current_page_url(){

		$page_id = url_to_postid( "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] );
		$current_url = get_page_link( $page_id );
		return esc_url( $current_url );

	}

	/**
	 * Check the user roles.
	 *
	 * @since     1.0.0
	 * @return    boolean	true if user has access or not.
	 */
	private function user_have_access_page(){

		if ( current_user_can( 'edit_posts' ) && ! post_password_required() ){
			return true;
		}

		return false;
	}

	/**
	 * Check the builder is load or not.
	 *
	 * @since     1.0.0
	 * @return    boolean	true if builder is load otherwise false.
	 */
	public static function is_in_builder(){

		if( isset( $_GET['load_builder'] )
			&& true === (boolean) $_GET['load_builder']
			&& self::check_preview_mode()  ){
			return true ;
		}else{
			return false;
		}

	}

	/**
	 * Check for the ajax request and customize mode
	 *
	 * @since     1.0.0
	 * @return    boolean	true if it is not ajax request and customizer preview
	 */
	public static function check_preview_mode(){

		// Skip load Builder if its not in customizer
		if( is_customize_preview() || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
			return false;
		}

		return true;
	}


	/**
	 * Generate shortcode page models and localize it for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	private function genrate_page_model(){

		$page_id = get_the_id();
		$post_object = get_post ( $page_id );
		$content = $post_object->post_excerpt;
		$page_model = json_encode( $this->core->parse_shortcodes( $content ) );
		wp_localize_script( $this->get_plugin_name(), 'builder_models', $page_model );

	}


	/**
	 * Convert shortcodes in page as Karma shortcode format
	 *
	 * @param	string	$output	Html source of each shortocde
	 * @param	string	$tag	The name of shortcode
	 * @param 	string	$attr	The attribute of shortcode
	 *
	 * @since     1.0.0
	 * @return    string	the correct html source for builder
	 */
	public function create_builder_element_model( $output, $tag, $attr ){

		$shortcode_info = array(
			'shortcode_name' 	=> $tag,
			'attributes'		=> $attr,
			'output'			=> $output,
		);
		do_action( 'karma_before_shortcode_apply' . $tag, $shortcode_info );
		static $uniqe_id = 1 ;
		$karma_builder_output = "<div class=\"karma-builder-element\" style='border:1px solid brown' data-name=\"{$tag}\" "
			. "data-element-id={$uniqe_id} >"
			. $output
			. '</div>' ;
		$shortcode_info['output'] = $karma_builder_output;
		do_action( 'karma_after_shortcode_apply' . $tag, $shortcode_info );
		$uniqe_id ++ ;
		return $karma_builder_output;

	}



	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Pixity_Builder_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
