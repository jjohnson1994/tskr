import Database from 'better-sqlite3';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const db = new Database("test.db");
  const projects = db.prepare("SELECT id, title FROM projects").all();

  db.close();

  return {
    projects
  };
};
