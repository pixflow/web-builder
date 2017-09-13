<?php
/**
 * The file that defines the builder core class
 *
 * A class definition that includes base attributes and functions of a builder
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 */

/**
 * builder core class.
 *
 * This includes base attributes and functions of a builder.
 *
 *
 * @since      1.0.0
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Pixity_Builder_Core{

	/**
	 * A static variable that contains an instance of Pixity_Builder_Core builder
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      Pixity_Builder_Core    $instance    The reference to *Singleton* instance of this class.
	 */
    private static $instance;

	/**
	 * It is an array that contains shortcode models
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $models    shortcode models.
	 */
    protected $models;

	/**
	 * It is an array that contains used shortcodes in the content of post
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $used_shortcodes    used shortcodes in content.
	 */
    protected $used_shortcodes;

	/**
	 * It contains content of a shortcode like : [shortcode]*Content*[/shortcode]
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $content    shortcodes content.
	 */
    protected $content = '';

    /**
     * Returns the *Singleton* instance of this class.
     *
	 * @access   public
     * @return   Pixity_Builder_Core - The *Singleton* instance.
     * @since    1.0.0
     */
    public static function get_instance() {
        if ( null === Pixity_Builder_Core::$instance ) {
            Pixity_Builder_Core::$instance = new Pixity_Builder_Core();
        }

        return Pixity_Builder_Core::$instance;
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
     * MBuilder constructor.
     */
    protected function __construct(){
        
    }

    /*
     * Print script for each shortcode on drop to define its map to the builder
     *
     * @param string $shortcode shortcode name
     * @return void
     */
    public static function print_shortcode_map( $shortcode ) {
        
    }

    public static function parse_shortcode( $shortcode ) {
        
    }

    /**
     * Prepare content from models
     *
     * @param $models - shortcode models
     *
     * @return string - content of the page by shortcode tags
     * @since 1.0.0
     */
    public function generate_post_content( $models ) {
        
    }

    /**
     * Save content of page/post to the database
     *
     * @param $id - post/page ID
     *
     * @return void
     * @since 1.0.0
     */
    public function save_post_content( $models, $id ) {
        
    }

    /**
     * replace shortcode models with wordpress shortcode pattern
     *
     * @param $id - Shortcode model ID
     *
     * @return void
     * @since 1.0.0
     */
    public function get_shortcode_tag( $id ) {
        
    }

    public function get_post_models( $page_id=null ) {
        
    }

	public function detect_shortcode() {

    }

	public function shortcode_map() {

    }


    /**
     * Generate static JS and CSS for each page based on their shortcodes after publish
     *
     * @param $id - Page ID
     * @param $models - Shortcode models
     *
     * @return boolean
     * @since 1.0.0
     */
    public function generate_static_js_css($id){
        return true;
    }

}
