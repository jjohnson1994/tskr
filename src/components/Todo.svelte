<script lang="ts">
	let { title, id }: { title: string; id: string } = $props();
</script>

<div>
	<a {id} href={`?selected=${id}`} class="target:text-green-600">
		<div class="card">
			<p>{title}</p>
		</div>
	</a>
</div>
