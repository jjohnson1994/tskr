import type { FunctionComponent } from "https://esm.sh/v128/preact@10.22.0/src/index.js";

export const Todo: FunctionComeponent<{ id: number; title: string }> = (
  { id, title },
) => {
  return (
    <div>
      <a id={id} href={`?selected=${id}`} class="target:text-green-600">
        <div class="card">
          <p>{title}</p>
        </div>
      </a>
    </div>
  );
};
