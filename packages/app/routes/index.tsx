import { Handlers, PageProps } from "$fresh/server.ts";
import * as mod from "@mainframe-api/deno-sqlite";
import { Button } from "~/components/Button.tsx";
import { Input } from "~/components/Input.tsx";
import { Partial } from "$fresh/runtime.ts";
import { Todo } from "~/components/Todo.tsx";
import { Dialog } from "~/components/Dialog.tsx";
import { useSignal } from "@preact/signals";
import { Shortcut } from "~/components/Shortcut.tsx";

interface Data {
  results: string[];
  query: string;
}

// const db = new mod.DB("test.db");

// db.execute(`
//   DROP TABLE IF EXISTS tasks;
//   DROP TABLE IF EXISTS projects;

//   CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT
//   );
// CREATE TABLE IF NOT EXISTS projects (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   title TEXT
// );
// `);

// Run a simple query
// for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
//   db.query("INSERT INTO people (name) VALUES (?)", [name]);
// }

// db.close();

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const db = new mod.DB("test.db");
    const url = new URL(req.url);
    const query = url.searchParams.get("selected") || "";
    const results = db.query("SELECT id, title FROM tasks");
    const selected = db.query("SELECT id, title FROM tasks WHERE id = ?", [
      query,
    ]);

    db.close();

    return ctx.render({ results, selected, query });
  },

  async POST(req, ctx) {
    const db = new mod.DB("test.db");
    const form = await req.formData();
    const title = form.get("title")?.toString();

    db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
    const results = db.query("SELECT id, title FROM tasks");

    db.close();

    return ctx.render({ results, query: "" });
  },
};

export default function Dashboard({ data }: PageProps<Data>) {
  const { results, selected, query } = data;

  return (
    <>
      <div className="flex flex-row grow min-h-screen" f-client-nav>
        <div className="space-y-8 pt-8 container mx-auto">
          <form method="post">
            <Input
              name="title"
              placeholder="Create"
              postfix={<Shortcut>SPACE</Shortcut>}
            />

            <div className="@container">
              <div class="grid grid-cols-2 @sm:grid-cols-4">
                <span>Project</span>
                <span>Tags</span>
                <span>Due</span>
                <span>Priority</span>
              </div>
            </div>

            <button type="submit">Add</button>
          </form>

          <div className="space-y-2">
            <Partial name="todos">
              {results.map(([id, todo]) => <Todo id={id} title={todo} />)}
            </Partial>
          </div>
        </div>

        <Partial name="selected">
          {selected?.length > 0 && (
            <>
              <div className="pt-8 border-l border-slate-200 container mx-auto shadow-lg">
                <div className="divide-y">
                  <form method="post" action="/update">
                    <label>
                      <input type="checkbox" />
                      Done
                    </label>
                  </form>
                  <p className="text-xl font-semibold">
                    {selected ? selected[0] : ""}
                  </p>
                </div>
              </div>
            </>
          )}
        </Partial>
      </div>
    </>
  );
}
