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
	 * Return default attributes
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array
	 */
	public function get_element_default_attributes(){

		return 	array(
			'element_key'   => 'kb' ,
			'imgurl'		=>  KARMA_BUILDER_URL . 'builder/media/defult-img.png',
			'action'        => 'none' ,
			'linkurl'       => get_site_url(),
			'linktarget'    => '_blank' ,
			'alt'           => get_bloginfo( 'name' ) ,
			'scale'			=> 'fill',
			'position'		=> 'center-center',

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
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$image_extra = $this->get_image_url( $attributes );
		$scale_class = ( 'fill' == $attributes['scale'] ) ? 'karma-image-fill' : 'karma-image-real';
		ob_start();
		?>
		<div class='karma-image karma-image-<?php echo esc_attr( $attributes['element_key'] ); ?> karma-position-<?php echo $attributes['position'] ?>'>
			<div class="karma-image-container <?php echo $image_extra['class']; ?>">
				<a class="karma-image-link karma-document-click" href="<?php echo $image_extra['link']; ?>"
				   target="<?php echo $attributes['linktarget']; ?>">
					<img class="<?php echo $scale_class; ?>" src="<?php echo esc_url( $attributes['imgurl'] ); ?>"
						 alt="<?php echo $attributes['alt']; ?>"/>
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

		$js_template = "<# var scaleClass = ( 'fill' == data.scale ) ? 'karma-image-fill' : 'karma-image-real'; #>"
			. '<div class="karma-image karma-image-{{ data.element_key }} karma-position-{{ data.position }}" >'
			. '<div class="karma-image-container {{ data.extraclass }}">'
			. '<a class="karma-image-link karma-document-click" href="{{{ data.linkurl }}}" target="{{ data.linktarget }}" >'
			. '<img class="<# print( scaleClass ); #>" src="{{ data.imgurl }}" alt="{{ data.alt }}" />'
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
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public function get_css_attributes() {

		$styles = array();
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

		$block = '' ;
		if ( 'popup' == $this->element_attributes['action'] ) {
			$block .= 'document.addEventListener( \'DOMContentLoaded\', function () {
					new karmaImageLightbox( \'.karma-image-' . esc_attr( $this->element_attributes['element_key'] ) . ' a.karma-image-link\' );
				} );';
		}

		return $block;

	}

	/**
	 * List of dependencies
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array
	 */
	public function get_style_script_dependencies(){

		$dependencies = array(
			'css' => array() ,
			'js' => array(
				KARMA_BUILDER_URL . 'builder/js/karma-lightbox.min.js'
			)
		);

		return $dependencies ;

	}

}