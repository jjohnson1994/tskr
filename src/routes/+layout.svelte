<script lang="ts">
	import { Calendar1, CalendarDays, Inbox } from 'lucide-svelte';
	import Shortcut from '../components/Shortcut.svelte';
	import type { LayoutData } from './$types';
	import '../app.css';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="layout">
	<nav>
		<a href="/" class="inline-flex gap-1">
			<Inbox strokeWidth={1.5} /> Staging
		</a>
		<p>schedule</p>
		<a href="" class="inline-flex gap-1">
			<Calendar1 strokeWidth={1.5} /> Today
		</a>
		<a href="" class="inline-flex gap-1">
			<CalendarDays strokeWidth={1.5} /> This week
		</a>

		<p>shortcuts</p>
		<a href="">Filter One</a>
		<a href="">Filter One</a>

		<p>projects</p>
		{#each data.projects as project}
			<a href={`?project_id=${project.id}`}>{project.title}</a>
		{/each}
		<a href="/new/list" class="text-slate-500">New +</a>
	</nav>
	<div class="main">
		{@render children()}
		<p class="my-8">
			shortcuts <Shortcut>?</Shortcut>
		</p>
	</div>
</div>
