<?php
use KarmaBuilder\TypographyManager\Karma_Typography as Karma_Typography;
// Get the list of headings
$typography = Karma_Typography::get_instance();
$headings = $typography->typography_model->headings ;
$font_list = $typography->typography_model->fonts ;
$custom_font_list = $typography->typography_model->customFonts;
$font_list = array_merge( $font_list, $custom_font_list );
$heading_default_text = array(
	'h1'    => array(
		'title'  => 'Heading 1' ,
		'text'   => 'The most advanced' ,
	),
	'h2'    => array(
		'title'  => 'Heading 2' ,
		'text'   => 'Customize you layout section' ,
	),
	'h3'    => array(
		'title'  => 'Heading 3' ,
		'text'   => 'The most advanced frontend drag & drop page' ,
	),
	'h4'    => array(
		'title'  => 'Heading 4' ,
		'text'   => 'Create high-end,pixel perfect websites at record speeds.' ,
	),
	'h5'    => array(
		'title'  => 'Heading 5' ,
		'text'   => 'The most advanced frontend drag & drop page builder. Create high-end, pixel perfect websites at record speed.' ,
	),
	'h6'    => array(
		'title'  => 'Heading 6' ,
		'text'   => 'Karma’s page sections make up the basic architecture of the page, and allow you to reach a level of design reserved until now for high budget custom designed websites.' ,
	),
	'p'     => array(
		'title'  => 'Paragraph' ,
		'text'   => 'The most advanced frontend drag & drop page builder. Create high-end, pixel perfect websites at record speeds. Any theme, any page, any design. Allow you to easily create pages like a true professional without programming knowledge required.' ,
	),

);
?>


<?php
	foreach ( $headings as $tag => $info ):
	?>
		<div class="karma-typography-box" data-heading="<?php echo $tag; ?>">
			<div class="karma-typography-box-title"><?php echo esc_attr__( $heading_default_text[ $tag ]['title'], 'karma' ); ?></div>
			<div class="karma-typography-text" style="font-size: <?php echo $info['font-size']; ?>px;font-family:<?php echo $info['font-family']; ?>; font-weight:<?php echo $info['font-varients']; ?> ">
				<?php echo esc_attr__( $heading_default_text[ $tag ]['text'], 'karma' ); ?>
			</div>
			<div class="karma-typography-styles">
				<div class="karma-typography-font">
					<div class="karma-controller karma-controller-action">
						<div class="karma-dropdown-controller">
							<div class="karma-dropdown-body">
								<div class="karma-dropdown-header">
									<div class="karma-dropdown-selected-item"><?php echo $info['font-family']; ?></div>
									<div class="karma-dropdown-icon">
											<span class="karma-down-arrow">
											<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1"
											     xmlns="http://www.w3.org/2000/svg"><defs></defs><g
													id="drop-down-all-Setting-pannel--style-guide" stroke="none"
													stroke-width="1" fill="none" fill-rule="evenodd"
													stroke-linecap="round" stroke-linejoin="round"><g
														class="bottom-arrow"
														transform="translate(-2725.000000, -776.000000)"
														stroke-width="2" stroke="#419CF8"><g id="drop-down-Group-19"
											                                                 transform="translate(2715.000000, 762.000000)"><polyline
																id="drop-down-Path-2-Copy-9"
																points="11 15 16 19 21 15"></polyline></g></g></g></svg>
											</span>
									</div>
								</div>
								<ul class="karma-dropdown-options karma-font-family-list" style="top: 629px; left: 742px;">
									<?php
										foreach ( array_keys( $font_list ) as $font_name ):
											$selected_class = ( strtolower( $font_name ) == strtolower( $info['font-family'] ) ) ? 'karma-selected-dropdown-option' : '';
											?>
												<li class="karma-dropdown-option <?php echo $selected_class; ?>"
												    data-value="<?php echo $font_name; ?>">
													<span class="karma-dropdown-option-title">
														<?php echo $font_name; ?>
													</span>
												</li>
											<?php
										endforeach;
									?>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="karma-typography-weight">
					<div class="karma-controller karma-controller-action">
						<div class="karma-dropdown-controller">
							<div class="karma-dropdown-body">
								<div class="karma-dropdown-header">
									<div class="karma-dropdown-selected-item"><?php echo $info['font-varients']; ?></div>
									<div class="karma-dropdown-icon">
											<span class="karma-down-arrow">
											<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1"
											     xmlns="http://www.w3.org/2000/svg"><defs></defs><g
													id="drop-down-all-Setting-pannel--style-guide" stroke="none"
													stroke-width="1" fill="none" fill-rule="evenodd"
													stroke-linecap="round" stroke-linejoin="round"><g
														class="bottom-arrow"
														transform="translate(-2725.000000, -776.000000)"
														stroke-width="2" stroke="#419CF8"><g id="drop-down-Group-19"
											                                                 transform="translate(2715.000000, 762.000000)"><polyline
																id="drop-down-Path-2-Copy-9"
																points="11 15 16 19 21 15"></polyline></g></g></g></svg>
											</span>
									</div>
								</div>
								<ul class="karma-dropdown-options karma-font-varients-list" style="top: 629px; left: 742px;">
									<?php
									$font_name = ( 'HelveticaNeue' == $info['font-family'] ) ? $info['font-family'] : strtolower( $info['font-family'] );
									foreach (  $font_list[ $font_name ] as $font_varients ):
										if ( !is_array( $font_varients ) ) {
											$font_varients = 'regular';
										}
										$selected_class = ( strtolower( $font_varients ) == strtolower( $info['font-varients'] ) ) ? 'karma-selected-dropdown-option' : '';

										?>
										<li class="karma-dropdown-option <?php echo $selected_class; ?>"
										    data-value="<?php echo $font_varients; ?>">
													<span class="karma-dropdown-option-title">
														<?php echo $font_varients; ?>
													</span>
										</li>
									<?php
									endforeach;
									?>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="karma-typography-size">
					<div class="karma-range-slider-container controller-separator">
						<div class='karma-range-slider-container'>
							<div class="karma-range-slider-content">
								<input type="range" class="karma-range-slider-range no-trigger" value="<?php echo $info['font-size']; ?>" min="10"
								       max="150">
								<div class="karma-range-slider-number">
									<input type="number"
									       class="karma-range-slider-input karma-input-number-type-input"
									       name="typography-input" value="<?php echo $info['font-size']; ?>" min="10" max="150">
									<label class="karma-unit karma-input-number-type-unit">px</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php
	endforeach;
?>
