import Database from "better-sqlite3";
import type { PageServerLoad } from "./$types";

// const db = new Database("test.db");
//
// db.exec(`
//   DROP TABLE IF EXISTS tasks;
//   DROP TABLE IF EXISTS projects;
//
//   CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL
//   );
//
//   CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     project_id INTEGER,
//     title TEXT NOT NULL,
//     done BOOLEAN NOT NULL DEFAULT false,
//     FOREIGN KEY (project_id) REFERENCES projects(id)
//   );
//
//   INSERT INTO tasks (title) VALUES ('Task 1');
//   INSERT INTO tasks (title) VALUES ('Task 2');
//
//   INSERT INTO projects (title) VALUES ('Project 1');
//   INSERT INTO projects (title) VALUES ('Project 2');
// `);
//
// db.close();

export const load: PageServerLoad = async ({ url }) => {
  const db = new Database("test.db");
  const selectedId = url.searchParams.get("selected") || "";
  const projectId = url.searchParams.get("project_id");

  const todos = projectId
    ? db.prepare(`SELECT * FROM tasks WHERE tasks.project_id = ?`).all(
      projectId,
    )
    : db.prepare(`SELECT * FROM tasks`).all();

  const projects = db.prepare("SELECT * FROM projects").all();
  const selected = db.prepare("SELECT * FROM tasks WHERE id = ?").get(
    selectedId,
  );

  db.close();

  return {
    todos,
    projects,
    selected,
  };
};

import type { Actions } from "./$types";

export const actions = {
  create: async ({ request }) => {
    const db = new Database("test.db");

    const form = await request.formData();
    const title = form.get("title");

    db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
    const results = db.prepare("SELECT id, title FROM tasks").get();

    db.close();

    return { success: true };
  },
  update: async ({ request }) => {
    const db = new Database("test.db");

    const form = await request.formData();
    const id = form.get("id");
    const projectId = form.get("project_id");
    const done = form.get("done") ?? "false";

    db.prepare(`
      UPDATE tasks
      SET
        project_id = ?,
        done = ?
      WHERE tasks.id = ?
    `).run(projectId, done, id);

    db.close();

    return { success: true };
  },
} satisfies Actions;
