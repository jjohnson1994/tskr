<script lang="ts">
	import { page } from '$app/stores';
	let { title, id }: { title: string; id: string } = $props();

	const link = $derived.by(() => {
		const newUrl = new URL($page.url.href);
		newUrl.searchParams.set('selected', id);

		return newUrl;
	});
</script>

<div>
	<a {id} href={link.toString()} class="target:text-green-600">
		<div class="card">
			<p>{title}</p>
		</div>
	</a>
</div>
