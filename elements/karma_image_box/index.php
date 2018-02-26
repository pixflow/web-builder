<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * Image and text box element class.
 *
 * This includes base methods and variable that need for Image and text box element
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image_text_box
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image_Box extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 0.1.0
	 * @access public
	 */
	public static $element_name = 'karma_image_box';

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
				'element_key'   	=> 'kb' ,
				'imgurl'			=>  KARMA_BUILDER_URL . 'builder/media/default-img-text.jpg',
				'overlaycolor'      => 'rgba(0, 0, 0, 0.2)',
				'backgroundcolor'	=> '#000',
				'titletext'			=> 'this is title',
				'descriptiontext'	=> 'this is description',
				'linktext'			=> 'Explore more',
				'backgroundsize'	=> 'cover',
				'backgroundposition'=> 'center-center',
				'titlecolor'		=> '#fff',
				'descriptioncolor'	=> '#fff',
				'titletag'			=>'p',
				'descriptiontag'	=>'h4',
				'textposition'		=>'bottom-left',
				'textlink'			=>'https://www.google.com/',
				'target'			=>'_self',
				'topspacepadding'	=> '10',
				'radiusbox'			=>'0',
				'imageheight'		=>'400',
				'type'				=> 'fill' ,
				'rangemodel'        =>'0',
                'generalcolor'		=> '#fff',
                'textcolor'			=> '#000',
				'elementalign'		=> 'left',
				'visibleondesktop'	=> 'on',
				'visibleonmobile'	=> 'on',
				'visibleontablet'	=> 'on',

		);

	}

	/**
	 * Render Image and text box element output.
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
		$title_class 		= ( '' == $attributes['titletext'] || 'this is title' == $attributes['titletext'] ) ? 'karma-image-box-title-opacity' : '';
		$description_class  = ( '' == $attributes['descriptiontext'] || 'this is description' == $attributes['descriptiontext'] ) ? 'karma-image-box-description-opacity' : '';
		$title_content		= '<' . $attributes['titletag'] . ' class="karma-image-text-box-title-tag ' .  $title_class .'">' .  $attributes['titletext']  . '</' . $attributes['titletag'] . '>';
		$description_content = '<' . $attributes['descriptiontag'] . ' class="karma-image-text-box-description-tag '.$description_class.' ">' .  $attributes['descriptiontext']  . '</' . $attributes['descriptiontag'] . '>';
		$link_content		= '<a href=' .  $attributes['textlink']  . ' target='.  $attributes['target']  . ' class="karma-image-text-box-link-tag ">' .  $attributes['linktext']  .  '</a>';
		$display			= ( "" ==  $attributes['linktext'] ) ? 'none' : 'block' ;
		$visible_desktop 	= ( 'on' == $attributes['visibleondesktop'] ) ? '' : 'desktop-display-none karma-deactive-on-desktop';
		$visible_mobile 	= ( 'on' == $attributes['visibleonmobile'] ) ? '' : 'mobile-display-none karma-deactive-on-mobile';
		$visible_tablet 	= ( 'on' == $attributes['visibleontablet'] ) ? '' : 'tablet-display-none karma-deactive-on-tablet';

		ob_start();
		?>
		<div class="karma-image-text-box karma-image-text-box-<?php echo esc_attr( $attributes['element_key'] ); ?> karma-image-text-box-background-size-<?php echo esc_attr( $attributes['backgroundsize'] ); ?> karma-image-text-box-position-<?php echo esc_attr( $attributes['backgroundposition'] ); ?> karma-image-text-box-content-position-<?php echo esc_attr( $attributes['textposition'] ); ?>";  >
			<div class="karma-image-text-box-overlay"></div>
			<div class="karma-image-text-box-text-container">
				<div class="karma-image-text-box-title">
					<?php echo $title_content; ?>
				</div>
				<div class="karma-image-text-box-description">
					<?php echo $description_content; ?>
				</div>
                <div class="karma-image-text-box-link-content">
                    <div class="karma-image-text-box-link <?php echo $visible_tablet  ?> <?php echo $visible_mobile  ?> <?php echo $visible_desktop  ?> <?php echo esc_attr( $this->change_classes( $attributes ) ); ?>"  visibe-on-desktop="<?php echo $attributes[ 'visibleondesktop' ] ?>" visibe-on-tablet="<?php echo $attributes[ 'visibleontablet' ] ?>"  visibe-on-mobile="<?php echo $attributes[ 'visibleonmobile' ] ?>">
                        <?php echo $link_content; ?>
                        <div class="karma-image-text-box-link-shape" style="display : <?php echo $display; ?>"><?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bottom-arrow.svg' ); ?></div>
                    </div>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render Image and text box element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template =
				"<# var visibleDesktop = ( 'on' == data.attributes.shortcode_attributes.visibleondesktop  ) ? '' : 'desktop-display-none karma-deactive-on-desktop';  #>"
				. "<# var visibleMobile = ( 'on' == data.attributes.shortcode_attributes.visibleonmobile  ) ? '' : 'mobile-display-none karma-deactive-on-mobile';  #>"
				. "<# var visibleTablet = ( 'on' == data.attributes.shortcode_attributes.visibleontablet  ) ? '' : 'tablet-display-none karma-deactive-on-tablet';  #>"
				.'<# if ( \'fill\'  ==  data.attributes.shortcode_attributes.type ) { #>'
				.'<# var className = \'karma-button-fill \' #>'
				.'<#}else if( \'outline\'  ==  data.attributes.shortcode_attributes.type ) { #>'
				.'<#  className = \'karma-button-outline \' #>'
				.'<#} else { #>'
				.'<# className = \'karma-button-link \'  #>'
				.'<# }#>'

				 . '<div class="karma-image-text-box karma-image-text-box-{{ data.attributes.shortcode_attributes.element_key }}  karma-image-text-box-background-size-{{ data.attributes.shortcode_attributes.backgroundsize }} karma-image-text-box-content-position-{{ data.attributes.shortcode_attributes.textposition }} karma-image-text-box-position-{{ data.attributes.shortcode_attributes.backgroundposition }}" >'
				 . '<div class="karma-image-text-box-overlay"></div>'
				 . '<div class="karma-image-text-box-text-container">'
				 . '<div  class="karma-image-text-box-title">'
				 . '<{{{ data.attributes.shortcode_attributes.titletag }}} class="karma-image-text-box-title-tag" > {{{ data.attributes.shortcode_attributes.titletext }}} </{{{  data.attributes.shortcode_attributes.titletag }}}>'
				 . '</div>'
				 . '<div class="karma-image-text-box-description">'
				 . '<{{{ data.attributes.shortcode_attributes.descriptiontag }}} class="karma-image-text-box-description-tag" > {{{ data.attributes.shortcode_attributes.descriptiontext }}} </{{{  data.attributes.shortcode_attributes.descriptiontag }}}>'
				 . '</div>'
                 . '<div class="karma-image-text-box-link-content">'
				 . '<div  class="karma-image-text-box-link {{className}} {{visibleDesktop}} {{visibleMobile}}  {{ visibleTablet }}" visibe-on-tablet="{{ data.attributes.shortcode_attributes.visibleontablet }}"   visibe-on-mobile="{{ data.attributes.shortcode_attributes.visibleonmobile }}"  visibe-on-desktop="{{ data.attributes.shortcode_attributes.visibleondesktop }}">'
				 . '<a href="{{{ data.attributes.shortcode_attributes.textlink }}}" target="{{{ data.attributes.shortcode_attributes.target }}}" class="karma-image-text-box-link-tag" > {{ data.attributes.shortcode_attributes.linktext }} </a>'
				 . '<div class="karma-image-text-box-link-shape">' .  Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bottom-arrow.svg' ) .' </div>'
				 . '</div>'
				 . '</div>'
				 . '</div>'

				. '</div>';

		return $js_template;

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
						)
					),
					array(
						'postfix'	=> ' .karma-image-text-box',
						'property'	=> array(
							'background-color'	=>  self::$element_attributes[ 'backgroundcolor' ]  ,
							'background-image'	=> ( 'none' ==  self::$element_attributes[ 'imgurl' ] ) ? "none" : "url(" . self::$element_attributes[ 'imgurl' ] . ")",
							'height'			=> self::$element_attributes[ 'imageheight' ] . 'px',
							'border-radius'		=> self::$element_attributes[ 'radiusbox' ]. 'px',
						)
					),
					array(
						'postfix'	=> ' .karma-image-text-box-overlay',
						'property'	=> array(
							'background-color'		=>  self::$element_attributes[ 'overlaycolor' ],
							'border-radius'			=> self::$element_attributes[ 'radiusbox' ]. 'px',
						)
					),
					array(
						'postfix'	=> ' .karma-image-text-box-title .karma-image-text-box-title-tag',
						'property'	=> array(
								'color'		=> self::$element_attributes[ 'titlecolor' ],
						)
					),
					array(
							'postfix'	=> ' .karma-image-text-box-description .karma-image-text-box-description-tag',
							'property'	=> array(
									'color'		=> self::$element_attributes[ 'descriptioncolor' ],
							)
					),
					array(
							'postfix'	=> ' .karma-image-text-box-link.karma-button-link .karma-image-text-box-link-tag',
							'property'	=> array(
									'color'		=> self::$element_attributes[ 'generalcolor' ],

							)
					),

					array(
							'postfix'	=> ' .karma-image-text-box-link .karma-image-text-box-link-shape svg *',
							'property'	=> array(
									'stroke'	=> self::$element_attributes[ 'generalcolor' ],
							)
					),
					array(
							'postfix'	=> ' .karma-image-text-box-link',
							'property'	=> array(
									'border-radius'	=> self::$element_attributes[ 'rangemodel' ] . 'px',
							)
					),
                    array(
                        'postfix'	=> ' .karma-image-text-box-link.karma-button-fill',
                        'property'	=> array(
                            'background-color'	=> self::$element_attributes[ 'generalcolor' ],
                            'border-color'	=> self::$element_attributes[ 'generalcolor' ],
                        )
                    ),

                    array(
                        'postfix'	=> ' .karma-image-text-box-link.karma-button-outline',
                        'property'	=> array(
                            'border-color'	=> self::$element_attributes[ 'generalcolor' ],
                        )
                    ),

                    array(
                        'postfix'  => ' .karma-button-outline .karma-image-text-box-link-tag ',
                        'property' => array(
                            'color' => self::$element_attributes[ 'generalcolor' ],
                        )
                    ),
                    array(
                        'postfix'	=> ' .karma-button-fill .karma-image-text-box-link-tag  ',
                        'property'	=> array(
                            'color'		=> self::$element_attributes[ 'textcolor' ],
                        )
                    ),

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
				'css'	=> array() ,
				'js'	=> array()
		);

		return $dependencies ;

	}

	public function change_classes( $attributes ) {

		if( 'fill' == $attributes['type'] ){
			$class_name = 'karma-button-fill';
		}elseif ( 'outline' == $attributes['type'] ){
			$class_name = 'karma-button-outline';
		}else{
			$class_name = 'karma-button-link';
		}

		return $class_name;

	}

}