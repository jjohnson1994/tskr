import { Handlers, PageProps } from "$fresh/server.ts";
import * as mod from "@mainframe-api/deno-sqlite";

const db = new mod.DB("test.db");

db.execute(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT
  );
`);

db.close();

export const handler: Handlers = {
  async GET(req, ctx) {
    const title = "New project";
    const db = new mod.DB("test.db");

    const results = db.query(
      "INSERT INTO projects (title) VALUES (?) RETURNING *",
      [
        title,
      ],
    );

    const [id] = results[0];

    console.log({ results });

    db.close();

    const headers = new Headers();
    headers.set("location", `/list/${id}`);

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
