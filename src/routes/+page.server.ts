import Database from 'better-sqlite3';
import type { PageServerLoad } from './$types';

// const db = new Database("test.db");

// db.exec(`
//   DROP TABLE IF EXISTS tasks;
//   DROP TABLE IF EXISTS projects;
//
//   CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT
//   );
//
//   CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT
//   );
//
//   INSERT INTO tasks (title) VALUES ('Task 1');
//   INSERT INTO tasks (title) VALUES ('Task 2');
//
//   INSERT INTO projects (title) VALUES ('Project 1');
//   INSERT INTO projects (title) VALUES ('Project 2');
// `);

// db.close();

export const load: PageServerLoad = async ({ url }) => {
  const db = new Database("test.db");
  const query = url.searchParams.get("selected") || "";
  const todos = db.prepare("SELECT id, title FROM tasks").all();
  const selected = db.prepare("SELECT id, title FROM tasks WHERE id = ?").get(query)

  db.close();

  return {
    todos,
    selected
  };
};

import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const db = new Database("test.db");

    const form = await request.formData()
    const title = form.get("title")

    db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
    const results = db.prepare("SELECT id, title FROM tasks").get();

    db.close();

    return { success: true };
  }

} satisfies Actions;
