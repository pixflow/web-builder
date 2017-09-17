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

        $models = json_decode( stripslashes( $models ),true );

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
