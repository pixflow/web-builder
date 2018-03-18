<?php
namespace KarmaBuilder\Core ;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;

/**
 * The file that defines the builder core class
 *
 * A class definition that includes base attributes and functions of a builder
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * builder core class.
 *
 * This includes base attributes and functions of a builder.
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Core{

	/**
	 * A static variable that contains an instance of Karma_Builder_Core builder
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      Karma_Builder_Core    $instance    The reference to *Singleton* instance of this class.
	 */
	private static $instance;


	/**
	 * The element attributes regex.
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $shortcode_attr_pattern	The regex pattern for get the element attributes.
	 */
	protected $shortcode_attr_pattern = '/([\w-]+)\s*=\s*\'((.|\')*?)(?<!\\\\)\'|([\w-]+)\s*=\s*"((.|\")*?)(?<!\\\\)"|([\w-]+)\s*=\s*([^\s\'"]+)(?:\s|$)/s';


	/**
	 * It is an array that contains element models
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      array    $models    element models.
	 */
	protected $models;

	/**
	 * It is an array that contains used elements in the content of post
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      array    $used_shortcodes    used shortcodes in content.
	 */
	protected $used_shortcodes;

	/**
	 * It contains content of a shortcode like : [shortcode]*Content*[/shortcode]
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      string    $content    shortcodes content.
	 */
	protected $content = '';

	/**
	 * Returns the *Singleton* instance of this class.
	 *
	 * @access   public
	 * @return   Karma_Builder_Core - The *Singleton* instance.
	 * @since    0.1.0
	 */
	public static function get_instance() {

		if ( null === Karma_Builder_Core::$instance ) {
			Karma_Builder_Core::$instance = new Karma_Builder_Core();
		}

		return Karma_Builder_Core::$instance;

	}

	/**
	 * Private clone method to prevent cloning of the instance of the
	 * *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    0.1.0
	 */
	private function __clone(){}

	/**
	 * Private unserialize method to prevent unserializing of the *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    0.1.0
	 */
	private function __wakeup(){}

	/**
	 * Karma constructor.
	 */
	protected function __construct(){

	}

	/**
	 * Retrieve the shortcode regular expression for searching.
	 *
	 * The regular expression combines the shortcode tags in the regular expression
	 *
	 *
	 * @param string $shortcode_name The name of shortcode
	 *
	 * @since 0.1.0
	 *
	 * @return string The shortcode search regular expression
	 */
    private function get_shortcode_regex( $shortcode_name ){

    	return  '/\[(\[?)(' . $shortcode_name . ')(?![\w-])([^\]\/]*(?:\/(?!\])[^\]\/]*)*?)(?:(\/)\]|\](?:([^\[]*+(?:\[(?!\/\2\])[^\[]*+)*+)\[\/\2\])?)(\]?)/';
    	
	}

	/**
	 * check the shortcode have any child or not
	 *
	 *
	 * @param string	$shortcode_content	Shortcode content
	 *
	 * @since 0.1.0
	 *
	 * @return boolean	true if any childes found otherwise return false
	 */
	private function is_parent_shortcode( $shortcode_content ){

		if ( preg_match('/(\[\/.*?])/' , $shortcode_content ) ){
			return true ;
		}else{
			return false;
		}

	}

	/**
	 * Convert the list of Element to their models
	 *
	 *
	 * @param string	$content	Element string
	 * @param string	$parent_key	Contain the id of parent Element for any child ( default = 0 )
	 *
	 * @since 0.1.0
	 *
	 * @return array - model of Element
	 */
    public function parse_shortcodes( $content, $parent_key = '' ){

		preg_match_all( $this->get_shortcode_regex('.*?'), $content, $shortcodes );
		$index = 0;
		$models = array();
		foreach ( $shortcodes[0] as $shortcode ){
			$is_parent = false;
			$model = $this->parse_shortcode( $shortcode );
			$id = $model['element_key'];
			if( ! $this->is_parent_shortcode(  $shortcodes[5][$index] ) ){
				$model['shortcode_content'] = $shortcodes[5][$index];
			}else{
				unset( $model['shortcode_content'] );
				$is_parent = true;
			}
			$model['parent_key'] = $parent_key;
			$model = $this->order_shortcode( $model );
			$models[] = $model;
			if( $is_parent ){
				$models = array_merge( $models, $this->parse_shortcodes( $shortcodes[5][$index], $id ) );
			}
			$index++;

		}

		return $models;

	}

	/**
	 * Order the shortcodes by parent and child
	 *
	 *
	 * @param array 	$model 		Contain the model of current element
	 *
	 * @since 0.1.0
	 *
	 * @return array - new model of element given with order attribute
	 */
	private function order_shortcode( $model ){

		static $order;
		$order[ $model['parent_key'] ] = isset( $order[ $model['parent_key'] ] ) ? $order[ $model['parent_key'] ] : 1;
		$model['order'] = $order[ $model['parent_key'] ] ;
		$order[ $model['parent_key'] ]++;

		return $model;

	}

	/**
	 * Convert element attributes to array model
	 *
	 * If there are no element tags defined, then the function will be returned
	 * false without any filtering.
	 *
	 * @param string	$element_attributes	Element string
	 *
	 * @since 0.1.0
	 *
	 * @return mixed - model of element or false if element syntax is incorrect
	 */
	public function parse_shortcode( $element_attributes ) {

		if ( ! $this->validate_shortcode_syntax( $element_attributes ) ){
			return false;
		}

		$shortcode_models = array();
		$pattern = $this->get_shortcode_regex('.*?');
		preg_match_all( $pattern , $element_attributes , $matches );
		$shortcode_models["shortcode_name"] = $matches[2][0];
		$shortcode_models["shortcode_attributes"] = $this->get_element_attributes( $matches[3][0] );
		$shortcode_models[ "shortcode_attributes" ] = $this->add_default_attributes( $shortcode_models[ "shortcode_name" ], $shortcode_models[ "shortcode_attributes" ] );
		$shortcode_models['shortcode_content'] = $matches[5][0];
		$shortcode_models['element_key'] = $shortcode_models["shortcode_attributes"]['element_key'];
		unset( $shortcode_models["shortcode_attributes"]['element_key'] );
		return $shortcode_models;

	}


	/**
	 * Combine the attributes and values of element
	 *
	 *
	 * @param array	$matches attributes of shortcodes
	 *
	 * @since 0.1.0
	 *
	 * @return array - that contains the attributes and values of element
	 */
	private function merge_attributes_matches( $matches ){

		$attribute_list = array();
		$regex = '/(\'|")(.*?)(\'|")$/';
		foreach ( $matches[0] as $attribute ){
			$attr_data = explode( '=', trim( $attribute ) );
			$attr_data[1] = stripslashes( preg_replace( $regex, '$2', $attr_data[1] ) );
			$attribute_list[ $attr_data[0] ] = $attr_data[1] ;
		}
		return $attribute_list;

	}

	/**
	 * Get all element attributes with their values
	 *
	 * If the function dose not found any attribute return empty array
	 *
	 * @param string    $element_attributes element string
	 *
	 * @since 0.1.0
	 *
	 * @return array - The group of attributes of element
	 */
	private function get_element_attributes( $element_attributes ){

		preg_match_all( $this->shortcode_attr_pattern , $element_attributes, $matches );
		if( $matches ) {
			return $this->merge_attributes_matches($matches);
		}else{
			return array();
		}

	}

	/**
	 * Check element attributes and add default values if attribute is not exist
	 *
	 * @param   string  $element_name       element name
	 * @param   array   $element_attributes element attributes
	 *
	 * @since 0.1.0
	 *
	 * @return  array    The group of attributes of element
	 */
	public function add_default_attributes( $element_name, $element_attributes ) {

		$element_class_name = Karma_Factory_Pattern::$builder->get_element_valid_name( $element_name );
		$element_class_name = '\\KarmaBuilder\Elements\\' . $element_class_name;
		$default_attributes = $element_class_name::get_element_default_attributes();
		$atributes = array_merge( $default_attributes, $element_attributes );

		return $atributes;

	}

	/**
	 * convert all part's of array to uppercase
	 *
	 * @param   string  $name       value of array
	 *
	 * @since 0.1.0
	 *
	 * @return string
	 */
	private function create_validate_element_name( $name ){

		return ucfirst( $name );

	}

	/**
	 * Check the element format
	 *
	 *
	 * @param string	$element_attributes	element string
	 *
	 * @since 0.1.0
	 *
	 * @return boolean - false if element format is incorrect and true if is correct
	 */
	private function validate_shortcode_syntax( $element_attributes ){

		if ( false === strpos( $element_attributes  , '[' )
			|| false === strpos( $element_attributes  , ']' ) ) {
			return false;
		}

		if ( empty( $element_attributes )
			|| is_array( $element_attributes ) ){
			return false;
		}

		return true;

	}

	/**
	 * Prepare content from models
	 *
	 * @param array $models - element models
	 *
	 * @return string - content of the page by element tags
	 * @since 0.1.0
	 */
	public function generate_post_content( $models ) {

		// Build Parent & childes tree
		$models = $this->build_models_tree( $models );

		// Sort models by order
		$this->sort_models_by_order( $models );
		// Generate Content
		$content = $this->convert_model_to_shortcode_pattern( $models );

		return $content;

	}

	/**
	 * Build multidimensional array of parent and children
	 *
	 * @param 	array	$models - element models
	 * @param	string  $parent_key - parent model key
	 *
	 * @return array - array of element models tree
	 * @since 0.1.0
	 */
	protected function build_models_tree( array &$models, $parent_key = '' ) {

		$tree = array();

		foreach ( $models as $model ) {

			if ( $model['parent_key'] === $parent_key && ( ! isset( $model['status'] )
					|| 'processed' !== $model['status'] ) ) {
				$children = $this->build_models_tree( $models, $model['element_key'] );
				if ( $children ) {
					$model['children'] = $children;
				}
				$tree[ $model['order'] ] = $model;
				$model['status'] = 'processed';
			}
		}
		
		return $tree;

	}

	/**
	 * Sort Models by order
	 *
	 * @param array $models - element models
	 *
	 * @return void
	 * @since 0.1.0
	 */
	protected function sort_models_by_order( &$models ) {

		foreach ( $models as &$value ) {

			if ( isset( $value['children'] ) ){
				$this->sort_models_by_order( $value['children'] );
			}

		}

		usort( $models , array( $this, 'compare_orders' ));

	}

	/**
	 * compare order of two arrays
	 *
	 * @param array $first_model - element model
	 * @param array $second_model - element model
	 *
	 * @return integer
	 * @since 0.1.0
	 */
	private function compare_orders( $first_model, $second_model ) {

		if ( $first_model['order'] == $second_model['order'] ) {
			return 0;
		}

		return ( $first_model['order'] < $second_model['order'] ) ? -1 : 1;

	}

	/**
	 * convert element models with WordPress element pattern
	 *
	 * @param array $models - element models
	 *
	 * @return string - element string pattern of model
	 * @since 0.1.0
	 */
	protected function convert_model_to_shortcode_pattern( $models ){

		$content = '';
		foreach( $models as $model ) {

			$shortcode_name = trim( $model['shortcode_name'] );
			$shortcode_key = ' element_key="' . $model['element_key']. '"';
			$shortcode_attributes = '';

			if( isset( $model['shortcode_attributes'] ) && 0 !== count( $model['shortcode_attributes'] ) ) {
				foreach( $model['shortcode_attributes'] as $attribute_name => $attribute_value ){
					$delimiter = '"';
					if( is_integer( $attribute_value ) ){
						$delimiter = '';
					}
					$shortcode_attributes .= $attribute_name . '=' . $delimiter .  str_replace('"', '\"', $attribute_value ) . $delimiter .' ';
				}
				$shortcode_attributes = ' ' . trim( $shortcode_attributes );
			}

			$content .= '[' . $shortcode_name . $shortcode_key . $shortcode_attributes .']';

			if( isset( $model['children'] ) && is_array( $model['children'] ) ){
				$content .= $this->convert_model_to_shortcode_pattern( $model['children'] );
			}

			$shortcode_content = ( isset( $model['shortcode_content'] ) ) ? $model['shortcode_content'] : '';

			if($shortcode_content != ''){
				$content .= $shortcode_content;
			}

			$content .= '[/' . $shortcode_name . ']';
		}
		return $content;

	}

	/**
	 * Save post content to database and change post status to draft
	 *
	 * @param   array		$models - element models
	 * @param   integer     $post_id - post/page ID
	 *
	 * @return boolean
	 * @since 0.1.0
	 */
	public function save_post( $models, $post_id ) {

		if ( $this->switch_post_status( 'draft', $post_id ) ) {
			$this->save_post_content( $models, $post_id );
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Save post content to database and change post status to publish
	 *
	 * @param   array		$models - element models
	 * @param   integer     $post_id - post/page ID
	 *
	 * @return boolean
	 * @since 0.1.0
	 */
	public function publish_post( $models, $post_id ) {

		if ( $this->switch_post_status( 'publish', $post_id ) ) {
			$this->save_post_content( $models, $post_id );
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Switch post status between published & draft
	 *
	 * @param   string  $new_status - new status of post (publish or draft)
	 * @param   integer $post_id - post/page ID
	 *
	 * @return boolean
	 * @since 0.1.0
	 */
	public function switch_post_status( $new_status, $post_id ) {

		$current_status = get_post_status( $post_id );
		if ( $current_status == $new_status ) {
			return true;
		}
		$post = array(
			'ID'          => $post_id,
			'post_status' => $new_status,
		);
		wp_update_post( $post );
		if ( is_wp_error( $post_id ) ) {
			return false;
		} else {
			return true;
		}

	}

	/**
	 * Save content of page/post to the database
	 * Use the code below for error handling on line 496
	 * $errors = $post_id->get_error_messages();
	 *
	 * NOTE: If the meta_value passed to update_post_meta() function is the same as the value that is already in the database,
	 * this function returns false.
	 *
	 * @param array		$models - element models
	 * @param integer	$id - post/page ID
	 *
	 * @return boolean returns true on success and false on failure.
	 * @since 0.1.0
	 */
	public function save_post_content( $models, $id ) {

		$post_content = $this->generate_post_content( $models );
		$post_content = Karma_Helper_Utility::karma_save_external_images( $post_content );
		$post_content = str_replace( '\\', '\\\\', $post_content );
		if ( update_post_meta( $id, 'karma_post_content', $post_content ) ){
			return true;
		} else {
			return false;
		}

	}


	/**
	 * Map element
	 *
	 * @since 0.1.0
	 * @return array - array of elements map
	 */
	public function element_map() {

		$elements_map = array();
		$elements_map = apply_filters( 'karma/elements/all/map', $elements_map );
		return $elements_map;

	}

	/**
	 * Gizmo element
	 *
	 * @since 0.1.0
	 * @return array - array of elements gizmo
	 */
	public function element_gimzo() {

		$elements_gizmo = array();
		$elements_gizmo = apply_filters( 'karma/elements/all/gizmo', $elements_gizmo );
		return $elements_gizmo;

	}

	/**
	 * Element info
	 *
	 * @since 0.1.0
	 * @return array - array of elements gizmo
	 */
	public function element_info() {

		$elements_info = array();
		$elements_info = apply_filters( 'karma/elements/all/element_info', $elements_info );
		return $elements_info;

	}

}
