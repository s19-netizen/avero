import Link from "next/link";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Avero home">
      <span>aver</span>
      <svg className="wordmark-o" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M31.5 10.5A15 15 0 1 0 34 30" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <path d="m20 22.5 6 6 12-16" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
