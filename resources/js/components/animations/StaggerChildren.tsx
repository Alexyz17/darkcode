import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
    },
};

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}

export function StaggerChildren({ children, className, stagger = 0.1 }: StaggerChildrenProps) {
    const variants = {
        ...containerVariants,
        visible: {
            transition: { staggerChildren: stagger },
        },
    };

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}
