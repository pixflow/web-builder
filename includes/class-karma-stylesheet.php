<?php
namespace KarmaBuilder\Stylesheet ;


/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;
use KarmaBuilder\TypographyManager\Karma_Typography as Karma_Typography;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the stylesheet class
 *
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Stylesheet class
 * A class definition that for managing CSS attributes
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */


class Karma_Stylesheet {

	/**
	 * Create CSS blocks .
	 *
	 * @param    array  $element_attributes CSS attribute of elements
	 * @since    0.1.0
	 *
	 * @return string CSS blocks
	 */
	public function create_css_block( array $element_attributes ){

		if( empty( $element_attributes['css'] ) ){
			return '';
		}
		$css_block = '' ;
		foreach ( $element_attributes['css'] as $element_style ){
			$prefix = isset( $element_style["prefix"] ) ? $element_style["prefix"] : '' ;
			$postfix = isset( $element_style["postfix"] ) ? $element_style["postfix"] : '' ;
			$selector = $this->create_selector( $element_attributes['selector'], $prefix, $postfix );
			$property = $this->parse_property( $element_style['property'] );
			$css_block .= $selector . '{' . $property . '}';
		}

		return $css_block;

	}

	/**
	 * Create CSS selector .
	 *
	 * @param    string $selector   Element selector
	 * @param    string $prefix     Element prefix
	 * @param    string $postfix    Element postfix
	 *
	 *
	 * @since    0.1.0
	 *
	 * @return string Element selector
	 */
	protected function create_selector( $selector, $prefix, $postfix ){

		return $prefix . $selector . $postfix;

	}

	/**
	 * Create CSS property and value for each element .
	 *
	 * @param    array  $attributes CSS attribute of elements
	 * @since    0.1.0
	 *
	 * @return string CSS properties
	 */
	protected function parse_property( array $attributes ){

		$selector_content = '';
		foreach ( $attributes as $property => $value ){
			$selector_content .= $property . ':' . $value . ';';
		}
		return $selector_content;

	}

	/**
	 * Create default styles for elements
	 *
	 * @since    0.1.0
	 *
	 * @return string CSS properties
	 */
	public function create_default_styles(){

		$builder_instance = Karma_Factory_Pattern::$builder_loader;
		$elements = apply_filters( 'karma_elements', $builder_instance::$element_filename );
		$block = '';
		foreach ( $elements as $element ){
			$class_name = Karma_Factory_Pattern::$builder->get_element_valid_name( $element );
			$class_name = '\\KarmaBuilder\Elements\\Karma_' . $class_name;
			if ( class_exists( $class_name ) ) {
				$class_name::$element_attributes = $class_name::get_element_default_attributes();
				$elements_style_attributes = array(
					'selector' =>  '.karma-builder-element[data-name="' . strtolower( $class_name::$element_name ) . '"]',
					'css'      =>   $class_name::get_css_attributes()
				);
				$block .= $this->create_css_block( $elements_style_attributes );
			}
		}

		ob_start();
		?>
			<style id="karma-global-elements-style">
				<?php echo $block; ?>
			</style>
		<?php
		return ob_get_flush();

	}

	/**
	 * Create global css file that need to load in builder in frontend
	 *
	 * @since    0.1.1
	 * @return string CSS string
	 *
	 */
	public function create_global_css_file(){

		$typography = Karma_Typography::get_instance();

		$css_content  = $this->create_custom_font_link( $typography->typography_model->customFonts );
		$css_content .= $this->create_heading_css_file( $typography->typography_model->headings );;
		return $css_content;

	}

    /**
     * Create global css file that need to load in builder in frontend
     *
     * @param array $custom_font uploaded user fonts
     *
     * @since    0.1.1
     * @return string CSS string
     *
     */
	private function create_custom_font_link( $custom_font ){

	    $load_custom_font = '';
	    foreach ( $custom_font as $key => $value ) {

            $load_custom_font = '@font-face {';
            $load_custom_font .= 'font-family:"' . $key . '";';
		    $load_custom_font .= "src: url('". $value ."') ";
            $load_custom_font .= '}';

        }
        return $load_custom_font;
    }

    /**
	 * Create heading css format that need to load in builder in frontend
	 *
	 * @param array $headings   Headings format
	 *
	 * @since    0.1.1
	 * @return string CSS string
	 *
	 */
	private function create_heading_css_file( $headings ){

		$headings_style = '' ;
		$headings_min_size_in_responsive = array(
			'h1'    => '42',
			'h2'    => '35',
			'h3'    => '28',
			'h4'    => '24',
			'h5'    => '20',
			'h6'    => '16',
			'p'     => '14',
		);
		foreach ( $headings as $tag => $info ){
			if ( 'p' == $tag ){
				$headings_style .= '.karma-builder-environment a,';
			}
			$headings_style .= $tag . '[class *= "tag" ]{' ;
			foreach ( $info as $property => $value ){
				if( 'font-varients' == $property  ){
					$explode = explode( ' ', $value );
					$headings_style .= 'font-weight:' . $explode[0] . ';' ;
					if( isset( $explode[1] ) ){
						$headings_style .= 'font-style:' . strtolower( $explode[1] ) . ';' ;
					}
				}else if ( 'font-size' == $property ) {
					$headings_style .= $property . ':';
					$headings_style .= 'calc( ' . $headings_min_size_in_responsive[ $tag ] . 'px + (' . $value . ' - ' . $headings_min_size_in_responsive[ $tag ] . ') * ((100vw - 768px) / (1920 - 768)));';
				}else{
					$headings_style .= $property . ':' . $value . ';' ;
				}
			}
			$headings_style .= '}';
		}
		return $headings_style;

	}

    /**
     * Create fonts link to enqueue
     *
     * @since    0.1.1
     *
     * @return string CSS string
     *
     */
    //@TODO - refine ( Use built-in PHP function )
    public function create_google_font_link(){

        $typography = Karma_Typography::get_instance();
        $result = $this->check_diff_multi_dimensional_array( $typography->typography_model->fonts, $typography->web_default_fonts );
        return $this->create_fonts_ink( $result );

    }

    /**
     * Returns an array that contains difference between 2 arrays
     *
     * @param array $arr1
     * @param array $arr2
     *
     * @since    0.1.1
     * @return array
     *
     */
    private function check_diff_multi_dimensional_array( $arr1, $arr2 ){

        $check = ( is_array( $arr1 ) && count( $arr1 ) > 0 ) ? true : false;
        $result = ( $check ) ? ( ( is_array( $arr2 ) && count( $arr2 ) > 0 ) ? $arr2 : array() ) : array();
        $new_result = array();
        if( $check ){
            foreach( $arr1 as $key => $value ){
                if( !isset( $result[ $key ] ) ){
                    $new_result[ $key ] = $value;
                }
            }
        }
        return $new_result;
    }

    /**
     * Create google font link
     *
     * @param array $fonts saved fonts
     *
     * @since    0.1.1
     * @return string
     *
     */
	private function create_fonts_ink( $fonts ){

	    $link = 'https://fonts.googleapis.com/css?family=';
	    $temp_font = $fonts;
	    end( $temp_font );

        foreach( $fonts as $font => $variant ) {

            $link_font = ucwords( $font );
            $link_font = str_replace(' ', '+', $link_font);
            $link  .= $link_font;
            $variant_link = ':';

            foreach( $variant as $index => $key ){

                $font_variant = explode( " ", $key );
                $variant_link .= $font_variant[ 0 ];
                if ( 'italic' == $font_variant[ 1 ] ){
                    $variant_link .= 'i';
                }
                if( $key != $variant[ count( $variant ) - 1 ] ){
                    $variant_link .= ',';
                }
            }
            $link .= $variant_link;
            if ( $font != key( $temp_font ) ) {
                $link .= '|';
            }

        }
        return ( 'https://fonts.googleapis.com/css?family=' == $link ) ? '' : $link;
    }

}