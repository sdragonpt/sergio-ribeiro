// A template re-mounts on every navigation (unlike layout), so this wrapper
// replays its entrance animation on each page change.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>
}
