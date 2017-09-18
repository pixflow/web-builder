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
	 * The shortcode attributes regex.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $shortcode_attr_pattern	The regex pattern for get the shortcode attributes.
	 */
    protected $shortcode_attr_pattern = '/([\w-]+)\s*=\s*\'((.|\')*?)(?<!\\\\)\'|([\w-]+)\s*=\s*"((.|\")*?)(?<!\\\\)"|([\w-]+)\s*=\s*([^\s\'"]+)(?:\s|$)/s';


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
	 * Convert the list of shortcodes to their models
	 *
	 *
	 * @param string	$content	Shortcode string
	 * @param integer	$parent_id	Contain the id of parent shortcode for any child ( default = 0 )
	 *
	 * @since 1.0.0
	 *
	 * @return array - model of shortcodes
	 */
    public function parse_shortcodes( $content, $parent_id = 0 ){

		static $id = 0;
		preg_match_all( $this->get_shortcode_regex('.*?'), $content, $shortcodes );
		$index = 0;
		$models = array();
		foreach ( $shortcodes[0] as $shortcode ){
			$is_parent = false;
			$id++;
			$model = $this->parse_shortcode( $shortcode );
			$model['shortcode_id'] = $id;
			if( ! $this->is_parent_shortcode(  $shortcodes[5][$index] ) ){
				$model['shortcode_content'] = $shortcodes[5][$index];
			}else{
				unset($model['shortcode_content']);
				$is_parent = true;
			}
			$model['parent_id'] = $parent_id;
			$models[] = $model;
			if( $is_parent ){
				$models = array_merge($models, $this->parse_shortcodes( $shortcodes[5][$index], $id ));
			}
			$index++;

		}
		return $models;

	}

	/**
	 * Convert shortcode attributes to array model
	 *
	 * If there are no shortcode tags defined, then the function will be returned
	 * false without any filtering.
	 *
	 * @param string	$shortcode_attributes	Shortcode string
	 *
	 * @since 1.0.0
	 *
	 * @return mixed - model of shortcode or false if shortcode syntax is incorrect
	 */
    public function parse_shortcode( $shortcode_attributes ) {
    	if ( ! $this->validate_shortcode_syntax( $shortcode_attributes ) ){
    		return false;
		}
		$shortcode_models = array();
		$pattern = $this->get_shortcode_regex('.*?');
		preg_match_all( $pattern , $shortcode_attributes , $matches );
    	$shortcode_models["shortcode_name"] = $matches[2][0];
		$shortcode_models["shortcode_attributes"] = $this->get_shortcode_attributes( $matches[0][0] );
		$shortcode_models['shortcode_content'] = $matches[5][0];
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
	 * Check the shortcode format
	 *
	 *
	 * @param string	$shortcode_attributes	Shortcode string
	 *
	 * @since 1.0.0
	 *
	 * @return boolean - false if shortcode format is incorrect and true if is correct
	 */
    private function validate_shortcode_syntax( $shortcode_attributes  ){

		if ( false === strpos( $shortcode_attributes  , '[' )
			|| false === strpos( $shortcode_attributes  , ']' ) ) {
			return false;
		}

		if ( empty( $shortcode_attributes )
			|| is_array( $shortcode_attributes ) ){
			return false;
		}

		return true;
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

        // Find Childes
        $models = $this->find_model_childes( $models );

        // Sort Row Models
        $models = $this->sort_row_models( $models );

        // Generate Content
        $content = '';
        foreach ($models as $id=>$model) {
            if($models[$id]['flag']){
                continue;
            }else{
                $models[$id]['flag'] = true;
            }
            $content .= $this->convert_model_to_shortcode_pattern( $models, $id );
        }

        return $content;
    }

    /**
     * Find childes model for each model and update models
     *
     * @param $models - shortcode models
     *
     * @return array - array of shortcode models that has childes index
     * @since 1.0.0
     */
    protected function find_model_childes($models ) {

        foreach ($models as $id=>$model) {
            $current_id = $id;
            $models[$id]['flag'] = false;
            $models[$id]['id'] = $id;
            // Find childes
            $childes = array();
            foreach ($models as $key2=>$model2) {
                $el = $model2;
                if(isset($el['parentId'])){
                    if($el['parentId'] == $current_id){
                        $childes[] = $key2;
                    }
                }
            }
            $models[$id]['childes'] = $this->sort_childes_models( $models, $childes );
        }
        return $models;

    }

    /**
     * Sort Childes of each model
     *
     * @param $models - shortcode models
     * @param $childes - shortcode childes models
     *
     * @return array - array of ordered childes
     * @since 1.0.0
     */
    protected function sort_childes_models( $models, $childes ) {

        $orderedChildes = array();
        $o = 1;
        // Ordering Childes
        foreach($childes as $child){
            if(array_key_exists('order', $models[$child])){
                if(isset($orderedChildes[$models[$child]['order']])){
                    $orderedChildes[++$models[$child]['order']] = $child;
                }else{
                    $orderedChildes[$models[$child]['order']] = $child;
                }
            }else{
                $orderedChildes[$o++] = $child;
            }
        }
        ksort($orderedChildes);
        return $orderedChildes;

    }

    /**
     * Sort rows model type
     *
     * @param $models - shortcode models
     *
     * @return array
     * @since 1.0.0
     */
    protected function sort_row_models( $models ) {

        $els = $models;
        $rows = array();

        // Sort Rows
        foreach($models as $key=>$item){
            if($item['type'] == 'karma_row'){
                $rows[$key] = $item['order'];
                unset($models[$key]);
            }
        }
        arsort($rows);

        foreach($rows as $key=>$item){
            $models = array($key=>$els[$key])+$models;
        }

        return $models;

    }

    /**
     * convert shortcode models with WordPress shortcode pattern
     *
     * @param $models - Shortcode models
     * @param $id - Shortcode model ID
     *
     * @return string - shortcode string pattern of model
     * @since 1.0.0
     */
    protected function convert_model_to_shortcode_pattern( $models, $id ){
        static $content = '';
        $type = trim($models[$id]['type']);
        $attr = trim($models[$id]['attr']);
        $pat = '~el_id=".*?"~s';
        $attr = trim(preg_replace($pat,'', $attr));
        $childes = $models[$id]['childes'];
        $shortcode_content = $models[$id]['content'];
        $attr = ($attr != '')?' '.$attr:$attr;
        $content .= '['.$type.$attr.']';

        if(count($childes)){
            foreach ($childes as $child) {
                if( $models[$child]['flag']){
                    continue;
                }else{
                    $models[$child]['flag'] = true;
                }
                $content .= $this->convert_model_to_shortcode_pattern( $models, $child );
            }
        }

        if($shortcode_content != ''){
            $content .= $shortcode_content;
        }

        $content .='[/'.$type.']';
        return $content;
    }

    /**
     * Save content of page/post to the database
     *
     * @param $models - shortcode models
     * @param $id - post/page ID
     *
     * @return boolean
     * @since 1.0.0
     */
    public function save_post_content( $models, $id ) {
        $post_content = $this->generate_post_content($models);
        $current_item = array(
            'ID'           => $id,
            'post_content' => $post_content,
        );
        $post_id = wp_update_post( $current_item, true );
        if (is_wp_error($post_id)) {
            $errors = $post_id->get_error_messages();
            return false;
        }else{
            return true;
        }
    }

    /**
     * replace shortcode models with WordPress shortcode pattern
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
