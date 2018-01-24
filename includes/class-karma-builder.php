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
	 * A static variable that contains an instance of Karma_Builder
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      Karma_Builder    $instance    The reference to *Singleton* instance of this class.
	 */
	private static $instance;

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
	 * Builder status in frontend .
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      boolean
	 */
	public static $output_mode = false;

	/**
	 * Builder status in builder .
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      boolean
	 */
	public static $edit_mode = false ;

	/**
	 * Returns the *Singleton* instance of this class.
	 *
	 * @access   public
	 * @return   Karma_Builder - The *Singleton* instance.
	 * @since    1.0.0
	 */
	public static function get_instance( $factory = null ) {

		if ( null === Karma_Builder::$instance ) {
			Karma_Builder::$instance = new Karma_Builder( $factory );
		}

		return Karma_Builder::$instance;

	}

	/**
	 * Private clone method to prevent cloning of the instance of the
	 * *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    1.0.0
	 */
	private function __clone(){}

	/**
	 * Private unserialize method to prevent unserializing of the *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    1.0.0
	 */
	private function __wakeup(){}

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	private function __construct( $factory ) {

		$this->constants();
		$this->load_dependencies();
		Karma_Factory_Pattern::$builder = $this;
		$factory->set_builder_class_instance();
		$this->set_locale();
		//@TODO it should load just in admin area
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
		 * The class responsible for work and manage file and directory in plugin
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-file-system.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once KARMA_BUILDER_DIR . 'admin/class-karma-builder-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once KARMA_BUILDER_DIR . 'builder/class-karma-builder-init.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-core.php';

		/**
		 * The class responsible for manager stylesheet and script cache file in output
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-cache-manager.php';

		/**
		 * The class responsible for working with
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-stylesheet.php';

		/**
		 * The class responsible for define all elements controllers
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-setting-panel.php';


		/**
		 * The class responsible for define all elements controllers
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-shortcode-base.php';


		/**
		 * The class responsible for Loading templates in frontend
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-views.php';

		/**
		 * Helper Functions for Karma Builder
		 */
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-helper.php';


	}

	/**
	 * Define the global constants for this plugin.
	 *
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function constants() {

		define( 'KARMA_BUILDER_NAME', 'karma-builder' );
		define( 'KARMA_BUILDER_VERSION', '1.0.0' );

		define( 'KARMA_BUILDER_DIR', plugin_dir_path( dirname( __FILE__ ) ) );
		define( 'KARMA_BUILDER_URL', plugin_dir_url( dirname( __FILE__ ) ) );

		$wp_upload_directory = wp_upload_dir();
		define( 'CACHE_DIRECTORY_PATH', $wp_upload_directory['basedir'] . '/karma-cache'  );
		define( 'CACHE_DIRECTORY_URL', $wp_upload_directory['baseurl'] . '/karma-cache'  );

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
		add_action( 'admin_enqueue_scripts', array( $plugin_admin, 'enqueue_scripts' ), 10 , 1 );
		add_action( 'wp_ajax_publish', array( $plugin_admin, 'publish' ) );
		add_action( 'wp_ajax_save', array( $plugin_admin, 'save' ) );
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
		require_once KARMA_BUILDER_DIR . 'includes/class-karma-builder-core.php';
		$this->core = Karma_Builder_Core::get_instance();

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {

		if ( self::is_in_builder() && isset( $_GET['load_builder'] ) ){
			$this->prevent_from_loading_wordpress();
		}
		$this->set_builder_status();
		$this->loader->load_builder();

	}



	/**
	 * Check for loading script and styles for builder
	 *
	 * @since     1.0.0
	 * @return    boolean	true if should load otherwise false.
	 */
	private function is_builder_environment(){

		if( isset( $_GET['in_builder'] ) && true === (boolean) $_GET['in_builder'] ){
			return true ;
		}else {
			return false;
		}

	}

	/**
	 * Set builder status in each different states.
	 *
	 * @since     1.0.0
	 */
	private function set_builder_status(){

		if ( $this->is_builder_environment() ){
			self::$edit_mode = true ;
		}

		if( ! $this->is_builder_environment() && ! self::is_in_builder() ){
			self::$output_mode = true;
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
		do_action( 'karma_before_load_builder_window' );

		$this->modify_wordpress_action();
		$builder_views = Karma_Factory_Pattern::$builder_views;
		$builder_views->load_builder_environment();
		die();

	}

	/**
	 * Modify wordpress actions and hooks
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function modify_wordpress_action(){

		// Remove all WordPress actions
		remove_all_actions( 'wp_head' );
		remove_all_actions( 'wp_print_styles' );
		remove_all_actions( 'wp_print_head_scripts' );
		remove_all_actions( 'wp_footer' );

		// Handle wp_head
		add_action( 'wp_head', 'wp_enqueue_scripts', 1 );
		add_action( 'wp_head', 'wp_print_styles', 8 );
		add_action( 'wp_head', 'wp_print_head_scripts', 9 );
		add_action( 'wp_head', 'wp_site_icon' );

		// Handle wp_footer
		add_action( 'wp_footer', 'wp_print_footer_scripts', 20 );
		add_action( 'wp_footer', 'wp_auth_check_html', 30 );

		// Handle wp_enqueue_scripts
		remove_all_actions( 'wp_enqueue_scripts' );

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_builder_assets' ], 999999 );

	}

	/**
	 * Enqueue styles and scripts to top iFrame
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function enqueue_builder_assets(){

		wp_print_scripts( array( 'jquery','wp-util', 'backbone' ) );
		wp_enqueue_script( 'karma-unsplash' , KARMA_BUILDER_URL . 'builder/js/karma-unsplash.min.js', array( ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'jquery-ui' , KARMA_BUILDER_URL . 'builder/js/jquery-ui.min.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-jquery.nicescroll' , KARMA_BUILDER_URL . 'builder/js/jquery.nicescroll.min.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-spectrum' , KARMA_BUILDER_URL . 'builder/js/spectrum.min.js', array( ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-color-picker' , KARMA_BUILDER_URL . 'builder/js/karma-builder-color-picker.min.js', array( ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-jquery.easing' , KARMA_BUILDER_URL .'builder/js/jquery-easing.min.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-jquery.qiucksand' , KARMA_BUILDER_URL .'builder/js/quicksand.min.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-range-slider' , KARMA_BUILDER_URL . 'builder/js/rangeslider.min.js', array( 'jquery' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-builder-actions' , KARMA_BUILDER_URL . 'builder/js/karma-builder-actions.min.js', array( 'backbone' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-element-panel', KARMA_BUILDER_URL . 'builder/js/karma-builder-element-panel.min.js', array( 'karma-builder-actions' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_script( 'karma-setting-panel', KARMA_BUILDER_URL . 'builder/js/karma-builder-setting-panel.min.js', array( 'karma-builder-actions' ), KARMA_BUILDER_VERSION, false );
		wp_enqueue_style( 'karma-builder-styles', KARMA_BUILDER_URL . 'builder/css/builder-styles.css', KARMA_BUILDER_VERSION, false );
		wp_enqueue_media();

		$this->load_templates();


	}

	private function load_templates(){

		Karma_Factory_Pattern::$builder_views->load_builder_templates();
		Karma_Factory_Pattern::$builder_loader->load_builder_js_templates();

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
	public static function user_have_access_page(){

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

		if( (
				(
					isset( $_GET['load_builder'] )
					&& true === (boolean) $_GET['load_builder']
			    ) || (
					isset( $_GET['in_builder'] )
					&& true === (boolean) $_GET['in_builder']
			    )
		    )
			&& self::check_preview_mode()
		    && self::user_have_access_page() ){
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
		return KARMA_BUILDER_NAME;
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
		return KARMA_BUILDER_VERSION;
	}

}
