<?php

class Karma_Section extends Karma_Shortcode_Base {

	public static $element_name = 'karma_section';

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'structure'		=> 'container',
				'space'			=> '200',
				'element_key'	=> '',
				'extraClass'	=> '',
			)
			, $atts
		);
		$container_class = ( $atts[ 'structure' ] == 'container' ) ? "karma-container" : "karma-container-fluid";
		ob_start();
		?>
		<div class='karma-section karma-section-<?php echo esc_attr( $atts[ 'element_key' ] ); ?> <?php echo esc_attr( $atts[ 'extraClass' ] ); ?>'>
			<div class='<?php echo esc_attr( $container_class ); ?> karma-row karma-no-gutters'>
				<?php echo do_shortcode( $content ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<# var rowContainer = ('container' == data.changed.structure )?'karma-container':'karma-container-fluid'; #>"
			. "<div class='karma-section karma-section-{{data.attributes.shortcode_attributes.element_key}} {{data.changed.extra_class}}'>"
			. "<div class='{{rowContainer}} karma-row karma-no-gutters'>"
			. "</div>"
			. "</div>";
	}


	public function map() {

		$map = array(
			'setting-panel'    => array(
				"name"   => "Section",
				"params" => array(
					array(
						"name"	=> "structure",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "full",
						"field"	=> array(

							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'title'	=> "Full screen",
								'value'	=> "full",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'title'	=> "Container",
								'value'	=> "container"
							),

						)
					),
					array(
						"name"	=> "title",
						"type"	=> Karma_Builder_Setting_Panel::TITLE,
						"label"	=> esc_attr__( "Spacing", 'karma' ),
						'value'	=> 'Spacing'
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
						"name"			=> "extraClass",
						"type"			=> Karma_Builder_Setting_Panel::TEXT,
						"label"			=> __( "Class Name", 'karma' ),
						'placeholder'	=> __( 'Class name', 'karma' ),
						"group"			=> "Advance option"
					),


				)
			),
			'layout-panel'		=> array(
				'name'		=> __( 'Column Layout', 'karma' ),
				'params'	=> array(
					array(
						"type"	=> Karma_Builder_Setting_Panel::GRID,
					),
					array(
						"name"	=> "grid",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "full",
						"field"	=> array(

							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'title'	=> "Full screen",
								'value'	=> "full",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'title'	=> "Container",
								'value'	=> "container"
							),

						)
					),
				)
			),
			'background-panel'	=> array(),
		);

		parent::$elements_map[ 'karma_section' ] = $map;
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
						'type'		=> 'icon',
						'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),
						'form'		=> 'setting-panel',
						'className'	=> 'karma-element-setting',
					),
					array(
						'type'		=> 'icon',
						'icon'		=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/layout.svg' ),
						'form'		=> 'layout-panel',
						'className'	=> 'row-setting-layout',
					),
					array(
						'type'		=> 'text',
						'action'	=> 'open',
						'className'	=> 'row-setting-setting',
						'value'		=> esc_attr( 'Background', 'karma' )

					),
				)
			),
			array(
				"type"		=> "bothSpacingGizmo",
				"className"	=> "section-both-spacing",
			),
		);

		parent::$elements_gizmo[ 'karma_section' ] = $controllers;
		return parent::$elements_gizmo;

	}

	/**
	 * Load CSS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return    string    The style of element
	 */
	public function render_css() {

		$styles = "padding-top:" . $this->element_attributes[ 'space' ] . "px;padding-bottom:" . $this->element_attributes[ 'space' ] . "px;";
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


}