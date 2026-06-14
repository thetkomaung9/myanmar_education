interface TestimonialCardProps {
  quote: string;
  authorName: string;
  role: string;
  schoolName: string;
}

/**
 * TestimonialCard — Validates: Requirements 3.5
 */
export function TestimonialCard({ quote, authorName, role, schoolName }: TestimonialCardProps) {
  return (
    <figure className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm">
      <blockquote className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 font-bold text-sm flex-shrink-0">
          {authorName.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">{authorName}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{role} · {schoolName}</p>
        </div>
      </figcaption>
    </figure>
  );
}
