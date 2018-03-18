<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;

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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 0.1.0
	 * @access public
	 */
	public static $element_name = 'karma_image';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return 	array(
			'element_key'   			=> 'kb' ,
			'imgurl'					=>  KARMA_BUILDER_URL . 'builder/media/defult-img.png',
			'action'        			=> 'none' ,
			'linkurl'       			=> get_site_url(),
			'linktarget'    			=> '_blank' ,
			'alt'          				=> get_bloginfo( 'name' ) ,
			'scale'						=> 'fill',
			'position'					=> 'center-center',
			'width'						=> '514',
			'height'					=> '386',
			'resizing'					=> false,
			'naturalwidth'				=> '514',
			'naturalheight' 			=> '386',
			'topspacepadding'			=> '10',
			'tablettopspacepadding'		=> '16',
			'mobiletopspacepadding'		=> '16',
			'elementalign'				=> 'center',
		);

	}

	/**
	 * Render image element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param array $attributes Attribute of element
	 * @param string $content Content of element
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$image_extra 	= $this->get_image_url( $attributes );
		$scale_class 	= ( 'fill' == $attributes['scale'] ) ? 'karma-image-fill' : 'karma-image-real';
		$scale_class 	.= ( $attributes['resizing'] ) ? ' karma-image-both-resize' : '';
		$elem_width 	=  $attributes['width'] . 'px';
		$elem_height 	=  $attributes['height'].'px';

		ob_start();
		?>
		<div data-width="<?php echo esc_attr( $elem_width  ); ?>" data-height="<?php echo esc_attr( $elem_height  ); ?>" class='karma-image karma-image-<?php echo esc_attr( $attributes['element_key'] ); ?>'>
			<div class="karma-image-container <?php echo $image_extra['class']; ?>">
				<a class="karma-image-link karma-document-click" href="<?php echo $image_extra['link']; ?>"
				   target="<?php echo $attributes['linktarget']; ?>">
					<div class="karma-image-resize karma-position-<?php echo $attributes['position'] ?>" style=" width: <?php echo esc_attr( $elem_width  ); ?> ;height: <?php echo esc_attr( $elem_height); ?>;">
						<div class="karma-image-resize-crop karma-position-<?php echo $attributes['position'] ?>" style=" width: <?php echo esc_attr( $elem_width ) ?> ;height: <?php echo esc_attr( $elem_height ); ?>;" >
						<img style="width:<?php echo $attributes['naturalwidth'] ; ?>px;height:<?php echo $attributes['naturalheight'] ; ?>px;" class="<?php echo $scale_class; ?>" src="<?php echo esc_url( $attributes['imgurl'] ); ?>" alt="<?php echo $attributes['alt']; ?>"/>
					</div>
				</div>
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
	 * @since 0.1.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template = "<# var scaleClass = ( 'fill' == data.attributes.shortcode_attributes.scale ) ? 'karma-image-fill' : 'karma-image-real'; #> "
		   	. '<# scaleClass += ( data.attributes.shortcode_attributes.resizing ) ? " karma-image-both-resize" : "" #>'
		   	. '<# var elemWidth =  data.attributes.shortcode_attributes.width + "px"; #>'
		   	. '<# var elemHeight =  data.attributes.shortcode_attributes.height + "px"; #>'
		    . '<# var elemStyle = " width:" + elemWidth +";height:" + elemHeight +";" #>'
			. '<div data-width="{{data.attributes.shortcode_attributes.width}}" data-height="{{data.attributes.shortcode_attributes.height}}" class="karma-image karma-image-{{ data.attributes.element_key }} " >'
			. '<div class="karma-image-container {{ data.attributes.shortcode_attributes.extraclass }}">'
			. '<a class="karma-image-link karma-document-click" href="{{{ data.attributes.shortcode_attributes.linkurl }}}" target="{{ data.attributes.shortcode_attributes.linktarget }}" >'
		    . '<div class="karma-image-resize karma-position-{{ data.attributes.shortcode_attributes.position }}" style="{{ elemStyle }}" >'
		    . '<div class="karma-image-resize-crop karma-position-{{ data.attributes.shortcode_attributes.position }}" style="{{ elemStyle }};" >'
			. '<img style="width:{{ data.attributes.shortcode_attributes.naturalwidth }}px;height:{{ data.attributes.shortcode_attributes.naturalheight }}px;" class="<# print( scaleClass ); #>" src="{{ data.attributes.shortcode_attributes.imgurl }}" alt="{{ data.attributes.shortcode_attributes.alt }}" />'
		    . '</div>'
		    . '</div>'
			. '</a>'
			. '</div>'
			. '</div>';

		return $js_template;

	}

	/**
	 * Retrieve image element link URL.
	 *
	 * @since 0.1.0
	 * @access private
	 *
	 * @param array $attributes Attribute of element
	 *
	 * @return array | false special class and URL of image
	 */
	private function get_image_url( $attributes ) {

		$result = array();
		switch ( $attributes['action'] ) {
			case 'none' :
				$result['class'] = 'karma-image-without-action';
				$result['link']  = 'javascript:void(0);';
				break;
			case 'link' :
				$result['class'] = 'karma-image-with-url';
				$result['link']  = $attributes['linkurl'];
				break;
			case 'popup' :
				$result['class'] = 'karma-image-popup-mode';
				$result['link']  = $attributes['imgurl'];
				break;
			default:
				return false;
				break;
		}

		return $result;

	}

	/**
	 * Return CSS property
	 * Note : postfix or prefix are the CSS selectors
	 * @example if yor prefix is .karma-prefix so your CSS selector is .karma-prefix .karma-section-{element-key}
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public static function get_css_attributes() {

		$styles = array(
			array(
				'property'		=> array(
					'padding-top' 	=> self::$element_attributes[ 'topspacepadding' ] . "px",
				),
				'tablet_property' => array(
					'padding-top'  => self::$element_attributes[ 'tablettopspacepadding' ] . 'px',
				),
				'mobile_property' => array(
					'padding-top'  => self::$element_attributes[ 'mobiletopspacepadding' ] . 'px',
				)
			)
		);
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  void
	 */
	public function render_script() {

		$block = '' ;
		if ( 'popup' == self::$element_attributes['action'] ) {
			$block .= 'document.addEventListener( \'DOMContentLoaded\', function () {
					new karmaImageLightbox( \'.karma-image-' . esc_attr( self::$element_attributes['element_key'] ) . ' a.karma-image-link\' );
				} );';
		}

		return $block;

	}

	/**
	 * List of dependencies
	 *
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  array
	 */
	public function get_style_script_dependencies(){

		$dependencies = array(
			'css' => array() ,
			'js' => array(
				KARMA_BUILDER_URL . 'builder/js/karma-builder-lightbox.min.js',
			)
		);

		return $dependencies ;

	}

}