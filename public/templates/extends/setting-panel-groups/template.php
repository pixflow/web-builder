
<div class="setting-panel-group-container">
	<button class="setting-panel-group-button">
		<p>{{ data.title }}</p>
		<div class="group-button-shape"></div>
	</button>
	<div class="panel">
		<# _.each( data.items, function( field ){ #>
			{{{ field }}}
		<# } ); #>

	</div>
</div>