<script lang="ts">
	const props = $props();
</script>

<div class="input relative">
	<input {...props} />
	<span class="absolute right-3 top-1/2 -translate-y-1/2">
		<slot name="postfix"></slot>
	</span>
</div>
