import { FunctionComponent, h } from "preact";
import { JSX } from "preact";

export const Input: FunctionComponent<
  JSX.HTMLAttributes<HTMLInputElement> & { postfix: string }
> = (
  props,
) => {
  return (
    <div class="relative input">
      <input {...props} />
      <span class="absolute right-3 top-1/2 -translate-y-1/2">
        {props.postfix}
      </span>
    </div>
  );
};
