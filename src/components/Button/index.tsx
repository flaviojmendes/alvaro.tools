type Props = {
  handleButtonPress: (key: string) => void;
  char: string;
}

export default function Button(props: Props) {
return (
  <div
    onClick={() => props.handleButtonPress(props.char)}
    className={`w-full cursor-pointer flex flex-1 border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400`}
  >
    <span className="m-auto select-none">{props.char.toUpperCase()}</span>
  </div>
);
}