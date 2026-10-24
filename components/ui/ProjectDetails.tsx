"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Badge from "./Badge";
import { motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type OpenProject = (trigger: HTMLElement) => void;
type RegisterOpen = (projectIndex: number, handler: OpenProject | null) => void;

const subscribeToPortalRoot = () => () => {};
const getPortalRoot = () => document.body;
const getServerPortalRoot = (): HTMLElement | null => null;

type Props = {
  title: string;
  role?: string;
  summary: string;
  technologies: string[];
  children: ReactNode;
  registerOpen: RegisterOpen;
  projectIndex: number;
};

export default function ProjectDetails({ title, role, summary, technologies, children, registerOpen, projectIndex }: Props) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const openingFrameRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const portalRoot = useSyncExternalStore(subscribeToPortalRoot, getPortalRoot, getServerPortalRoot);

  const openDialog = useCallback((trigger: HTMLElement) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current = trigger;
    const animateMobile = window.matchMedia("(max-width: 639px)").matches &&
      !reducedMotion &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (animateMobile) dialog.dataset.transitionState = "opening";
    else delete dialog.dataset.transitionState;
    dialog.showModal();
    setIsOpen(true);
    closeRef.current?.focus({ preventScroll: true });
    if (animateMobile) {
      openingFrameRef.current = window.requestAnimationFrame(() => {
        openingFrameRef.current = null;
        if (dialog.open && dialog.dataset.transitionState === "opening") {
          dialog.dataset.transitionState = "open";
        }
      });
    }
  }, [reducedMotion]);

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    if (openingFrameRef.current !== null) {
      window.cancelAnimationFrame(openingFrameRef.current);
      openingFrameRef.current = null;
    }
    const animateMobile = window.matchMedia("(max-width: 639px)").matches &&
      !reducedMotion &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animateMobile) {
      dialog.close();
      return;
    }
    if (dialog.dataset.transitionState === "closing") return;
    dialog.dataset.transitionState = "closing";
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      if (dialog.open) dialog.close();
    }, motion.duration.dialog * 1000);
  }, [reducedMotion]);

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) closeDialog();
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    registerOpen(projectIndex, openDialog);
    return () => registerOpen(projectIndex, null);
  }, [openDialog, projectIndex, registerOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!reducedMotion) return;
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    if (openingFrameRef.current !== null) {
      window.cancelAnimationFrame(openingFrameRef.current);
      openingFrameRef.current = null;
    }
    if (dialog.dataset.transitionState === "closing") {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      dialog.close();
    } else if (dialog.dataset.transitionState === "opening") {
      dialog.dataset.transitionState = "open";
    }
  }, [reducedMotion]);

  useEffect(() => () => {
    if (openingFrameRef.current !== null) window.cancelAnimationFrame(openingFrameRef.current);
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    delete dialog?.dataset.transitionState;
  }, []);

  if (!portalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      id={`project-dialog-${id}`}
      className="project-dialog"
      aria-modal="true"
      aria-labelledby={`project-dialog-title-${id}`}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={() => {
        if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
        delete dialogRef.current?.dataset.transitionState;
        setIsOpen(false);
      }}
      onClick={onDialogClick}
      onKeyDown={onDialogKeyDown}
    >
      <div className="project-dialog__panel">
        <header className="project-dialog__header">
          <div className="min-w-0">
            <h2 id={`project-dialog-title-${id}`} className="project-dialog__title">{title}</h2>
            {role ? <p className="project-dialog__role">{role}</p> : null}
          </div>
          <button ref={closeRef} type="button" className="project-dialog__close" onClick={closeDialog} aria-label={`Close ${title} details`}>
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="project-dialog__content">
          <p className="project-dialog__summary">{summary}</p>
          <div className="project-dialog__details">{children}</div>
          {technologies.length > 0 ? (
            <section className="project-dialog__technologies" aria-label="Technologies">
              <h3>Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </dialog>,
    portalRoot,
  );
}
