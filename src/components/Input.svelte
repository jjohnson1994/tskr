<script lang="ts">
	const props = $props();

	let inputRef;

	export function focus() {
		inputRef?.focus();
	}
</script>

<div class="input relative">
	<input bind:this={inputRef} {...props} />
	<span class="absolute right-3 top-1/2 -translate-y-1/2">
		<slot name="postfix"></slot>
	</span>
</div>
