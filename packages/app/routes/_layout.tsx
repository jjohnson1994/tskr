import * as mod from "@mainframe-api/deno-sqlite";
import { Calendar1, CalendarDays, Inbox } from "lucide-preact";
import { PageProps } from "$fresh/server.ts";
import { Shortcut } from "~/components/Shortcut.tsx";

interface Data {
  projects: { id: number; title: string }[];
}

export default function Layout({ Component }: PageProps<Data>) {
  const db = new mod.DB("test.db");
  const query = db.prepareQuery<
    [number, string],
    { id: number; title: string }
  >(
    "SELECT id, title FROM projects",
  );
  const projects = query.allEntries();
  query.finalize();

  db.close();

  return (
    <>
      <div className="layout">
        <nav>
          <a href="/" className="inline-flex gap-1">
            <Inbox strokeWidth={1.5} /> Staging
          </a>
          <p>links</p>
          <a href="" className="inline-flex gap-1">
            <Inbox strokeWidth={1.5} /> Staging
          </a>
          <a href="" className="inline-flex gap-1">
            <Calendar1 strokeWidth={1.5} /> Today
          </a>
          <a href="" className="inline-flex gap-1">
            <CalendarDays strokeWidth={1.5} /> This week
          </a>

          <p>shortcuts</p>
          <a href="">Filter One</a>
          <a href="">Filter One</a>

          <p>projects</p>
          {projects.map((project) => (
            <a href={`/list/${project.id}`}>{project.title}</a>
          ))}
          <a href="/new/list" className="text-slate-500">New +</a>
        </nav>
        <div className="main">
          <Component />
          <p className="my-8">
            shortcuts <Shortcut>?</Shortcut>
          </p>
        </div>
      </div>
    </>
  );
}
