const Badge = ({ text, handleClick }) => {
  return (
    <span className="inline-flex items-center gap-x-0.5 rounded-xl bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 mr-1 mt-0.5">
      {text}
      <button
        type="button"
        className="group relative -mr-1 h-3.5 w-3.5 rounded-sm  hover:scale-125"
        onClick={handleClick}
      >
        <span className="sr-only">{text}</span>
        <svg
          viewBox="0 0 14 14"
          className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75"
        >
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </span>
  )
}

export default Badge
