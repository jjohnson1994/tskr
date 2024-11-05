import Database from 'better-sqlite3';

import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async () => {
    const title = "New project";
    const db = new Database("test.db");

    const results = db.query(
      "INSERT INTO projects (title) VALUES (?) RETURNING *",
      [
        title,
      ],
    );

    const [id] = results[0];

    db.close();

    return redirect(303, `list/${id}`)
  }
} satisfies Actions;

