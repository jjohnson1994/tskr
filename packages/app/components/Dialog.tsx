import { FunctionComponent, h } from "preact";

export const Dialog: FunctionalComponent = (props) => {
  return (
    <dialog class="card">
      <div>
        {props.children}
      </div>
    </dialog>
  );
};
