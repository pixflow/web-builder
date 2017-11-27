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
				'linktitle'     => '' ,
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
				<a class="karma-image-link" href="<?php echo $image_extra['link']; ?>" title="<?php echo $attributes['linktitle']; ?> " >
					<img class="<?php echo $scale_class; ?>" src="<?php echo esc_url( $attributes[ 'imgurl' ] ); ?>" title="<?php echo $attributes['linktitle']; ?>" alt="<?php echo $attributes['alt']; ?>" />
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
		               . '<a class="karma-image-link" href="{{{ data.link }}}" title="{{ data.linktitle }}" >'
		               . '<img src="" title="{{ data.linktitle }}" alt="{{ data.alt }}" />'
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
				"height" => "460",
				"params" => array(
					array(
						"name"  	    => "imageaction",
						"type"   	    => Karma_Builder_Setting_Panel::DROPDOWN,
						"label"  	    => esc_attr__( "Action on click", 'karma' ),
						'value'   	    => "none",
						'separator'	    => "container",
						"options"  		=> array(
							'none'   => array(
								'title' => esc_attr( 'None' , 'karma' )
							),
							'popup'  => array(
								'title' => "Popup"
							) ,
							'link'  => array(
								'title' => "Link"
							),
						)
					),
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
				array(
						"type"		=> "bothSpacingGizmo",
						"className"	=> "section-both-spacing",
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

		//wp_enqueue_script( 'karma-lightbox' ,  KARMA_BUILDER_URL . 'builder/js/karma-lightbox.min.js', array(), true );
		if( 'popup' ==  $this->element_attributes['action'] ){
			?>
			<script type="text/javascript" src="<?php echo KARMA_BUILDER_URL . 'builder/js/karma-lightbox.min.js'; ?>"></script>
			<script type="text/javascript">
				document.addEventListener('DOMContentLoaded', function(){
					new karmaImageLightbox('.karma-image-<?php echo esc_attr( $this->element_attributes[ 'element_key' ] ); ?> a.karma-image-link');
				});

			</script>
			<?php
		}
	}

}