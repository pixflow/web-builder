<?php

namespace KarmaBuilder\TypographyManager ;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;

/**
 * The file for management typography and default fonts
 *
 * A class definition that includes base attributes and functions of a typography manager
 *
 * @link       http://pixflow.net
 * @since      0.1.1
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Typography class.
 *
 * This includes base attributes and functions of a Typography class.
 *
 *
 * @since      0.1.1
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */

class Karma_Typography{

	CONST KARMA_FONT_OPTION = 'karma-builder-font-option' ;

	CONST KARMA_FONT_TRANSIENT = 'karma-builder-font-transient' ;

	CONST KARMA_CUSTOM_FONT_OPTION = 'karma-builder-custom-font-option' ;

	CONST KARMA_CUSTOM_FONT_TRANSIENT = 'karma-builder-custom-font-transient' ;

	CONST KARMA_HEADING_OPTION = 'karma-builder-heading-option' ;

	CONST KARMA_HEADING_TRANSIENT = 'karma-builder-heading-transient' ;

	/**
	 * It is an array that contains default fonts in builder
	 *
	 * @since    0.1.1
	 * @access   protected
	 * @var      array    $builder_default_fonts    Default fonts.
	 */
	protected $builder_default_fonts = array(

        'poppins'       => array( '200 Normal', '300 Normal', '400 Normal' ),
        'HelveticaNeue' => array( '400 Normal' ),
		'arial'         => array( '400 Normal', '200 Normal' ),
		'courier'       => array( '100 Normal', '400 Normal', '300 Normal' ),
		'sans-serif'    => array( '400 Normal' ),
		'monospace'     => array( '400 Normal' ),
	);

    /**
     * It is an array that contains default fonts in different OS and browser
     *
     * @since    0.1.1
     * @access   protected
     * @var      array    $web_default_fonts    Default fonts.
     */
    public $web_default_fonts = array(

        'HelveticaNeue' => array( '400 Normal' ),
        'arial'         => array( '400 Normal', '200 Normal' ),
        'courier'       => array( '100 Normal', '400 Normal', '300 Normal' ),
        'sans-serif'    => array( '400 Normal' ),
        'monospace'     => array( '400 Normal' ),
    );

	/**
	 * It is an array that contains custom fonts with their url and name in builder
	 *
	 * @since    0.1.1
	 * @access   protected
	 * @var      array    $builder_default_custom_fonts    Custom fonts.
	 */
	protected $builder_default_custom_fonts = array();

	/**
	 * It is an array that contains Custom heading and paragraph format.
	 *
	 * @since    0.1.1
	 * @access   protected
	 * @var      array    $builder_default_heading_format    Custom heading and paragraph format.
	 */
	protected $builder_default_heading_format = array(
		'h1'    => array(
			'font-size'     => '60' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '400' ,
		),
		'h2'    => array(
			'font-size'     => '46' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '400' ,
		),
		'h3'    => array(
			'font-size'     => '38' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '300' ,
		),
		'h4'    => array(
			'font-size'     => '28' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '300' ,
		),
		'h5'    => array(
			'font-size'     => '22' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '300' ,
		),
		'h6'    => array(
			'font-size'     => '18' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '200' ,
		),
		'p'     => array(
			'font-size'     => '15' ,
			'font-family'   => 'poppins' ,
			'font-varients' => '300' ,
		),

	);

	/**
	 * It is an array that contains Custom heading and paragraph format and
	 * Custom fonts and default fonts in builder.
	 *
	 * @since    0.1.1
	 * @access   protected
	 * @var      array    $typography_model
	 */
	public $typography_model = array(
		'headings'      => array(),
		'fonts'         => array(),
		'customFonts'  => array(),
	);

	/**
	 * A static variable that contains an instance of Karma_Builder
	 *
	 * @since    0.1.1
	 * @access   private
	 * @var      File_System    $instance    The reference to *Singleton* instance of this class.
	 */
	private static $instance;

	/**
	 * Init this class.
	 *
	 * @access   public
	 * @since    0.1.1
	 */
	public function __construct(){

		$this->read_typography_font_formats();
		
	}

	/**
	 * Returns the *Singleton* instance of this class.
	 *
	 * @access   public
	 * @return   object The *Singleton* instance.
	 * @since    0.1.1
	 */
	public static function get_instance() {

		if ( null === Karma_Typography::$instance ) {
			Karma_Typography::$instance = new Karma_Typography();
		}

		return Karma_Typography::$instance;

	}

	/**
	 * Add font types to allowed file types for upload in media library
	 *
	 * @param array $existing_mimes Allow upload fonts type
	 *
	 * @access   public
	 * @return   array  list of allowed files types to upload
	 * @since    0.1.1
	 */
	public function allow_upload_fonts( $existing_mimes = array() ) {

		if( self::check_typography_page() ){
			$existing_mimes = array();
		}
		$existing_mimes[ 'woff2' ]  = 'application/x-font-woff2';
		$existing_mimes[ 'woff' ]  = 'application/x-font-woff';
		$existing_mimes[ 'ttf' ]   = 'application/x-font-ttf';
		$existing_mimes[ 'eot' ]   = 'application/x-font-eot';
		return $existing_mimes;

	}

	/**
	 * Check the current page is typography page or not
	 *
	 * @access   public
	 * @since    0.1.1
	 * @return   bool
	 */
	public static function check_typography_page(){

		if( isset( $_GET['builder-page'] ) && 'karma-typography-page' === $_GET['builder-page'] ){
			return true ;
		}

		return false;

	}

	/**
	 * Load the basic templates of typography
	 *
	 * @access   public
	 * @since    0.1.1
	 * @return   void
	 */
	public function load_page_templates(){

		$builder_views = Karma_Factory_Pattern::$builder_views;
		$builder_views->load_typography_environment();

	}

	/**
	 * Call and set the typography model in builder
	 *
	 * @access   public
	 * @since    0.1.1
	 * @return   void
	 */
	public function read_typography_font_formats(){

		$this->get_default_fonts()->get_headings_format()->get_custom_fonts();
		$this->typography_model = ( object ) $this->typography_model;

	}

	/**
	 * Get and set default fonts
	 *
	 * @access   protected
	 * @since    0.1.1
	 * @return   object The *Singleton* instance.
	 */
	protected function get_default_fonts(){

		$font_list = get_transient( $this::KARMA_FONT_TRANSIENT );
		if ( false === $font_list ) {
			$font_list = get_option( $this::KARMA_FONT_OPTION, $this->builder_default_fonts );
		} else {
			$font_list = json_decode( $font_list, true );
		}

		$this->typography_model['fonts'] =  $font_list;
		return $this;

	}

	/**
	 * Get and set headings formats
	 *
	 * @access   protected
	 * @since    0.1.1
	 * @return   object The *Singleton* instance.
	 */
	protected function get_headings_format(){

		$heading_format = get_transient( $this::KARMA_HEADING_TRANSIENT );

		if ( false === $heading_format ) {
			$heading_format = get_option( $this::KARMA_HEADING_OPTION, $this->builder_default_heading_format );
		} else {
			$heading_format = json_decode( $heading_format, true );
		}

		$this->typography_model['headings'] =  $heading_format;
		return $this;

	}

	/**
	 * Get list of custom fonts and add to typography model array
	 *
	 * @access   protected
	 * @since    0.1.1
	 * @return   object The *Singleton* instance
	 */
	protected function get_custom_fonts() {

		$custom_fonts = get_transient( $this::KARMA_CUSTOM_FONT_TRANSIENT );
		if ( false === $custom_fonts || '' === $custom_fonts) {
			$custom_fonts = get_option( $this::KARMA_CUSTOM_FONT_OPTION, $this->builder_default_custom_fonts );
		} else {
			$custom_fonts = json_decode( $custom_fonts, true );
		}

		$this->typography_model[ 'customFonts' ] = $custom_fonts;

		return $this;

	}

	/**
	 * Save typography font formats
	 *
	 * @param string    $typography Heading format
	 *
	 * @access   public
	 * @since    0.1.1
	 * @return   object The *Singleton* instance
	 */
	public function save_typography_font_formats( $typography ){

		update_option( $this::KARMA_HEADING_OPTION, $typography );
		set_transient( $this::KARMA_HEADING_TRANSIENT, $typography, 0 );
		return $this;

	}

	/**
	 * Save font formats
	 *
	 * @param string    $fonts Font format
	 *
	 * @access   public
	 * @since    0.1.1
	 * @return   object The *Singleton* instance
	 */
	public function save_fonts( $fonts ){

		update_option( $this::KARMA_FONT_OPTION, $fonts );
		set_transient( $this::KARMA_FONT_TRANSIENT, $fonts, 0 );
		return $this;

	}

	/**
	 * save custom fonts
	 *
	 * @param string    $custom_fonts Custom format
	 *
	 * @since 0.1.1
	 * @return   object The *Singleton* instance
	 */
	public function save_custom_fonts( $custom_fonts ){

		update_option( $this::KARMA_CUSTOM_FONT_OPTION, $custom_fonts );
		set_transient( $this::KARMA_CUSTOM_FONT_TRANSIENT, $custom_fonts, 0 );
		return $this;

	}

}