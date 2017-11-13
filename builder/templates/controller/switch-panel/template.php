<div class="karma-switch-panel-container">
	<button class="karma-switch-panel-button" type="button" data-action="{{ data.action }}" data-form="{{ data.form }}" >
		<# if ( "yes" == data.shape ) { #>
			<div class="karma-switch-panel-shape"></div>
		<#	} #>
		<p>{{ data.text }}</p>
	</button>
	<#	if ( true == data.formBuilder ){ #>
			<div id="new-form-builder-panel" data-height="{{ data.height }}">
			<# print( data.view.formBuilderContentHtml( data.form ) ); #>
			</div>
	<#	} #>
</div>