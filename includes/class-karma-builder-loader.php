<?php

/**
 * Register all actions and filters for the plugin
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 */

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Pixity_Builder_Loader {


	/**
	 * The Core that's core of the builder
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Pixity_Builder_Core    $core    Core of the builder.
	 */
	public $core;

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      Pixity_Builder_Loader    $plugin_name    The name of plugin
	 */
	public $plugin_name;


	/**
	 * Define the core functionality of the builder.
	 *
	 * Set the plugin name that can be used throughout the plugin.
	 * Load the dependencies, and set the hooks for builder.
	 *
	 * @since    1.0.0
	 */
	public function __construct( $plugin_name ) {

		$this->plugin_name = $plugin_name ;
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
	private function load_core() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-karma-builder-core.php';
		$this->core = Pixity_Builder_Core::get_instance();

	}


	/**
	 * Define the builder functionality and set hook and action for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	public function load_builder(){

		if( $this->is_in_iframe() ){
			// Don't display the admin bar when in live editor mode
			add_filter( 'show_admin_bar', '__return_false' );
			$this->generate_page_model();
			add_filter( 'do_shortcode_tag', array( $this, 'create_builder_element_model' ), 10, 3 );
			add_action( 'wp_head', array( $this, 'add_custom_meta_tags' ) );
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
	 * Generate shortcode page models and localize it for builder
	 *
	 * @since     1.0.0
	 * @return    void
	 */
	private function generate_page_model(){

		$page_id = get_the_id();
		$post_object = get_post ( $page_id );
		$content = $post_object->post_excerpt;
		$page_model = json_encode( $this->core->parse_shortcodes( $content ) );
		wp_localize_script( $this->plugin_name, 'builder_models', $page_model );

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


}
