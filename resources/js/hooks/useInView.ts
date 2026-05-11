import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    resetOnExit?: boolean;
}

export function useInView({
    threshold = 0.15,
    rootMargin = '0px',
    resetOnExit = true,
}: UseInViewOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                } else if (resetOnExit) {
                    // Element has exited viewport — reset so animation replays on re-entry
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, resetOnExit]);

    return { ref, inView };
}
