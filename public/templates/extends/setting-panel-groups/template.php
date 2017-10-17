
<div class="karma-setting-panel-group-container">
	<button class="karma-setting-panel-group-button">
		<p>{{ data.title }}</p>
		<div class="karma-group-button-shape"></div>
	</button>
	<div class="karma-group-panel">
		<# _.each( data.items, function( field ){ #>
			{{{ field }}}
		<# } ); #>

	</div>
</div>