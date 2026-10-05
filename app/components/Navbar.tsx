export default function Navbar() {
  return (
    <nav
      className="w-full bg-white fixed top-0 flex
    items-center justify-between px-3 md:px-8 py-2
    shadow-[0_4px_10px_rgba(20,20,20,0.2)]"
    >
      <div
        className="md:text-[30px] text-lg font-medium tracking-tight text-[#101827]"
        style={{ fontFamily: "Castellar, Comic Sans, cursive" }}
      >
        Prompt Corner
      </div>

      <div className="flex items-center gap-2 text-[13px] text-[#64748b]">
        <span>AI photo prompts worth trying</span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#101827]"
        >
          <path
            d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </nav>
  );
}
