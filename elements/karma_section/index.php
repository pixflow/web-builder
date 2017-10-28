<?php
class Karma_Section extends Karma_Shortcode_Base {

	/**
	 * Generic element attributes .
	 *
	 * Holds the element attributes .
	 *
	 * @access private
	 *
	 * @var array
	 */
	private $element_attributes;

	/**
	 * Generic ID.
	 *
	 * Holds the uniqe ID.
	 *
	 * @access public
	 *
	 * @var string
	 */
	public static $element_id;

	public static $element_name = 'karma_section';

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'structure'		=> 'container',
				'space'       	=> '200' ,
				'element_key'	=> '',
				'extra_class'	=> '',
			)
			, $atts
		);
		$container_class = ($atts['structure'] == 'container')?"karma-container":"karma-container-fluid";
		ob_start();
		?>
		<div class='karma-section karma-section-<?php echo esc_attr( $atts['element_key'] ); ?> <?php echo esc_attr( $atts['extra_class'] ); ?>'>
			<div class='<?php echo esc_attr( $container_class ); ?> karma-no-gutters'>
				<?php echo do_shortcode( $content ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<# var rowContainer = ('container' == data.changed.structure )?'karma-container':'karma-container-fluid'; #>"
			."<div class=\"section-spacing section-top-spacing\"><div class=\"resize-handler\"></div></div>"
			."<div class='karma-section karma-row-{{data.attributes.shortcode_attributes.element_key}} {{data.changed.extra_class}}'>"
			. "<div class='{{rowContainer}} karma-no-gutters'>"
			//. '<# print( createChildren( data.shortcodeContent ) ) #>'
			. "</div>"
			. "</div>"
			."<div class=\"row-top-spacing-dot-container section-spacing\"><div class=\"spacing-top-dot\"></div><div class=\"spacing-top-dot-hover\"></div><div class=\"resize-handler\"></div></div><div class=\"row-bottom-spacing-dot-container section-spacing\"><div class=\"spacing-bottom-dot\"></div><div class=\"spacing-bottom-dot-hover\"></div><div class=\"resize-handler\"></div></div><div class=\"section-spacing section-bottom-spacing\"><div class=\"resize-handler\"></div></div>";
	}


	public function map() {

		$map = array(
			"name"		=> "Section",
			"params"	=> array(
				array(
					"name"		=> "structure",
					"type"		=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
					"label"		=> esc_attr__( "Grid options", 'karma' ),
					'value'		=> "full",
					"field"		=> array(

						array(
							'image'	=> karma_load_svg(KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg'),
							'title' => "Full screen",
							'value' => "full",
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg'),
							'title' => "Container",
							'value' => "container"
						),

					)
				),
				array(
					"name"		=> "title",
					"type"		=> Karma_Builder_Setting_Panel::TITLE,
					"label"		=> esc_attr__( "Spacing", 'karma' ),
					'value'		=> 'Spacing'
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
					"label"		=> esc_attr__( "Top & bottom spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'value'	=> 200,
						'min'	=> 0,
						'max'	=> 800,
						'step'	=> 1,
						'unit'	=> 'px'
					)
				),
				array(
					"name"			=> "extra_class",
					"type"			=> Karma_Builder_Setting_Panel::TEXT,
					"label"			=> __( "Class Name", 'karma' ),
					'placeholder'	=> __( 'Class name', 'karma' ),
					"group"			=> "Advance option"
				),
				array(
					"name"			=> "add_grid",
					"type"			=> Karma_Builder_Setting_Panel::GRID,
					"label"			=> __( "Class Name", 'karma' ),
					'placeholder'	=> __( 'Class name', 'karma' ),
				),

			)
		);


		parent::$elements_map['karma_section'] = $map;
		return parent::$elements_map;
	}

	/**
	 * Set the gizmo controller
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	array	Gizmo controller of all elements
	 */
	public function gimzo_controllers(){

		$controllers = array(
			array(
				"type" => "inner-gizmo" ,
				"className" => "row-gizmo-group" ,
				"params" => array(
					array(
						'type' =>'icon',
						'icon' => karma_load_svg(KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg'),
						'action' => 'open' ,
						'className' => 'karma-element-setting' ,
					) ,
					array(
						'type' =>'icon',
						'icon' => karma_load_svg(KARMA_BUILDER_URL . 'builder/media/svg/layout.svg') ,
						'action' => 'open' ,
						'className' => 'row-setting-layout' ,
					) ,
					array(
						'type' =>'text',
						'action' => 'open' ,
						'className' => 'row-setting-setting' ,
						'value'	=> esc_attr( 'Background', 'karma' )

					),
				)
			)
		);

		parent::$elements_gizmo['karma_section'] = $controllers;
		return parent::$elements_gizmo;

	}

	/**
	 * Set the attributes of current elements and also
	 * set the uniqe id
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	object	Instance of current class
	 */
	public function get_element_attributes( $attributes ) {

		$this->element_attributes = $attributes['attributes'];
		self::$element_id =  $this->element_attributes['element_key'] ;
		return $this;

	}


	/**
	 * Load CSS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	string	The style of element
	 */
	public function render_css(){

		$styles = "padding-top:{$this->element_attributes['space']}px;padding-bottom:{$this->element_attributes['space']}px;";
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	void
	 */
	public function render_script(){


	}


}