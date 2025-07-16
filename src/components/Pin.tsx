type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Pin({ onClick }: inputProps) {
  return (
    <div onClick={onClick} className="pt-5 pl-2">
      📌
    </div>
  );
}

export default Pin;
