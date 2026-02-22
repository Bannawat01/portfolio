'use client';

import { useState, useEffect } from 'react';

export default function MouseSpotlight() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHoverable, setIsHoverable] = useState(false);

    useEffect(() => {
        // Only show spotlight on devices that support hover (desktop)
        if (window.matchMedia('(hover: hover)').matches) {
            setIsHoverable(true);
            const updateMousePosition = (e: MouseEvent) => {
                setPosition({ x: e.clientX, y: e.clientY });
            };

            window.addEventListener('mousemove', updateMousePosition);
            return () => window.removeEventListener('mousemove', updateMousePosition);
        }
    }, []);

    if (!isHoverable) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition duration-300"
            style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 111, 255, 0.05), transparent 70%)`
            }}
        />
    );
}
