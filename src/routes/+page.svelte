<script lang="ts">
	import { Calendar1, CalendarDays, Inbox } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import Todo from '../components/Todo.svelte';
	import Shortcut from '../components/Shortcut.svelte';
	import Input from '../components/Input.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let form;
	let inputNewTodo;

	onMount(() => {
		const handleKeyUp = (event) => {
			if (event.key === '/') {
				inputNewTodo.focus();
				console.log('Escape key pressed');
			}
		};

		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keyup', handleKeyUp);
		};
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex min-h-screen grow flex-row">
	<div class="container mx-auto space-y-8 px-6 pt-8">
		<form method="post" action="?/create">
			<Input bind:this={inputNewTodo} name="title" placeholder="Create">
				<Shortcut slot="postfix">/</Shortcut>
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
				<Todo id={todo.id} title={todo.title} />
			{/each}
		</div>
	</div>

	{#if data.selected}
		<div class="container mx-auto border-l border-slate-200 px-6 pt-8 shadow-lg">
			<div class="divide-y">
				<form method="post" action={`?selected=${data.selected.id}&/update`} bind:this={form}>
					<input hidden name="id" value={data.selected.id} />
					<label for="done">done</label>
					<input
						type="checkbox"
						name="done"
						on:change={() => form.requestSubmit()}
						checked={data.selected.done}
					/>

					<label for="title">title</label>
					<input name="title" value={data.selected.title} />

					<label for="description">description</label>
					<textarea name="description" value={data.selected.description} />

					<label for="project_id">project</label>
					<select
						name="project_id"
						on:change={() => form.requestSubmit()}
						value={data.selected.project_id}
					>
						<option value={null}>select</option>
						{#each data.projects as project}
							<option value={project.id}>{project.title}</option>
						{/each}
					</select>
				</form>
			</div>
		</div>
	{/if}
</div>
