import { motion } from 'framer-motion';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface SlideInProps {
    children: React.ReactNode;
    from?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
}

function getInitial(from: Direction) {
    switch (from) {
        case 'left':   return { x: -48, y: 0, opacity: 0 };
        case 'right':  return { x:  48, y: 0, opacity: 0 };
        case 'top':    return { x: 0, y: -48, opacity: 0 };
        case 'bottom': return { x: 0, y:  48, opacity: 0 };
    }
}

export function SlideIn({ children, from = 'left', delay = 0, duration = 0.5, className }: SlideInProps) {
    return (
        <motion.div
            className={className}
            initial={getInitial(from)}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
