<?php
/**
 * The file that defines the builder core class
 *
 * A class definition that includes base attributes and functions of a builder
 *
 * @link       http://pixflow.net
 * @since      1.0.0
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
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Core{

	/**
	 * A static variable that contains an instance of Karma_Builder_Core builder
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      Karma_Builder_Core    $instance    The reference to *Singleton* instance of this class.
	 */
	private static $instance;


	/**
	 * The element attributes regex.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $shortcode_attr_pattern	The regex pattern for get the element attributes.
	 */
	protected $shortcode_attr_pattern = '/([\w-]+)\s*=\s*\'((.|\')*?)(?<!\\\\)\'|([\w-]+)\s*=\s*"((.|\")*?)(?<!\\\\)"|([\w-]+)\s*=\s*([^\s\'"]+)(?:\s|$)/s';


	/**
	 * It is an array that contains element models
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $models    element models.
	 */
	protected $models;

	/**
	 * It is an array that contains used elements in the content of post
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
	 * @return   Karma_Builder_Core - The *Singleton* instance.
	 * @since    1.0.0
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
	 * @since 1.0.0
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
	 * @since 1.0.0
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
	 * @since 1.0.0
	 *
	 * @return array - model of Element
	 */
    public function parse_shortcodes( $content, $parent_key = '' ){

		static $child_order =  1 ;
		static $parent_order = 1 ;
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
			$shortcode_order = $this->order_shortcode( $model, array( 'child_order' => $child_order , 'parent_order' => $parent_order ), $parent_key );
			list( $model, $child_order, $parent_order ) = $shortcode_order;
			$model['parent_key'] = $parent_key;
			$models[] = $model;
			if( $is_parent ){
				$models = array_merge( $models, $this->parse_shortcodes( $shortcodes[5][$index], $id ) );
				$child_order = 1 ;
			}
			$index++;

		}

		return $models;

	}

	/**
	 * Order the shortcodes by parent and child
	 *
	 *
	 * @param array 	$model 		Contain the model of current shortcode
	 * @param array		$order 		current index of child and parent
	 * @param integer 	$parent_key	current index of parent id
	 *
	 * @since 1.0.0
	 *
	 * @return array - new model of shortcode given with order attribute
	 */
	private function order_shortcode( $model, $order, $parent_key ){

		if( '' != $parent_key ){
			$model['order'] = $order['child_order'] ;
			$order['child_order']++;
		}else{
			$model['order'] = $order['parent_order'] ;
			$order['parent_order'] ++ ;
		}

		$result = array( $model, $order['child_order'], $order['parent_order']);
		return $result;

	}

	/**
	 * Convert element attributes to array model
	 *
	 * If there are no element tags defined, then the function will be returned
	 * false without any filtering.
	 *
	 * @param string	$element_attributes	Element string
	 *
	 * @since 1.0.0
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
		$shortcode_models["shortcode_attributes"] = $this->get_shortcode_attributes( $matches[3][0] );
		$shortcode_models['shortcode_content'] = $matches[5][0];
		$shortcode_models['element_key'] = $shortcode_models["shortcode_attributes"]['element_key'];
		unset( $shortcode_models["shortcode_attributes"]['element_key'] );
		return $shortcode_models;

	}

	/**
	 * Remove empty values
	 *
	 * It s call back function for array_filter function that used in merge_attributes_matches and
	 * avoid of delete false boolean type
	 *
	 * @param string - $value - value of current index in array
	 *
	 * @since 1.0.0
	 *
	 * @return string - correct value
	 */
	private function remove_empty_value( $value ){
		return $value !== "";
	}


	/**
	 * Combine the attributes and values of shortcode
	 *
	 *
	 * @param array	$matches attributes of shortcodes
	 *
	 * @since 1.0.0
	 *
	 * @return array - that contains the attributes and values of shortcode
	 */
	private function merge_attributes_matches( $matches ){
		$first_group_attributes = array_filter( $matches[1] ,array($this, 'remove_empty_value') );
		$second_group_attributes = array_filter( $matches[4] ,array($this, 'remove_empty_value') );
		$third_group_attributes = array_filter( $matches[7] ,array($this, 'remove_empty_value') );
		$all_group_attribute = array_merge( $first_group_attributes , $second_group_attributes , $third_group_attributes );
		$first_group_value =  array_filter( $matches[2] ,array($this, 'remove_empty_value') );
		$second_group_value =  array_filter( $matches[5] ,array($this, 'remove_empty_value') );
		$third_group_value =  array_filter( $matches[8] ,array($this, 'remove_empty_value') );
		$all_group_value = array_merge( $first_group_value, $second_group_value, $third_group_value );
		$result = array(
			'attributes' => $all_group_attribute,
			'values' => $all_group_value
		);
		return $result;
	}

	/**
	 * Get all shortcode attributes with their values
	 *
	 * If the function dose not found any attribute return empty array
	 *
	 * @param string	$shortcode_attributes	Shortcode string
	 *
	 * @since 1.0.0
	 *
	 * @return array - The group of attributes of shortcode
	 */
	private function get_shortcode_attributes( $shortcode_attributes ){

		$atts = array();
		preg_match_all( $this->shortcode_attr_pattern , $shortcode_attributes , $matches );

		if( $matches ){
			$shortcode_group_attribute = $this->merge_attributes_matches( $matches );
			for( $count = 0 ; $count < count( $shortcode_group_attribute['attributes'] ); $count++ ){
				$atts[ $shortcode_group_attribute['attributes'][ $count ] ] =  stripslashes( $shortcode_group_attribute['values'][ $count ] );
			}
		}
		return $atts;

	}

	/**
	 * Check the element format
	 *
	 *
	 * @param string	$element_attributes	element string
	 *
	 * @since 1.0.0
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
	 * @since 1.0.0
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
	 * @since 1.0.0
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
	 * @since 1.0.0
	 */
	protected function sort_models_by_order( &$models ) {

		foreach ( $models as &$value ) {

			if ( is_array( $value ) ){
				$this->sort_models_by_order($value);
			}

		}

		ksort( $models );

	}

	/**
	 * convert element models with WordPress element pattern
	 *
	 * @param array $models - element models
	 *
	 * @return string - element string pattern of model
	 * @since 1.0.0
	 */
	protected function convert_model_to_shortcode_pattern( $models ){

		$content = '';
		foreach( $models as $model ) {

			$shortcode_name = trim( $model['shortcode_name'] );
			$shortcode_attributes = '';

			if( isset( $model['shortcode_attributes'] ) ) {
				foreach( $model['shortcode_attributes'] as $attribute_name => $attribute_value ){
					$shortcode_attributes .= $attribute_name . '="' . str_replace('"', '\"', $attribute_value ) . '" ';
				}
			}

			$shortcode_attributes = trim( $shortcode_attributes );
			$content .= '[' . $shortcode_name . ' element_key="' . $model['element_key']. '" ' . $shortcode_attributes .']';

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
	 * Save content of page/post to the database
	 * Use the code below for error handling on line 496
	 * $errors = $post_id->get_error_messages();
	 *
	 * @param array		$models - element models
	 * @param integer	$id - post/page ID
	 *
	 * @return boolean
	 * @since 1.0.0
	 */
	public function save_post_content( $models, $id ) {

		$post_content = $this->generate_post_content( $models );
		$post_content = str_replace( '\\', '\\\\', $post_content );
		$current_item = array(
			'ID'           => $id,
			'post_content' => $post_content,
		);
		$post_id = wp_update_post( $current_item, true );
		if ( is_wp_error( $post_id ) ) {
			return false;
		}else{
			return true;
		}

	}

	/**
	 * Generate static JS and CSS for each page based on their shortcodes after publish
	 *
	 * @param $id - Page ID
	 *
	 * @return boolean
	 * @since 1.0.0
	 */
	public function generate_static_js_css( $id ){
		return true;
	}

	/**
	 * Map element
	 *
	 * @since 1.0.0
	 * @return array - array of elements map
	 */
	public function element_map() {

		$elements_map = array();
		$elements_map = apply_filters( 'karma_elements_map', $elements_map );
		return $elements_map;

	}

	/**
	 * Gizmo element
	 *
	 * @since 1.0.0
	 * @return array - array of elements gizmo
	 */
	public function element_gimzo() {

		$elements_gizmo = array();
		$elements_gizmo = apply_filters( 'karma/elements/gizmo', $elements_gizmo );
		return $elements_gizmo;

	}

}
