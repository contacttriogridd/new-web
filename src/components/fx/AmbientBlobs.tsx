type AmbientBlobsProps = {
  /** 'light' for pale sections, 'lavender' for the #B8A7DB sections. */
  tone?: 'light' | 'lavender';
  className?: string;
};

/**
 * Very soft, slowly drifting blurred orbs — a calm, breathing backdrop.
 * Pure CSS (GPU-composited transforms), paused for reduced motion.
 */
export default function AmbientBlobs({ tone = 'lavender', className = '' }: AmbientBlobsProps) {
  const colors =
    tone === 'lavender'
      ? ['bg-white/35', 'bg-plum-200/60', 'bg-white/25']
      : ['bg-lavender-200/40', 'bg-plum-200/30', 'bg-lavender-100/60'];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`ambient-blob left-[8%] top-[12%] h-72 w-72 ${colors[0]}`} style={{ animationDuration: '26s' }} />
      <div
        className={`ambient-blob right-[6%] top-[30%] h-96 w-96 ${colors[1]}`}
        style={{ animationDuration: '32s', animationDelay: '-9s' }}
      />
      <div
        className={`ambient-blob bottom-[4%] left-[38%] h-64 w-64 ${colors[2]}`}
        style={{ animationDuration: '28s', animationDelay: '-16s' }}
      />
    </div>
  );
}
