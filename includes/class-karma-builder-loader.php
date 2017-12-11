<?php

/**
 * Register all actions and filters for the plugin
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Loader {


	/**
	 * The Core that's core of the builder
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Karma_Builder_Core    $core    Core of the builder.
	 */
	public $core;

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Karma_Builder_Loader    $plugin_name    The name of plugin
	 */
	public $plugin_name;

	/**
	 * The list of elements name
	 *
	 * @since    1.0.0
	 * @access   public
	 */
	public static $element_filename = array(
		'section',
		'column',
		'image',
		'text',
	);

	/**
	 * Define the core functionality of the builder.
	 *
	 * Set the plugin name that can be used throughout the plugin.
	 * Load the dependencies, and set the hooks for builder.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'karma-builder';
		$this->load_core();

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

		$this->core = Karma_Factory_Pattern::$builder_core;

	}


	/**
	 * Define the builder functionality and set hook and action for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function load_builder(){

		$builder = Karma_Factory_Pattern::$builder;

		if ( $builder::$edit_mode ) {
			add_filter( 'show_admin_bar', '__return_false' );
			remove_filter('the_content','wpautop');
			add_filter( 'the_content',  array( $this, 'change_the_content' ), -1 );
			add_filter( 'do_shortcode_tag', array( $this, 'create_builder_element_model' ), 10, 3 );
			add_action( 'wp_head', array( $this, 'execute_head_function' ), -1 );
			$builder_views = Karma_Factory_Pattern::$builder_views;
			$builder_views->load_builder_templates();

		}

		if( $builder::$output_mode ){
			add_action( 'wp_head', array( $this, 'prepare_builder' ), -1 );
		}

		$this->init_elements();

	}

	/**
	 * Call the functions needed in frontend
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function prepare_builder(){

		if( true == get_post_meta( get_the_ID(), 'karma_page' , true ) ){
			remove_filter('the_content','wpautop');
			add_filter( 'the_content',  array( $this, 'change_the_content' ), -1 );
			$this->load_cache_file();
		}

	}

	/**
	 * Call the functions needed in builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function execute_head_function(){

		$this->set_is_karma_page( get_the_ID(), true );
		$this->add_custom_meta_tags();
		$this->load_builder_js_templates();
		$this->load_cache_file();

	}

	/**
	 * Set whether page is Karma page or not.
	 *
	 * @param int       $page_id    Page ID .
	 * @param boolean   $is_karma   Created by Karma or not .
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function set_is_karma_page( $page_id, $is_karma = true ){

		if ( $is_karma ) {
			update_post_meta( $page_id, 'karma_page', 'true' );
		} else {
			delete_post_meta( $page_id, 'karma_page' );
		}

	}

	/**
	 * Load cache files for the current page
	 *
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function load_cache_file(){

		$builder = Karma_Factory_Pattern::$builder;
		$cache = new Cache_Manager();

		if( $builder::$edit_mode ){
			add_filter( 'do_shortcode_tag', array( $this, 'render_assets' ), 9, 3 );
			$cache->load_dependecy_files();
			return ;
		}

		if ( ! $cache->is_cache_file_exists() ) {
			add_filter( 'do_shortcode_tag', array( $this, 'render_assets' ), 9, 3 );
			add_filter( 'wp_footer',  array( $cache, 'set_up_cache' ), 1 );
		}

		add_filter( 'wp_footer',  array( $cache, 'load_dependecy_files' ), 2 );
		add_filter( 'wp_footer',  array( $cache, 'enqueue_file' ), 3 );

	}

	/**
	 * Update post content from post meta
	 *
	 * @param string $content  Content of current page
	 *
	 * @since     1.0.0
	 * @return    string The content
	 */
	public function change_the_content( $content ){

		$meta_info = get_post_meta( get_the_ID(), 'karma_post_content', true );
		if( '' !== $meta_info ){
			$content = $meta_info;
		}
		return $content;

	}

	/**
	 * Load builder JS templates
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function load_builder_js_templates(){

		$controller = Karma_Factory_Pattern::$builder_controller;
		$controller->register_controllers();
		$controller->register_extends();


	}


	/*
	 * Load elements files and create their instance
	 *
	 * @since    1.0.0
	 * @return	 void
	 */
	public function init_elements(){

		self::$element_filename = apply_filters( 'karma_elements', self::$element_filename );
		foreach ( self::$element_filename as $element ){

			require_once KARMA_BUILDER_DIR . 'elements/karma_' . $element . '/index.php';
			$class_name  = 'Karma_' . ucfirst( $element ) ;

			$file = File_System::get_instance();
			if( $file->file_exists( KARMA_BUILDER_DIR . 'elements/karma_' . $element . '/describe.php' ) ) {

				require_once KARMA_BUILDER_DIR . 'elements/karma_' . $element . '/describe.php';
				$class_name  .= '_Describe' ;

			}

			$class_name::get_instance() ;

		}

	}


	/**
	 * Add custom meta tags in header 
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function add_custom_meta_tags(){

		?>
		<meta name="post-id" content="<?php echo get_the_ID(); ?>"  />
		<?php

	}



	/**
	 * Generate element page models and localize it for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	private function generate_page_model(){

		$content = get_post_meta( get_the_ID(), 'karma_post_content', true );
		$page_model = json_encode( $this->core->parse_shortcodes( $content ) );
		wp_localize_script( $this->plugin_name, 'builderModels', $page_model );

	}

	/**
	 * Localize important params for builder
	 *
	 * @since   1.0.0
	 * @access  private
	 * @return  void
	 */
	private function localize_builder_param(){

		$builder_value = array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' )
		);

		wp_localize_script( $this->plugin_name, 'builderParams', json_encode( $builder_value ) );

	}

	/**
	 * Localize each element info
	 *
	 * @since   1.0.0
	 * @access  private
	 * @return  void
	 */
	private function localize_element_info(){

		$elements_info = json_encode( $this->core->element_info() );
		wp_localize_script( $this->plugin_name, 'builderElementInfo', $elements_info );

	}

	/**
	 * localize elements maps for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	private function send_elements_map(){

		$elements_map = json_encode( $this->core->element_map() );
		wp_localize_script( $this->plugin_name, 'builderMaps', $elements_map );

	}

	/**
	 * localize elements gizmo for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	private function send_elements_gizmo(){

		$elements_gizmo = json_encode( $this->core->element_gimzo() );
		wp_localize_script( $this->plugin_name, 'builderGizmo', $elements_gizmo );

	}

	/**
	 * Send localize value in front end
	 *
	 * @since     1.0.0
	 */
	public function send_localize_value(){

		$this->send_elements_map();
		$this->send_elements_gizmo();
	    $this->generate_page_model();
	    $this->localize_builder_param();
	    $this->localize_element_info();

    }

	/**
	 * Convert element in page as Karma element format
	 *
	 * @param	string	$output	Html source of each element
	 * @param	string	$tag	The name of element
	 * @param 	string	$attr	The attribute of element
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
		$classes = apply_filters( 'karma/elements/' . $tag . '/classes', array(), $attr );
		$classes = implode( ' ',$classes );
		$karma_builder_output = "<div class=\"karma-builder-element $classes\" data-element-key=\"{$shortcode_info['attributes']['element_key']}\" data-name=\"{$tag}\" >"
			. $output
			. '</div>' ;
		$shortcode_info['output'] = $karma_builder_output;
		do_action( 'karma_after_shortcode_apply_' . $tag, $shortcode_info );
		return $karma_builder_output;

	}

	/**
	 * Render assets
	 *
	 * @param	string	$output	Html source of each element
	 * @param	string	$tag	The name of element
	 * @param 	string	$attr	The attribute of element
	 *
	 * @since     1.0.0
	 * @return    string	the correct html source for builder
	 */
	public function render_assets( $output, $tag, $attr ){

		$shortcode_info = array(
			'shortcode_name' 	=> $tag,
			'attributes'		=> $attr,
			'output'			=> $output,
		);
		do_action( 'karma_before_shortcode_apply_' . $tag, $shortcode_info );
		return $output;

	}

}
