export type DropDownItem = { title: string; handler: (event: any) => any };

const Dropdown = ({
  items,
  propClassName,
}: {
  items: DropDownItem[];
  propClassName?: string;
}) => {
  const rows = items.map((item) => {
    return (
      <li
        key={item.title}
        className="cursor-context-menu hover:bg-primary hover:text-white transition-colors ease-in duration-[0.3s]"
        onClick={item.handler}
      >
        <div className="p-3">{item.title}</div>
      </li>
    );
  });

  const finalClassName = propClassName
    ? propClassName
    : "absolute top-14 right-1 bg-white shadow-default z-50 rounded-xl w-60";

  return (
    <div className={finalClassName} data-testid="drop">
      <ul className="my-3 flex flex-col p-0">{rows}</ul>
    </div>
  );
};

export default Dropdown;
