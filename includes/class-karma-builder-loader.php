<?php
namespace KarmaBuilder\BuilderLoader ;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;
use KarmaBuilder\FileSystem\Karma_File_System as File_System;
use KarmaBuilder\CacheManager\Karma_Cache_Manager as Cache_Manager;
use KarmaBuilder\BaseManager\Karma_Base_Manager as Base_Manager;



/**
 * Register all actions and filters for the plugin
 *
 * @link       http://pixflow.net
 * @since      0.1.0
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


class Karma_Builder_Loader extends Base_Manager{


	/**
	 * The Core that's core of the builder
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      Karma_Builder_Core    $core    Core of the builder.
	 */
	public $core;

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      Karma_Builder_Loader    $plugin_name    The name of plugin
	 */
	public $plugin_name;

	/**
	 * The list of elements name
	 *
	 * @since    0.1.0
	 * @access   public
	 */
	public static $element_filename = array(
		'section',
		'column',
		'image',
		'text',
		'button',
		'image_box',
		'video_box'
	);

	/**
	 * Define the core functionality of the builder.
	 *
	 * Set the plugin name that can be used throughout the plugin.
	 * Load the dependencies, and set the hooks for builder.
	 *
	 * @since    0.1.0
	 */
	public function __construct() {

		$this->plugin_name = 'karma-builder';
		$this->load_core();
		$this->init_templates();

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
	 * @since    0.1.0
	 * @access   private
	 */
	private function load_core() {

		$this->core = Karma_Factory_Pattern::$builder_core;

	}


	/**
	 * Define the builder functionality and set hook and action for builder
	 *
	 * @since     0.1.0
	 * @return    void
	 */
	public function load_builder(){

		$builder = Karma_Factory_Pattern::$builder;

		add_filter( 'do_shortcode_tag', array( $this, 'create_builder_element_model' ), 10, 3 );

		if ( $builder::$edit_mode ) {
			add_filter( 'show_admin_bar', '__return_false' );
			remove_filter('the_content','wpautop');
			add_filter( 'the_content',  array( $this, 'change_the_content' ), -1 );
			add_action( 'wp_head', array( $this, 'execute_head_functions' ), -1 );

		}

		if( $builder::$output_mode ){
			add_action( 'wp_head', array( $this, 'prepare_builder' ), -1 );
		}

		$this->init_elements();
		add_filter( 'the_content',  array( $this, 'create_general_element' ), 100 );

	}

	/**
	 * Put all the content into unique div
	 *
	 * @param string $content  Content of current page
	 *
	 * @since     0.1.0
	 * @return    string The content
	 */
	public function create_general_element( $content ) {

		return '<div id="karma-builder-layout">'
			. $content
			. '</div>';

	}

	/**
	 * Call the functions needed in frontend
	 *
	 * @since     0.1.0
	 * @return    void
	 */
	public function prepare_builder(){

		if( 'true' == get_post_meta( get_the_ID(), 'karma_page' , true ) ){
			remove_filter( 'the_content', 'wpautop' );
			add_filter( 'the_content',  array( $this, 'change_the_content' ), -1 );
			$this->load_cache_file();
		}

	}

	/**
	 * Call the functions needed in builder
	 *
	 * @since     0.1.0
	 * @return    void
	 */
	public function execute_head_functions(){
		
		$this->add_custom_meta_tags();
		$this->load_builder_js_templates();
		$this->load_cache_file();
		$builder_views = Karma_Factory_Pattern::$builder_views;
		$builder_views->load_builder_iframe_templates();
		$stylesheet = Karma_Factory_Pattern::$stylesheet;
		$stylesheet->create_default_styles();

		// Apply filter
		add_filter('body_class', array( $this ,'add_custom_body_classes') );

	}


	/**
	 * Add custom class to body tag
	 *
	 * @param array	$classes	List of body class.
	 *
	 * @since     0.1.0
	 * @return    array	New list of body class
	 */
	function add_custom_body_classes( $classes ) {

		$classes[] = 'karma-builder-environment karma-device-mode-desktop';
		return $classes;
	}

	/**
	 * Set whether page is Karma page or not.
	 *
	 * @param int       $page_id    Page ID .
	 * @param boolean   $is_karma   Created by Karma or not .
	 *
	 * @since     0.1.0
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
	 * @since     0.1.0
	 * @return    void
	 */
	public function load_cache_file(){

		$builder = Karma_Factory_Pattern::$builder;
		$cache = new Cache_Manager();

		if( $builder::$edit_mode ){
			add_filter( 'do_shortcode_tag', array( $this, 'render_assets' ), 9, 3 );
			$cache->load_dependency_files();
			return ;
		}

		if ( ! $cache->is_cache_file_exists() ) {
			add_filter( 'do_shortcode_tag', array( $this, 'render_assets' ), 9, 3 );
			add_filter( 'wp_footer',  array( $cache, 'set_up_cache' ), 1 );
		}

		add_filter( 'wp_footer',  array( $cache, 'load_dependency_files' ), 2 );
		add_filter( 'wp_footer',  array( $cache, 'enqueue_file' ), 3 );

	}

	/**
	 * Update post content from post meta
	 *
	 * @param string $content  Content of current page
	 *
	 * @since     0.1.0
	 * @return    string The content
	 */
	public function change_the_content( $content ){

		$meta_info = get_post_meta( get_the_ID(), 'karma_post_content', true );
		$builder = Karma_Factory_Pattern::$builder;
		$view = Karma_Factory_Pattern::$builder_views;

		if( '' !== $meta_info ){
			$content = $meta_info;
		} else {
			$content = ( $builder::$edit_mode ) ? $view->get_blank_page_template() : '';
		}
		return $content;

	}

	/**
	 * Load builder JS templates
	 *
	 * @since     0.1.0
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
	 * @since    0.1.0
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

			$class_name = '\\KarmaBuilder\Elements\DescribeElement\\' . $class_name ;
			$class_name::get_instance() ;

		}

	}

	/**
	 * Add custom meta tags in header 
	 *
	 * @since     0.1.0
	 * @return    void
	 */
	public function add_custom_meta_tags(){

		?>
		<meta name="post-id" content="<?php echo get_the_ID(); ?>"  />
		<base target="_blank">
		<?php

	}



	/**
	 * Generate element page models and localize it for builder
	 *
	 * @since     0.1.0
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
	 * @since   0.1.0
	 * @access  private
	 * @return  void
	 */
	private function localize_builder_param(){

		$builder_value = array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'alertIconUrl'  => KARMA_BUILDER_URL . '/builder/media/alerticon.png'
		);

		wp_localize_script( $this->plugin_name, 'builderParams', json_encode( $builder_value ) );

	}

	/**
	 * Localize each element info
	 *
	 * @since   0.1.0
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
	 * @since     0.1.0
	 * @return    void
	 */
	private function send_elements_map(){

		$elements_map = json_encode( $this->core->element_map() );
		wp_localize_script( $this->plugin_name, 'builderMaps', $elements_map );

	}

	/**
	 * localize elements gizmo for builder
	 *
	 * @since     0.1.0
	 * @return    void
	 */
	private function send_elements_gizmo(){

		$elements_gizmo = json_encode( $this->core->element_gimzo() );
		wp_localize_script( $this->plugin_name, 'builderGizmo', $elements_gizmo );

	}

	/**
	 * Send localize value in front end
	 *
	 * @since     0.1.0
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
	 * @param 	array	$attr	The attribute of element
	 *
	 * @since     0.1.0
	 * @return    string	the correct html source for builder
	 */
	public function create_builder_element_model( $output, $tag, $attr ){

		if ( ! $this->is_karma_shortcode( $tag ) ) {
			return $output;
		}

		$shortcode_info = array(
			'shortcode_name' 	=> $tag,
			'attributes'		=> $attr,
			'output'			=> $output,
		);

		$attr = $this->add_default_attributes( $tag, $attr );
		$element_name = str_replace( '_', '-', $tag );
		$classes = apply_filters( 'karma/elements/' . $tag . '/classes', array(), $attr );
		if( 'karma-section' != $element_name && 'karma-column' != $element_name ){
			$output = "<div class='karma-element-content' >"
			. $output
			.'</div>';
		}

		$classes = implode( ' ', $classes );
		if ( "karma-column" == $element_name ) {
			$classes .= ' karma-col-sm-' . $attr['sm_size'] . ' karma-col-md-' . $attr['md_size'] . ' karma-col-lg-' . $attr['lg_size'] . ' karma-col-xl-' . $attr['xl_size'];
		}
		if ( isset( $attr['elementalign'] ) ) {
			$classes .= ' karma-element-alignment-'. $attr['elementalign'];
		}
		$karma_builder_output = "<div id=\"{$element_name}-{$shortcode_info['attributes']['element_key']}\""
			. "class=\"karma-builder-element $classes\" "
			. " data-element-key=\"{$shortcode_info['attributes']['element_key']}\" "
			. " data-name=\"{$tag}\" >"
			. $output
			.'</div>' ;
		$shortcode_info['output'] = $karma_builder_output;
		do_action( 'karma_after_shortcode_apply_' . $tag, $shortcode_info );
		return $karma_builder_output;

	}

	/**
	 * Render assets
	 *
	 * @param	string	$output	Html source of each element
	 * @param	string	$tag	The name of element
	 * @param 	array	$attr	The attribute of element
	 *
	 * @since     0.1.0
	 * @return    string	the correct html source for builder
	 */
	public function render_assets( $output, $tag, $attr ){

		if ( ! $this->is_karma_shortcode( $tag ) ) {
			return $output;
		}
		$shortcode_info = array(
			'shortcode_name' 	=> $tag,
			'attributes'		=> $attr,
			'output'			=> $output,
		);
		$shortcode_info[ 'attributes' ] = $this->add_default_attributes( $tag, $attr );
		do_action( 'karma/before/shortcode/apply/' . $tag, $shortcode_info );
		return $output;

	}

	/**
	 * Check is karma shortcode or not
	 *
	 * @param    string $tag shortcode tag
	 *
	 * @since     2.0
	 * @return    boolean    true if shortcode is karma type
	 */
	public function is_karma_shortcode( $tag ) {

		if ( 0 === strpos( $tag, 'karma_' ) ) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Check element attributes and add default values if attribute is not exist
	 *
	 * @param	string	$element_name		element name
	 * @param	array	$element_attributes	element attributes
	 *
	 * @since 0.1.0
	 *
	 * @return array - The group of attributes of element
	 */
	private function add_default_attributes( $element_name, $element_attributes ) {

		$element_class_name = Karma_Factory_Pattern::$builder->get_element_valid_name( $element_name );
		$element_class_name = '\\KarmaBuilder\Elements\\' . $element_class_name;
		$default_attributes = $element_class_name::get_element_default_attributes();
		$atributes = array_merge( $default_attributes, $element_attributes );

		return $atributes;

	}



}
