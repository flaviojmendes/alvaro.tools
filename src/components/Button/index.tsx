type Props = {
    width: string;
    handleButtonPress: (key: string) => void;
    char: string;
}

export default function Button(props: Props) {
  return (
    <div
      onClick={() => props.handleButtonPress(props.char)}
      className={`${props.width} cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400`}
    >
      <span className="m-auto select-none">{props.char}</span>
    </div>
  );
}
