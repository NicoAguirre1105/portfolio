export function LanguageSwitcher({
  size = "text-xs",
  activeClassName = "text-ink",
}: {
  size?: string;
  activeClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2 font-mono ${size} text-ink-faint`}>
      <span className={`font-medium ${activeClassName}`}>ES</span>
      <span>/</span>
      <span>EN</span>
      <span>/</span>
      <span>RU</span>
    </div>
  );
}
