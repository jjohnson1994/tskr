export const FormField: FunctionComponent<{ label: string }> = (props) => {
  return (
    <div className="flex flex-col">
      <label>
        {props.label}
      </label>
      {props.children}
    </div>
  );
};
