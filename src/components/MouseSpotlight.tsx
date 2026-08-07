'use client';

import { useEffect, useRef, useState } from 'react';

export default function MouseSpotlight() {
    const elRef = useRef<HTMLDivElement>(null);
    const [isHoverable, setIsHoverable] = useState(false);

    useEffect(() => {
        // Only show spotlight on devices that support hover (desktop)
        if (!window.matchMedia('(hover: hover)').matches) return;
        setIsHoverable(true);

        let rafId: number | null = null;
        let lastX = 0;
        let lastY = 0;

        const applyPosition = () => {
            rafId = null;
            const el = elRef.current;
            if (!el) return;
            el.style.setProperty('--x', `${lastX}px`);
            el.style.setProperty('--y', `${lastY}px`);
        };

        const updateMousePosition = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            if (rafId === null) {
                rafId = requestAnimationFrame(applyPosition);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    if (!isHoverable) return null;

    return (
        <div
            ref={elRef}
            className="mouse-spotlight pointer-events-none fixed inset-0 z-30 transition duration-300"
        />
    );
}
