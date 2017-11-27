<?php
/**
 * The file that defines the Image element class
 *
 * A class definition that includes base function of Image element
 *
 * @link       http://pixflow.net
 */

/**
 * Image element class.
 *
 * This includes base methods and variable that need for image element
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static $element_name = 'karma_image';

	/**
	 * Render image element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param array     $attributes   Attribute of element
	 * @param string    $content      Content of element
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			array(
				'element_key'   => 'kb' ,
				'imgurl'		=>  KARMA_BUILDER_URL . 'builder/media/defult-img.png',
				'action'        => 'none' ,
				'linkurl'       => get_site_url(),
				'linktarget'     => '_blank' ,
				'alt'        => '' ,
				'scale'			=> 'fill',
				'position'		=> 'center-center',

			)
			, $attributes
		);

		$image_extra = $this->get_image_url( $attributes );
		$scale_class = ( 'fill' == $attributes['scale'] ) ? 'karma-image-fill' : 'karma-image-real';
		ob_start();
		?>
		<div class='karma-image karma-image-<?php echo esc_attr( $attributes[ 'element_key' ] ); ?> karma-position-<?php echo $attributes[ 'position' ] ?>' >
			<div class="karma-image-container <?php echo $image_extra['class']; ?>">
				<a class="karma-image-link" href="<?php echo $image_extra['link']; ?>" target="<?php echo $attributes['linktarget']; ?> " >
					<img class="<?php echo $scale_class; ?>" src="<?php echo esc_url( $attributes[ 'imgurl' ] ); ?>" alt="<?php echo $attributes['alt']; ?>" />
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render image element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template = '<div class="karma-image karma-image-{{ data.element_key }}" >'
		               . '<div class="karma-image-container {{ data.extraclass }}">'
		               . '<a class="karma-image-link" href="{{{ data.link }}}" target="{{ data.linktarget }}" >'
		               . '<img src="" alt="{{ data.alt }}" />'
		               . '</a>'
		               . '</div>'
		               . '</div>';

		return $js_template;

	}

	/**
	 * Retrieve image element link URL.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @param array $attributes    Attribute of element
	 *
	 * @return array | false special class and URL of image
	 */
	private function get_image_url( $attributes ){

		$result = array();
		switch ( $attributes['action'] ){
			case 'none' :
				$result['class'] = 'karma-image-without-action' ;
				$result['link']  = 'javascript:void(0);' ;
				break;
			case 'link' :
				$result['class'] = 'karma-image-with-url' ;
				$result['link']  = $attributes['linkurl'] ;
				break;
			case 'popup' :
				$result['class'] = 'karma-image-popup-mode' ;
				$result['link']  = $attributes['imgurl'] ;
				break;
			default:
				return false;
				break;
		}
		return $result;

	}




	/**
	 * Register image element controls.
	 * Adds different input fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Element controls
	 */
	public function map() {

		$map = array(
			'setting-panel' => array(
				"title"	=> esc_attr__( "Image Setting", 'karma' ),
				"height" => "544",
				"params" => array(
					array(
						"name" 	=> "imgurl" ,
						"type" 	=> Karma_Builder_Setting_Panel::UPLOAD_IMAGE ,
						"label"	=> esc_attr__( "Set image", 'karma' ),
						"value"	=> "",
					),
					array(
						"name"	=> "scale",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Scale", 'karma' ),
						'value'	=> "fill",
						"field"	=> array(
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'title'	=> esc_attr__( "Real size", 'karma' ),
								'value'	=> "real",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'title'	=> "Fill",
								'value'	=> "fill",
							),
						),
						'separator' => "container",
					),
					array(
						"name"		=> 'position' ,
						"type"		=> Karma_Builder_Setting_Panel::IMAGE_POSITION,
						"label"		=> esc_attr__( "Position", 'karma' ),
						"values"	=> 'center-center',
						"separator" => "container",

					),
					array(
						"name"  	    => "action",
						"type"   	    => Karma_Builder_Setting_Panel::DROPDOWN,
						"label"  	    => esc_attr__( "Action on click", 'karma' ),
						'value'   	    => "none",
						'separator'	    => "container",
						"options"  		=> array(
							'none'   => array(
								'title' => esc_attr( 'None' , 'karma' ),
							),
							'popup'  => array(
								'title' => esc_attr( "Popup", 'karma' ),
							) ,
							'link'  => array(
								'title' => esc_attr( "Link", 'karma' ),
							),
						)
					),
					array(
						"name"			=> "linkurl",
						"type"			=> Karma_Builder_Setting_Panel::TEXT,
						"label"			=> __( "URL", 'karma' ),
						"dependency"	=> array(
								"controller"	=> "action",
								"value"			=> "link"
						)
					),
					array(
						"name"  	    => "linktarget",
						"type"   	    => Karma_Builder_Setting_Panel::DROPDOWN,
						"label"  	    => esc_attr__( "Open image on", 'karma' ),
						'value'   	    => "_blank",
						'separator'	    => "container",
						"options"  		=> array(
							'_self'   => array(
								'title' => esc_attr( 'This window' , 'karma' ),
							),
							'_blank'  => array(
								'title' => esc_attr( "New window", 'karma' ),
							) ,
						),
						"dependency"	=> array(
							"controller"	=> "action",
							"value"			=> "link"
						)
					),

					array(
						"name"			=> "alt",
						"type"			=> Karma_Builder_Setting_Panel::TEXT,
						"label"			=> __( "Alt", 'karma' ),
						"group"			=> "Advance option"
					),
				),
			),
		);


		parent::$elements_map[ self::$element_name ] = $map;
		return parent::$elements_map;

	}

	/**
	 * Set the gizmo controller
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return    array    Gizmo controller of all elements
	 */
	public function gimzo_controllers() {

		$controllers = array(
				array(
						"type"		=> "outerGizmo",
						"className"	=> "image-gizmo-group",
						"params"	=> array(
								array(
										'type'		=> 'simpleIcon',
										'form'		=> 'more-panel',
										"params"	=> array(
												'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
												'className'	=> 'karma-image-more-setting',
										)
								),
								array(
										'type'		=> 'simpleIcon',
										'form'		=> 'animation-panel',
										"params"	=> array(
												'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/animation.svg' ),
												'className'	=> 'karma-image-animation-layout',
										)
								),
								array(
										'type'		=> 'simpleIcon',
										'className'	=> 'karma-image-setting-layout',
										'form'		=> 'setting-panel',
										"params"	=> array(
												'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting.svg' ),


										)
								),
								array(
										'type'		=> 'simpleText',
										'form'		=> 'background-panel',
										'className'	=> 'karma-image-background-setting',
										'params'	=> array(
												'value'		=> esc_attr( 'Change Image', 'karma' ),
										)


								),
						)
				),
		);

		parent::$elements_gizmo[ self::$element_name ] = $controllers;
		return parent::$elements_gizmo;

	}

	/**
	 * Load CSS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  string    The style of element
	 */
	public function render_css() {

		$styles =  '.' . str_replace( "_", "-", static::$element_name ) . '-' . $this->element_id . '{'
		           ."}";
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  void
	 */
	public function render_script() {

		//wp_enqueue_script( 'karma-lightbox' ,  KARMA_BUILDER_URL . 'builder/js/karma-lightbox.min.js', array(), true ); ?>
		<script type="text/javascript" src="<?php echo KARMA_BUILDER_URL . 'builder/js/karma-lightbox.min.js'; ?>"></script>

		<?php if( 'popup' ==  $this->element_attributes['action'] ){
			?>
			<script type="text/javascript">
				document.addEventListener('DOMContentLoaded', function(){
					new karmaImageLightbox('.karma-image-<?php echo esc_attr( $this->element_attributes[ 'element_key' ] ); ?> a.karma-image-link');
				});

			</script>
			<?php
		}
	}

	/**
	 * Get element info
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function get_element_info(){

		$element_info = array(
			'elementName' => self::$element_name ,
			'icon'         => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/image-element-icon.svg' ),
			'category'     => array(
				'basic' ,
				'media' ,
			),
			'showInList'   => true ,
		);

		parent::$elements_info[ self::$element_name ] = $element_info;
		return parent::$elements_info;

	}

}