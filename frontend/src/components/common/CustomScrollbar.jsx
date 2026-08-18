//External Imports
import React, { useCallback, useEffect, useRef, useState } from "react";

//Internal Imports

//Native scrollbar thumb length is always (visible / total content) — for a
//list that barely overflows, that ratio is close to 1 and the thumb looks
//"too long" no matter what CSS you throw at it. This draws its own thin
//track + a fixed-length thumb on top of a hidden native scrollbar instead,
//so it always reads as a short decorative mark regardless of list length.
const THUMB_HEIGHT = 24;

const CustomScrollbar = ({
  children,
  maxHeight = 240,
  className = "",
  wrapperClassName = "",
}) => {
  const scrollRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [needsScroll, setNeedsScroll] = useState(false);

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;

    setNeedsScroll(scrollHeight > clientHeight + 1);
    setTrackHeight(clientHeight);

    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTravel = Math.max(clientHeight - THUMB_HEIGHT, 0);
    const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setThumbTop(Math.min(maxThumbTravel, ratio * maxThumbTravel));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateThumb();
    el.addEventListener("scroll", updateThumb);
    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      resizeObserver.disconnect();
    };
  }, [updateThumb]);

  return (
    <div className={`relative ${wrapperClassName} `}>
      <div
        ref={scrollRef}
        className={`hide-scrollbar overflow-y-auto pr-px  ${className}`}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children}
      </div>

      {needsScroll && (
        <div
          className="absolute right-0 top-1 bottom-1 w-px 
          rounded-full bg-white"
          style={{ height: trackHeight }}
        >
          <div
            className="absolute  -right-0.5 w-1 rounded-full bg-(--link-color)"
            style={{ height: THUMB_HEIGHT, top: thumbTop }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomScrollbar;
