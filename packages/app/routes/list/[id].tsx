import { Button } from "~/components/Button.tsx";
import { FormField } from "~/components/FormField.tsx";
import { Input } from "~/components/Input.tsx";
import * as mod from "@mainframe-api/deno-sqlite";
import { PageProps } from "$fresh/server.ts";

interface Data {
  project: { id: number; title: string };
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const { params: { id } } = ctx;

    const db = new mod.DB("test.db");
    const query = db.prepareQuery<
      [number, string],
      { id: number; title: string }
    >("SELECT id, title FROM projects WHERE id = :id");

    const project = query.oneEntry({ id });

    query.finalize();

    db.close();

    return ctx.render({ project });
  },

  async POST(req, ctx) {
    const { params: { id } } = ctx;

    const db = new mod.DB("test.db");
    const form = await req.formData();
    const title = form.get("title")?.toString();

    const query = db.prepareQuery<
      [number, string],
      { id: number; title: string }
    >(`UPDATE projects SET title = :title WHERE id = :id RETURNING id, title`);

    const project = query.oneEntry({
      id,
      title,
    });

    query.finalize();

    db.close();

    return ctx.render({ project });
  },
};

export default function AddList({ data: { project } }: PageProps<Data>) {
  return (
    <div className="container mx-auto mt-8">
      <div className="py-8">
        <form method="post" className="space-y-8">
          <Input
            name="title"
            value={project.title}
            onchange="this.form.submit()"
          />
          <textarea name="description" value={project.title}></textarea>
        </form>
      </div>
    </div>
  );
}
