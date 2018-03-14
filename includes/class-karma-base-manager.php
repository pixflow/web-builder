<?php
namespace KarmaBuilder\BaseManager ;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Silence is golden.
}


/**
 * Register all method and property for manage different actions in builder.
 *
 * @link       http://pixflow.net
 * @since      2.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Register all method and property for manage different actions in builder.
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */

abstract class Karma_Base_Manager{

	/**
	 * The List of page that support by karma-builder.
	 *
	 * @since    2.0
	 * @var      Karma_Base_Manager    default_page_support    List of page support.
	 */
	CONST default_page_support = array( 'page', 'post' );

	/**
	 * Initialize canvas and template
	 *
	 * @since     2.0
	 * @return    void
	 */
	public function init_templates(){

		$this->add_page_support();
		$this->register_page_templates();
		add_filter( 'template_include', array( $this, 'load_template' ) );

	}

	/**
	 * Load the content of karma simple template if it choose by user.
	 *
	 * @param string $template The name of template of current page
	 *
	 * @since     2.0
	 * @return    string Path of karma-simple-template
	 */
	public function load_template( $template ) {

		if ( is_singular() ) {
			$page_template = get_post_meta( get_the_ID(), '_wp_page_template', true );
			if ( 'karma-simple-template' === $page_template ) {
				$template = KARMA_BUILDER_DIR . '/builder/page-templates/simple-template.php';
			}
		}

		return $template;

	}

	/**
	 * Add karma support to pages.
	 *
	 * @since     2.0
	 * @return    void
	 */
	protected function add_page_support(){

		// Get more post support by user for future
		$karma_page_support_list = $this::default_page_support;
		foreach ( $karma_page_support_list as $page_slug ) {
			add_post_type_support( $page_slug, 'karma-builder' );
		}

	}

	/**
	 * Add our canvas to list of page templates in Wordpress dashboard.
	 *
	 * @param array $templates_list List of templates
	 *
	 * @since     2.0
	 * @return    array The list of new templates
	 */
	public function add_page_templates( $templates_list ){

		$post_templates = array (
				'karma-simple-template' => __( 'karma simple template' , 'karma' ),
		);

		return $post_templates + $templates_list;

	}

	/**
	 * Add karma-simple-template to pages that support by builder.
	 *
	 * @since     2.0
	 * @return    void
	 */
	protected function register_page_templates(){

		$post_types = get_post_types_by_support( 'karma-builder' );

		foreach ( $post_types as $post_type ) {
			add_filter( "theme_{$post_type}_templates", array( $this, 'add_page_templates' ), 10, 4 );
		}

	}

	/**
	 * Add custom button in admin bar.
	 * @param object $wp_admin_bar word press admin bar
	 *
	 * @since     2.0
	 * @return    void
	 */
	public function karma_custom_toolbar_link( $wp_admin_bar ){
		$builder_url =  get_permalink();
		$karma_edit_button = array(
				'id' => 'karma_customizer_button',
				'title' => __('Edit With Karma', 'karma'),
				'href' => ( $builder_url == strtok( $builder_url, '?' ) ) ? $builder_url . '?load_builder=true' : $builder_url . '&load_builder=true',
		);
		$karma_add_new_button = array(
				'id' => 'karma_customizer_add_new_button',
				'title' => __('Add New', 'karma'),
				'href' => ( $builder_url == strtok( $builder_url, '?' ) ) ? $builder_url . '?builder-page=karma-page-manager' : $builder_url . '&builder-page=karma-page-manager',
		);

		if ( ! is_admin() ) {
			$wp_admin_bar->add_node( $karma_edit_button );
			$wp_admin_bar->add_node( $karma_add_new_button );
		}
	}


}

