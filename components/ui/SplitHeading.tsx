"use client";

import { forwardRef, useRef, type ReactNode } from "react";
import { useSplitTextCascade } from "@/lib/useSplitTextCascade";

type Props = {
  as: "h1" | "h2";
  className?: string;
  children: ReactNode;
};

const SplitHeading = forwardRef<HTMLHeadingElement, Props>(function SplitHeading(
  { as: Tag, className = "", children },
  forwardedRef,
) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  useSplitTextCascade(headingRef);
  const setHeadingRef = (node: HTMLHeadingElement | null) => {
    headingRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return <Tag ref={setHeadingRef} className={className}>{children}</Tag>;
});

export default SplitHeading;
