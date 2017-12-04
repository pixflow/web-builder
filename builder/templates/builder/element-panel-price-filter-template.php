
<div class="karma-element-panel-price-filter-container">
	<div class="karma-element-panel-price-filter-title"></div>
	<div class="karma-element-panel-price-filter">
		<ul>
			<li>
				<input type="radio" id="all-item" name="selector" checked="checked">
				<label for="all-item"><?php echo esc_attr__("All Item", 'karma');?></label>

				<div class="check"></div>
			</li>

			<li>
				<input type="radio" id="free-item" name="selector">
				<label for="free-item"><?php echo esc_attr__("Free", 'karma');?></label>

				<div class="check"><div class="inside"></div></div>
			</li>

			<li>
				<input type="radio" id="premium-item" class="karma-premium-deactivate" name="selector">
				<label for="premium-item"><?php echo esc_attr__("Premium", 'karma');?></label>

				<div class="check"><div class="inside"></div></div>
			</li>

			<li>
				<input type="radio" id="my-section-item" name="selector">
				<label for="my-section-item"><?php echo esc_attr__("My Section", 'karma');?></label>

				<div class="check"><div class="inside"></div></div>
			</li>
		</ul>
	</div>


</div>
