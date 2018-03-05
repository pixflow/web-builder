<# var i = 0; _.each( data.blocks, function( block ){;#>
<div data-block-id="{{ i++ }}" class="karma-section-element" style="height:{{ block.height }}px"  >
	<div class="karma-section-hover">
		<div class="karma-hover-container">
			<span class="karma-section-hover-icon"></span>
			<span class="karma-section-hover-text"><?php echo esc_attr__("Drag it", 'karma');?></span>
		</div>
	</div>
		<img class="karma-section-image" src="{{ block.image }}" width="240" height="{{ block.height }}">
</div>
<# }); #>