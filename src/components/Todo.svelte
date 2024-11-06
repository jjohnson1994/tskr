<script lang="ts">
	import { page } from '$app/stores';
	let { title, id }: { title: string; id: string } = $props();

	const link = new URL($page.url);
	link.searchParams.set('selected', id);
</script>

<div>
	<a {id} href={link.toString()} class="target:text-green-600">
		<div class="card">
			<p>{title}</p>
		</div>
	</a>
</div>
