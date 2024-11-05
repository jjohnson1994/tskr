<script lang="ts">
	import { Calendar1, CalendarDays, Inbox } from 'lucide-svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import Todo from '../components/Todo.svelte';
	import Shortcut from '../components/Shortcut.svelte';
	import Input from '../components/Input.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	console.log(data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex min-h-screen grow flex-row">
	<div class="container mx-auto space-y-8 pt-8">
		<form method="post">
			<Input name="title" placeholder="Create">
				<Shortcut slot="postfix">SPACE</Shortcut>
			</Input>

			<div class="@container">
				<div class="grid grid-cols-2 @sm:grid-cols-4">
					<span>Project</span>
					<span>Tags</span>
					<span>Due</span>
					<span>Priority</span>
				</div>
			</div>

			<button type="submit">Add</button>
		</form>

		<div class="space-y-2">
			{#each data.todos as todo}
				<p>todo</p>
				<Todo id={todo.id} title={todo.title} />
			{/each}
		</div>
	</div>

	{#if data.selected}
		<div class="container mx-auto border-l border-slate-200 pt-8 shadow-lg">
			<div class="divide-y">
				<form method="post" action="/update">
					<label>
						<input type="checkbox" />
						Done
					</label>
				</form>
				<p class="text-xl font-semibold">{data.selected.title}</p>
			</div>
		</div>
	{/if}
</div>
