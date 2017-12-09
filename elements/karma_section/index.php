<?php

class Karma_Section extends Karma_Shortcode_Base {

	public static $element_name = 'karma_section';

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
			'structure'		=> 'container',
			'space'			=> '200',
			'element_key'	=> '',
			'extraclass'	=> '',
		);

	}

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			$this->get_element_default_attributes(),
			$atts
		);
		$container_class = ( $atts[ 'structure' ] == 'container' ) ? "karma-container" : "karma-container-fluid";
		ob_start();
		?>
		<div class='karma-section karma-section-<?php echo esc_attr( $atts[ 'element_key' ] ); ?> <?php echo esc_attr( $atts[ 'extraclass' ] ); ?>'>
			<div class='<?php echo esc_attr( $container_class ); ?> karma-row karma-no-gutters'>
				<?php echo do_shortcode( $content ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<# var rowContainer = ('container' == data.changed.structure ) ? 'karma-container' : 'karma-container-fluid'; #>"
			. "<div class='karma-section karma-section-{{ data.attributes.shortcode_attributes.element_key }} {{ data.changed.extra_class }}'>"
			. "<div class='{{ rowContainer }} karma-row karma-no-gutters'>"
			. "</div>"
			. "</div>";

	}

	public function map() {

		$map = array(
			'setting-panel'    => array(
				"title"	=> esc_attr__( "Section Setting", 'karma' ),
				"height" => "365",
				"params" => array(
					array(
						"name"	=> "structure",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "full",
						"class" => "radio-image-border-hover",
						"field"	=> array(

							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'style' => 'padding-left:29px; padding-right: 19px; ',
								'title'	=> "Full screen",
								'value'	=> "full",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'style' => 'padding-left: 19px; padding-right: 38px; ',
								'title'	=> "Container",
								'value'	=> "container"
							),

						)
					),
					array(
						"name"	=> "title",
						"type"	=> Karma_Builder_Setting_Panel::TITLE_WITH_BACKGROUND,
						"label"	=> esc_attr__( "Spacing", 'karma' )
					),
					array(
						"name"		=> "space",
						"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"		=> esc_attr__( "Top & bottom spacing", 'karma' ),
						'value'		=> 0,
						"options"	=> array(
								'value'	=> 200,
								'min'   => 0,
								'max'   => 800,
								'step'  => 1,
								'unit'  => 'px'
							)
						),
						array(
								"name"			=> "extraclass",
								"type"			=> Karma_Builder_Setting_Panel::TEXT,
								"label"			=> __( "Class Name", 'karma' ),
								"group"			=> "Advance option"

						),
				)
			),

			'layout-panel'		=> array(
				'title'		=> __( 'Column Layout', 'karma' ),
				'params'	=> array(
					array(
						"name"	=> 'gridlayout' ,
						"type"	=> Karma_Builder_Setting_Panel::GRID,
					),
					array(
						"name"	=> "grid",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "",
						"class" => "radio-image-opacity-hover",
						"field"	=> array(

							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-1.svg' ),
								'value'	=> "[12]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-2.svg' ),
								'value'	=> "[6,6]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-3.svg' ),
								'value'	=> "[4,4,4]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-4.svg' ),
								'value'	=> "[3,3,3,3]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-5.svg' ),
								'value'	=> "[8,4]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-6.svg' ),
								'value'	=> "[4,8]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-7.svg' ),
								'value'	=> "[3,6,3]",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-8.svg' ),
								'value'	=> "[2,2,2,2,2,2]",
							),


						)
					),
				)
			),

			'background-panel'	=> array(
				'name'		=> __( 'image position', 'karma' ),
				"title"	=> esc_attr__( "Background Setting", 'karma' ),
				'height'	=> '559',
				'params'	=> array(
						array(
								'name'			=> 'upload' ,
								'type'			=> Karma_Builder_Setting_Panel::UPLOAD_IMAGE ,
								"label"			=> esc_attr__( "Change Image", 'karma' ),
								"value"		=> "",
						),
						array(
						'name'      => 'unsplash' ,
						'type'      => Karma_Builder_Setting_Panel::UNSPLASH ,
					),
					array(
						"name"		=> "switch",
						"type"		=> Karma_Builder_Setting_Panel::SWITCH_PANEL,
						"label"		=> esc_attr__( "Background Setting", 'karma' ),
						"form"		=> "new-panel",
						"action"	=> "open",
						'height'	=> '271'
					),
				),
			),

			'new-panel'		=> array(
				'name'		=> __( 'new panel', 'karma' ),
				'params'	=> array(

						array(
								"name"	=> "position",
								"type"	=> Karma_Builder_Setting_Panel::IMAGE_POSITION,
								"label"	=> esc_attr__( "position", 'karma' ),
								'values'	=> 'center-center',
								'separator' => "container",


						),

						array(
								"name"	=> "checking",
								"type"	=> Karma_Builder_Setting_Panel::CHECK_BOX,
								"label"	=> __( "checking", 'karma' ),
						),
						array(
								"name"			=> "title",
								"type"			=> Karma_Builder_Setting_Panel::SWITCH_PANEL,
								"label"			=> esc_attr__( "Back", 'karma' ),
								'text'			=> 'back',
								"action"		=> "close",
								"shape"			=>"yes"

						),

				)
		)
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
				"type"		=> "innerGizmo",
				"className"	=> "row-gizmo-group",
				"params"	=> array(
					array(
						'type'		=> 'simpleIcon',
						'form'		=> 'setting-panel',
						'className'	=> 'karma-element-setting',
						'params'	=> array(
								'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),

						)
					),
					array(
						'type'		=> 'simpleIcon',
						'form'		=> 'layout-panel',
						'className'	=> 'row-setting-layout',
						'params'	=> array(
							'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/layout.svg' ),
						)
					),
					array(
						'type'		=> 'simpleText',
						'form'		=> 'background-panel',
						'className'	=> 'row-background-setting',
						'params'	=> array(
							'value'		=> esc_attr( 'Background', 'karma' ),
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
	 * Return CSS property
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public function get_css_attributes() {

		$styles = array(
			'property' => array(
				'padding-top'       => $this->element_attributes[ 'space' ] . 'px',
				'padding-bottom'    => $this->element_attributes[ 'space' ] . 'px',
			)
		);
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return    void
	 */
	public function render_script() {


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
			'icon'         => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
			'category'     => array(
				'basic',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'   => false ,
		);

		parent::$elements_info[ self::$element_name ] = $element_info;
		return parent::$elements_info;

	}
}