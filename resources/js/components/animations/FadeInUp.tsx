import { motion } from 'framer-motion';

interface FadeInUpProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function FadeInUp({ children, delay = 0, duration = 0.5, className }: FadeInUpProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
