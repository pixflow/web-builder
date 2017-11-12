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
		if( $builder::is_in_builder() ){
			/** Read the content from post meta */
			add_filter( 'the_content',  array( $this, 'change_the_content' ), -1 );
			// Don't display the admin bar when in live editor mode
			add_filter( 'show_admin_bar', '__return_false' );
			add_filter( 'do_shortcode_tag', array( $this, 'create_builder_element_model' ), 10, 3 );
			add_action( 'wp_head', array( $this, 'add_custom_meta_tags' ) );
			add_action( 'wp_head', array( $this, 'load_builder_js_templates' ) );
		}
		$this->init_elements();

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

		$karma_views = Karma_Factory_Pattern::$builder_views;
		$controller = Karma_Factory_Pattern::$builder_controller;
		$karma_views->load_elements_setting_panel();
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
		do_action( 'karma_before_shortcode_apply_' . $tag, $shortcode_info );
		$classes = apply_filters( 'karma_builder/elements/' . $tag . '/classes', array(), $attr );
		$classes = implode( ' ',$classes );
		$karma_builder_output = "<div class=\"karma-builder-element $classes\" data-element-key=\"{$shortcode_info['attributes']['element_key']}\" data-name=\"{$tag}\" >"
			. $output
			. '</div>' ;
		$shortcode_info['output'] = $karma_builder_output;
		do_action( 'karma_after_shortcode_apply_' . $tag, $shortcode_info );
		return $karma_builder_output;

	}

}
