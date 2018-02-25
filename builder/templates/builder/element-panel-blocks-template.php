<# var i = 0; _.each( data.blocks, function( block ){;#>
<div data-block-id="{{ i++ }}" class="karma-section-element" >
	<div class="karma-section-hover">
		<div class="karma-hover-container">
			<span class="karma-section-hover-icon"></span>
			<span class="karma-section-hover-text">Drag it</span>
		</div>
	</div>
		<img class="karma-section-image" src="{{ block.image }}" width="240" height="{{ block.height }}">
</div>
<# }); #>