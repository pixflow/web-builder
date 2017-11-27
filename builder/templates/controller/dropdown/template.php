<div class="karma-dropdown-controller">
	<# if( "" != data.label  &&  "undefined" != typeof data.label ){ #>
		<div class="karma-dropdown-label">{{{ data.label }}}</div>
	<# } #>
	<input class="hidden-input dropdown-input" name="{{ data.name }}" value="{{ data.value }}">

	<div class="karma-dropdown-body">
		<div class="karma-dropdown-header">
			<div class="karma-dropdown-selected-item">{{{ data.value }}}</div>
			<div class="karma-dropdown-icon"><span class="karma-down-arrow">
			<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<title>Path 2 Copy 9</title>
				<desc>Created with Sketch.</desc>
				<defs></defs>
				<g id="all-Setting-pannel--style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
					<g class="bottom-arrow" transform="translate(-2725.000000, -776.000000)" stroke-width="2" stroke="#419CF8">
						<g id="Group-19" transform="translate(2715.000000, 762.000000)">
							<polyline id="Path-2-Copy-9" points="11 15 16 19 21 15"></polyline>
						</g>
					</g>
				</g>
			</svg>
		</span></div>
		</div>
		<ul class="karma-dropdown-options">
			<# for( var i in data.options){ #>
				<#  var itemClass = ( i == data.value ) ? "karma-dropdown-option  karma-selected-dropdown-option" : "karma-dropdown-option" ;#>
				<li class="{{itemClass}}" data-value="{{ i }}" >
					<# if( "" != data.options[ i ].icon  &&  "undefined" != typeof data.options[ i ].icon ){ #>
						<span class="karma-dropdown-option-icon">{{{ data.options[i].icon }}}</span>
					<# } #>
					<# if( "" != data.options[ i ].title  &&  "undefined" != typeof data.options[ i ].title ){ #>
						<span class="karma-dropdown-option-title">{{{ data.options[i].title }}}</span>
					<# } #>
				</li>
			<# } #>
		</ul>
	</div>
</div>
