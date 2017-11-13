<div class="karma-switch-panel-container">
	<button class="karma-switch-panel-button" data-action="{{ data.action }}" data-form="{{ data.form }}">
		<div class="karma-switch-panel-shape"></div>
		<p>{{ data.text }}</p>
	</button>
	<#
			if ( true == data.formBuilder ){ #>
	<div id="new-form-builder-panel" data-height="{{ data.height }}">

		<# print( data.view.formBuilderContentHtml( data.form ) ); #>
	</div>
		<#	} #>
</div>