import Link from "next/link";

export default function DefaultButton({
  label,
  onClick = null,
  selected = false,
  className = "",
  type = "button",
  disabled = false,
  to,
}) {
  const style = `cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
    selected ? "bg-gray-900" : ""
  } ${
    disabled
      ? "opacity-50 hover:bg-gray-900 hover:text-gray-300"
      : "cursor-pointer"
  } ${className} `;

  let defaultButton = (
    <button className={style} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );

  if (to) {
    defaultButton = (
      <Link href={to}>
        <a className={style}>{label}</a>
      </Link>
    );
  }

  return defaultButton;
}
