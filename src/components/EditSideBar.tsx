export function EditSideBar({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="side-bar-right">
      EditSideBar
      {children}
    </div>
  );
}

export default EditSideBar;
