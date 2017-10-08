<?php

class Karma_Column {

	public function __construct() {

		add_filter( 'karma_elements_map', array( $this, 'map' ) );
		add_shortcode( 'karma_column', array( $this, 'render' ) );

	}

	public function render( $atts, $content ) {

		return "<div class='karma_column'> $content </div>";

	}

	public function js_render() {

		return "<div class='karma_column'> {{ attributes.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			"name"		=> "Column",
			"params"	=> array(

				array(
					"name"		=> "width",
					"type"		=> "select_image",
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',
					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),

				array(
					"name"		=> "space",
					"type"		=> "range_slider",
					"label"		=> esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'min'	=> 0,
						'max'	=> 600,
						'step'	=> 1,
						'unit'	=> 'px'
					)
				)

			,array(
					"name"		=> "extra_class",
					"type"		=> "text",
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);
		$elements_map['karma_column'] = $map;
		return $elements_map;

	}

}