<?php
use KarmaBuilder\TypographyManager\Karma_Typography as Karma_Typography;
// Get the list of fonts
$typography = Karma_Typography::get_instance();
$font_list = $typography->typography_model->fonts;
$custom_font_list = $typography->typography_model->customFonts;
$font_list = array_merge( $font_list, $custom_font_list );

?>
<div class="karma-google-fonts">
	<div class="karma-font-manger-box-style karma-google-fonts-title">
		<div class="google-icon" >
			<svg width="20px" height="20px"><g id="google-logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="e206" fill-rule="nonzero"> <g id="e205" transform="translate(4.000000, 5.000000)"> <path d="M14.8313672,6.11227099 L7.64941406,6.11227099 L7.64941406,8.88601145 L11.8650586,8.88601145 C11.7800977,9.57532443 11.3211328,10.613416 10.3011914,11.3109733 L10.2868945,11.4038359 L11.6723314,12.4525371 L12.5576953,13.1227099 L12.7150195,13.1380534 C14.1598828,11.8341985 14.9928516,9.91580153 14.9928516,7.64032443 C14.9928516,7.02578244 14.9418164,6.57732824 14.8313672,6.11227099 Z" id="e201" fill="#4285F4"></path> <path d="M7.64941406,14.9484733 C9.71472656,14.9484733 11.4485742,14.2840649 12.7150195,13.1380534 L10.3011914,11.3109733 C9.65525391,11.751126 8.78830078,12.0583969 7.64941406,12.0583969 C5.62658203,12.0583969 3.90972656,10.7545992 3.29771484,8.95248092 L3.20800781,8.95992366 L0.846796875,10.7454389 L0.815917969,10.829313 C2.07380859,13.2708779 4.65761719,14.9484733 7.64941406,14.9484733" id="e202" fill="#34A853"></path> <path d="M3.29771484,8.95248092 C3.13623047,8.48742366 3.04277344,7.98910305 3.04277344,7.47423664 C3.04277344,6.95931298 3.13623047,6.46104962 3.28921875,5.99599237 L3.28494141,5.89694656 L0.894140625,4.08274809 L0.815917969,4.11910305 C0.297480469,5.13229008 0,6.27005725 0,7.47423664 C0,8.67841603 0.297480469,9.81612595 0.815917969,10.829313 L3.29771484,8.95248092" id="e203" fill="#FBBC05"></path> <path d="M7.64941406,2.89001908 C9.08578125,2.89001908 10.0546875,3.49625954 10.607168,4.00288168 L12.7659961,1.94330153 C11.4401367,0.739122137 9.71472656,0 7.64941406,0 C4.65761719,0 2.07380859,1.67753817 0.815917969,4.11910305 L3.28921875,5.99599237 C3.90972656,4.19387405 5.62658203,2.89001908 7.64941406,2.89001908" id="e204" fill="#EB4335"></path> </g> </g> </g></svg>
		</div>
		<div class="karma-google-title"><?php _e( 'Add Google Fonts', 'karma' ); ?></div>
		<div class="karma-dropdown-icon" >
				<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g id="drop-down-all-Setting-pannel--style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<g class="bottom-arrow" transform="translate(-2725.000000, -776.000000)" stroke-width="2" stroke="#419CF8">
							<g id="drop-down-Group-19" transform="translate(2715.000000, 762.000000)">
								<polyline id="drop-down-Path-2-Copy-9" points="11 15 16 19 21 15"></polyline>
							</g>
						</g>
					</g>
				</svg>
			</span>
		</div>
	</div>
	<div class="karma-google-fonts-list">
		<div class="right-side">
			<div class="karma-fonts-search" >
				<input type="text" id="karma-fonts-search-input" placeholder="<?php _e( ' Search in 848 font families', 'karma' ); ?>">
				<i></i>
			</div>
			<div class="karma-google-fonts-holder">
				<ul></ul>
			</div>
		</div>
		<div class="left-side">
			<div class="current-font-weight" >
				<ul></ul>
				<button class="karma-add-to-library"><?php _e( 'Add to library', 'karma' ); ?></button>
			</div>
		</div>
	</div>
</div>
<div class="karma-fonts-list" >

	<?php
		foreach( $font_list as $font_name => $variants ):
			if ( !is_array( $variants ) ) {
				$variants = array('regular');
			}
			?>
				<div class="karma-font-list karma-font-manger-box-style">
					<div class="karma-font-name-part" >
						<span class="karma-font-name" data-font-name="<?php echo $font_name ; ?>" style="font-family: <?php echo $font_name ; ?>;"><?php echo ucfirst( $font_name ) ; ?></span>
						<span class="karma-font-weight-count" >
							<span><?php echo count( $variants ); ?> Styles</span>
						<span class="karma-drop-down-icon">
						<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="drop-down-all-Setting-pannel--style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
							<g class="bottom-arrow" transform="translate(-2725.000000, -776.000000)" stroke-width="2" stroke="#419CF8">
								<g id="drop-down-Group-19" transform="translate(2715.000000, 762.000000)">
									<polyline id="drop-down-Path-2-Copy-9" points="11 15 16 19 21 15"></polyline>
								</g>
							</g>
						</g>
					</svg>
					</span>
				</span>
						<span class="karma-delete-font">
					<svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="delete-element" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="delete-element-icon" transform="translate(-482.000000, -11.000000)" fill="#394959"> <path d="M485.714286,12.625 L482.8125,12.625 L482.8125,12.625 C482.363769,12.625 482,12.9887686 482,13.4375 C482,13.8862314 482.363769,14.25 482.8125,14.25 L494.1875,14.25 C494.636231,14.25 495,13.8862314 495,13.4375 C495,12.9887686 494.636231,12.625 494.1875,12.625 L491.285714,12.625 L491.285714,12 C491.285714,11.4477153 490.837999,11 490.285714,11 L486.714286,11 C486.162001,11 485.714286,11.4477153 485.714286,12 L485.714286,12 L485.714286,12.625 Z M484.166667,15.3333333 L492.833333,15.3333333 L492.833333,23 C492.833333,23.5522847 492.385618,24 491.833333,24 L485.166667,24 C484.614382,24 484.166667,23.5522847 484.166667,23 L484.166667,15.3333333 Z" id="A124"></path> </g> </g></svg>
				</span>
					</div>
					<div class="karma-font-details-part" >
						<ul style="font-family: <?php echo $font_name ; ?>">
							<?php
								foreach( $variants as $variant ):
									?>
										<li> <?php echo $variant; ?> </li>
									<?php
								endforeach;;
							?>
						</ul>
					</div>
				</div>
			<?php
		endforeach;
	?>
</div>
<div class="karma-footer-info">
	<div class="karma-upload-custom-font">
		<span>
			<svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="Setting-pannel" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="background-pannel1" transform="translate(-1124.000000, -508.000000)">
						<g id="Group" transform="translate(1124.000000, 508.000000)">
							<g id="Group-31">
								<rect id="Rectangle-2-Copy-23" fill="#E8F3FE" x="0" y="0" width="26" height="26" rx="13"></rect>
								<g id="Group-Copy-3" transform="translate(6.000000, 6.000000)" fill-rule="nonzero" fill="#419CF8">
									<path d="M7,0 C8.08926087,0 9.1844413,0.441607342 10.0149457,1.32444997 C10.6325739,1.98098491 11.0069978,2.79544994 11.1657609,3.64474274 C12.7774196,3.97708666 14,5.47330562 14,7.2793817 C14,9.32842877 12.427587,10.9999513 10.5,10.9999513 L8.82608696,10.9999513 C8.66144882,11.0024264 8.50831068,10.9104755 8.42531213,10.7593083 C8.34231357,10.6081411 8.34231357,10.421178 8.42531213,10.2700109 C8.50831068,10.1188437 8.66144882,10.0268928 8.82608696,10.0293679 L10.5,10.0293679 C11.9341174,10.0293679 13.0869565,8.80387699 13.0869565,7.2793817 C13.0869565,5.83969922 12.0569674,4.66681555 10.7377717,4.53950736 C10.5246407,4.51743014 10.3545812,4.34085755 10.3288043,4.11487714 C10.2448043,3.34567365 9.92461522,2.59835681 9.36820652,2.00688331 C8.71300652,1.31040886 7.85798696,0.970591452 7,0.970591452 C6.14201304,0.970591452 5.29238043,1.3096971 4.63655652,2.00688331 C3.87866957,2.81251603 3.55796304,3.90709142 3.67594348,4.95402734 C3.69228064,5.09199351 3.6521638,5.23078187 3.5657676,5.33519221 C3.47937139,5.43960255 3.3549955,5.49960466 3.22418478,5.49998048 L3.04347826,5.49998048 C1.85531957,5.49998048 0.913043478,6.50163707 0.913043478,7.76467338 C0.913043478,9.02770969 1.85531957,10.0293679 3.04347826,10.0293679 L5.17391304,10.0293679 C5.33855118,10.0268928 5.49168932,10.1188437 5.57468787,10.2700109 C5.65768643,10.421178 5.65768643,10.6081411 5.57468787,10.7593083 C5.49168932,10.9104755 5.33855118,11.0024264 5.17391304,10.9999513 L3.04347826,10.9999513 C1.36528913,10.9999513 0,9.54862178 0,7.76467338 C0,6.08100242 1.22016087,4.71039474 2.76766304,4.55972785 C2.76051087,3.38870284 3.15178043,2.21526756 3.98981739,1.32444997 C4.8195913,0.44233528 5.91073913,0 7,0 Z" id="Shape"></path>
									<path d="M7.00050705,5 C7.14335612,5 7.2188796,5.05363335 7.29060406,5.13020003 L8.86162967,6.79686543 C9.043026,6.99333214 9.03986966,7.31218222 8.8884228,7.50519893 C8.73696165,7.69821564 8.44760729,7.71218231 8.28143563,7.53644894 L7.42896857,6.63019872 L7.42896857,11.4999999 C7.42896857,11.7761333 7.23717491,12 7.00050705,12 C6.7638249,12 6.57204552,11.7761333 6.57204552,11.4999999 L6.57204552,6.63019872 L5.71957846,7.53644894 C5.5534068,7.71218231 5.27277878,7.68836564 5.11259129,7.50519893 C4.94379173,7.31218222 4.97469809,6.97451547 5.13938442,6.79686543 L6.71041003,5.13020003 C6.79527397,5.03951501 6.85765797,5 7.00050705,5 Z" id="Shape"></path>
								</g>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</span>
		Upload custom fonts
	</div>
	<div class="karma-pay-attention">
		Your website will be faster if you choose less font weight.
	</div>
</div>