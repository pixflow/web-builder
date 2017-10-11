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
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
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
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Karma_Builder_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The Core that's core of the builder
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Karma_Builder_Core    $core    Core of the builder.
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
	public function __construct( $factory ) {

		$this->plugin_name = 'karma-builder';
		$this->version = '1.0.0';

		$this->load_dependencies();
		Karma_Factory_Pattern::$builder = $this;
		$factory->set_builder_class_instance();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->load_core();

		$this->loader = Karma_Factory_Pattern::$builder_loader;

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Karma_Builder_Loader. Orchestrates the hooks of the plugin.
	 * - Karma_Builder_i18n. Defines internationalization functionality.
	 * - Karma_Builder_Admin. Defines all hooks for the admin area.
	 * - Karma_Builder_Public. Defines all hooks for the public side of the site.
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
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-core.php';

		/**
		 * The class responsible for define all elements controllers
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-controller.php';


		/**
		 * The class responsible for define all elements controllers
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-shortcode-base.php';


		/**
		 * The class responsible for Loading templates in frontend
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-views.php';


	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Karma_Builder_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = Karma_Factory_Pattern::$builder_i18n;

		add_action( 'plugins_loaded', array( $plugin_i18n, 'load_plugin_textdomain' ) );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = Karma_Factory_Pattern::$builder_admin;

		add_action( 'admin_enqueue_scripts', array( $plugin_admin, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $plugin_admin, 'enqueue_scripts' ) );
		add_action( 'wp_ajax_save_content', array( $plugin_admin, 'save_content' ) );
		add_action( 'karma_before_load_builder_window', array( $plugin_admin, 'load_builder_assets' ) );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = Karma_Factory_Pattern::$builder_public;

		add_action( 'wp_enqueue_scripts', array( $plugin_public, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $plugin_public, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( Karma_Factory_Pattern::$builder_loader, 'send_localize_value' ) );

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Karma_Builder_Loader. Orchestrates the hooks of the plugin.
	 * - Karma_Builder_i18n. Defines internationalization functionality.
	 * - Karma_Builder_Admin. Defines all hooks for the admin area.
	 * - Karma_Builder_Public. Defines all hooks for the public side of the site.
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
		$this->core = Karma_Builder_Core::get_instance();

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

		$this->loader->load_builder();

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
		do_action( 'karma_before_load_builder_window' );
		$builder_views = Karma_Factory_Pattern::$builder_views;
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
	 * @return    Karma_Builder_Loader    Orchestrates the hooks of the plugin.
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
