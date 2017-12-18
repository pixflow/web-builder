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
	static function get_element_default_attributes(){

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

		$block = '' ;
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
			'js' => array()
		);

		return $dependencies ;

	}


}