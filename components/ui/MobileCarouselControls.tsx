type Props = {
  itemLabel: string;
  controlsLabel: string;
  previousLabel: string;
  nextLabel: string;
  position: number;
  count: number;
  isAnimating: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export default function MobileCarouselControls({
  itemLabel,
  controlsLabel,
  previousLabel,
  nextLabel,
  position,
  count,
  isAnimating,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="project-stack-controls mobile-stack-controls" role="group" aria-label={controlsLabel}>
      <p className="project-stack-position" aria-live="polite" aria-atomic="true">
        {itemLabel} {position} of {count}
      </p>
      <div className="mobile-stack-controls__actions">
        <button type="button" className="project-previous" onClick={onPrevious} disabled={isAnimating} aria-label={previousLabel}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="project-next" onClick={onNext} disabled={isAnimating} aria-label={nextLabel}>
          {nextLabel} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
