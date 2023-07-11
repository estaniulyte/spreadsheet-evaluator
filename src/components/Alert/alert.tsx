interface AlertProps {
  show?: boolean;
  text: string;
  type: string;
}

export function Alert({ show, type, text }: AlertProps) {
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "";

  switch (type) {
    case "Info":
      backgroundColor = "bg-blue-50";
      textColor = "text-blue-800";
      borderColor = "border-blue-300";
      break;
    case "Error":
      backgroundColor = "bg-red-50";
      textColor = "text-red-900";
      borderColor = "border-red-300";
      break;
    case "Success":
      backgroundColor = "bg-green-50";
      textColor = "text-green-800";
      borderColor = "border-green-300";
      break;
  }

  return (
    <div
      className={`flex mx-2 items-center p-4 mb-4 text-sm ${textColor} border ${borderColor} rounded-lg ${backgroundColor}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="flex ">
        <span className="font-medium shrink mr-3">{type} alert!</span><span className="">{text}</span>
      </div>
    </div>
  );
}
