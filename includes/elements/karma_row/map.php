<?php
/**
 * Add karma_row element filter to karma_elements_map hook
 *
 * @param array		$elements_map - elements map array
 *
 * @return array
 * @since 1.0.0
 */
function karma_element_row_map( $elements_map ) {

	$map = array(
		"name"		=> "Row",
		"params"	=> array(

			array(
				"name"		=> "structure",
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
	$elements_map['karma_row'] = $map;
	return $elements_map;

}
add_filter( 'karma_elements_map', 'karma_element_row_map' );