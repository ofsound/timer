type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Start({ onClick }: inputProps) {
  return (
    <button onClick={onClick} className="block h-18 w-18 cursor-pointer rounded-full bg-green-800 px-3 py-3 text-white">
      START
    </button>
  );
}

export default Start;
