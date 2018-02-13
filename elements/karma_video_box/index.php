<?php
namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * video box element class.
 *
 * This includes base methods and variable that need for video box element
 *
 *
 * @since      0.1.1
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_video_box
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Video_Box extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 0.1.1
	 * @access public
	 */
	public static $element_name = 'karma_video_box';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return 	array(
			'element_key'   	=> 'kb' ,
			'imgurl'			=>  KARMA_BUILDER_URL . 'builder/media/defult-img.png',
			'titletext'			=> 'This is title',
			'descriptiontext'	=> 'This is description',
			'linktext'			=> 'This is link',
			'backgroundsize'	=> 'cover',
			'backgroundposition'=> 'center-center',
			'contentposition'	=> 'bottom-left',
			'titlecolor'		=> '#fff',
			'descriptioncolor'	=> '#fff',
			'linkcolor'			=> '#fff',
			'titletag'			=>'h3',
			'descriptiontag'	=>'h5',
			'textposition'		=>'bottom-left',
			'textlink'			=>'https://www.google.com/',
			'textLinkAction'	=>'_self',
			'videourl'			=>'',
			'coloroverlay'		=>'rgba(0, 0, 0, 0.2)',
			'colorbackground'	=>'#000',
			'radiusbox'			=>'0',
			'videoheight'		=>'400',
			'topspacepadding'	=> '10',
		);

	}

	/**
	 * Render video box element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param array $attributes Attribute of element
	 * @param string $content Content of element
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$title_content = 	'<' . $attributes['titletag'] . ' class="karma-video-box-title-tag ">' .  $attributes['titletext']  . '</' . $attributes['titletag'] . '>';
		$description_content = 	'<' . $attributes['descriptiontag'] . ' class="karma-video-box-description-tag ">' .  $attributes['descriptiontext']  . '</' . $attributes['descriptiontag'] . '>';
		$link_content = 	'<a href=' .  $attributes['textlink']  . ' target='.  $attributes['textLinkAction']  . ' class="karma-video-box-link-tag ">' .  $attributes['linktext']  .  '</a>';
		$display = ( "" ==  $attributes['linktext'] ) ? 'none' : 'block' ;
		ob_start();
		?>
		<div data-url="<?php echo esc_attr( $attributes['videourl'] ); ?>" class="karma-video-box karma-video-box-<?php echo esc_attr( $attributes['element_key'] ); ?> karma-video-box-background-size-<?php echo esc_attr( $attributes['backgroundsize'] ); ?> karma-video-box-position-<?php echo esc_attr( $attributes['backgroundposition'] ); ?> karma-video-box-content-position-<?php echo esc_attr( $attributes['textposition'] ); ?>";  >
			<div class="karma-video-box-overlay"></div>
			<div class="karma-video-box-container-player">
				<div class="karma-video-box-player">
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/player.svg' ); ?>
				</div>
			</div>
			<div class="karma-video-box-text-container">
				<div class="karma-video-box-title">
					<?php echo $title_content; ?>
				</div>
				<div class="karma-video-box-description">
					<?php echo $description_content; ?>
				</div>
				<div class="karma-video-box-link">
					<?php echo $link_content; ?>
					<div class="karma-video-box-link-shape" style="display : <?php echo $display; ?>"><?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bottom-arrow.svg' ); ?></div>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render video box element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template =
			'<div data-url="{{ data.attributes.shortcode_attributes.videourl}} " class="karma-video-box karma-video-box-{{ data.attributes.shortcode_attributes.element_key }}  karma-video-box-background-size-{{ data.attributes.shortcode_attributes.backgroundsize }} karma-video-box-content-position-{{ data.attributes.shortcode_attributes.textposition }} karma-video-box-position-{{ data.attributes.shortcode_attributes.backgroundposition }}" >'
			. '<div class="karma-video-box-overlay"></div>'
			. '<div class="karma-video-box-container-player">'
			. '<div class="karma-video-box-player">'. Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL .'builder/media/svg/player.svg' ). '</div>'
			. '</div>'
			. '<div class="karma-video-box-text-container">'
			. '<div  class="karma-video-box-title">'
			. '<{{{ data.attributes.shortcode_attributes.titletag }}} class="karma-video-box-title-tag" > {{ data.attributes.shortcode_attributes.titletext }} </{{{  data.attributes.shortcode_attributes.titletag }}}>'
			. '</div>'
			. '<div class="karma-video-box-description">'
			. '<{{{ data.attributes.shortcode_attributes.descriptiontag }}} class="karma-video-box-description-tag" > {{ data.attributes.shortcode_attributes.descriptiontext }} </{{{  data.attributes.shortcode_attributes.descriptiontag }}}>'
			. '</div>'
			. '<div  class="karma-video-box-link">'
			. '<a href="{{{ data.attributes.shortcode_attributes.textlink }}}" target="{{{ data.attributes.shortcode_attributes.textLinkAction }}}" class="karma-video-box-link-tag" > {{ data.attributes.shortcode_attributes.linktext }} </a>'
			. '<div class="karma-video-box-link-shape">' .  Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bottom-arrow.svg' ) .' </div>'
			. '</div>'
			. '</div>'

			. '</div>';

		return $js_template;

	}


	/**
	 * Return CSS property
	 * Note : postfix or prefix are the CSS selectors
	 * @example if your prefix is .karma-prefix so your CSS selector is .karma-prefix .karma-section-{element-key}
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  array The style property of element
	 */
	public static function get_css_attributes() {

		$styles = array(
			array(
				'property'		=> array(
						'padding-top' 	=> self::$element_attributes[ 'topspacepadding' ] . "px",
				)
			),
			array(
				'postfix' => ' .karma-video-box',
				'property' => array(
					'background-image'	=> ( 'none' ==  self::$element_attributes[ 'imgurl' ] ) ? "none" : "url(" . self::$element_attributes[ 'imgurl' ] . ")",
					'height'			=> 	 self::$element_attributes[ 'videoheight' ] . 'px',
					'border-radius'		=> self::$element_attributes[ 'radiusbox' ]. 'px',
					'background-color'	=>  self::$element_attributes[ 'colorbackground' ],
				)
			),
			array(
				'postfix' => ' .karma-video-box-overlay',
				'property' => array(
					'background-color'		=>  self::$element_attributes[ 'coloroverlay' ],
					'border-radius'			=> self::$element_attributes[ 'radiusbox' ]. 'px',
				),
			),
			array(
				'postfix' => ' .karma-video-box-title .karma-video-box-title-tag',
				'property' => array(
					'color' 		=> self::$element_attributes[ 'titlecolor' ],
				)
			),
			array(
				'postfix' => ' .karma-video-box-description .karma-video-box-description-tag',
				'property' => array(
					'color' => self::$element_attributes[ 'descriptioncolor' ],
				)
			),
			array(
				'postfix' => ' .karma-video-box-link .karma-video-box-link-tag',
				'property' => array(
					'color' 			=> self::$element_attributes[ 'linkcolor' ]
				)
			),
			array(
				'postfix'	=> ' .karma-video-box-link .karma-video-box-link-shape svg *',
				'property'	=> array(
					'stroke' 		=> self::$element_attributes[ 'linkcolor' ],
				)
			),

			array(
				'postfix' => ' .karma-video-box-player svg *',
				'property' => array(
					'fill' 		=> self::$element_attributes[ 'descriptioncolor' ],
				)
			),


		);

		return $styles;

	}

	/**
	 * Load JS
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  void
	 */
	public function render_script() {

		ob_start();
		?>
			document.addEventListener( 'DOMContentLoaded', function () {

				document.querySelector('.karma-video-box-<?php echo  esc_attr( self::$element_attributes['element_key'] ) ?> .karma-video-box-player ').addEventListener('click', function(){

					new karmaVideoPopup( ' #karma-video-box-<?php echo esc_attr( self::$element_attributes['element_key'] ) ?>  .karma-video-box'  );

				} );

			} );
		
		<?php
		return ob_get_clean();
	}

	/**
	 * List of dependencies
	 *
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  array
	 */
	public function get_style_script_dependencies(){

		$dependencies = array(
			'css' => array() ,
			'js' => array(
					KARMA_BUILDER_URL . 'builder/js/karma-builder-video-popup.min.js',
			)

		);

		return $dependencies ;

	}

}