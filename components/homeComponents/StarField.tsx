import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Star({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        x,
        y,
        width: Math.random() * 2 + 1,
        height: Math.random() * 2 + 1,
      }}
      animate={{
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
      }}
    />
  );
}

export default function StarField({ count }: { count: number }) {
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <Star key={star.id} x={star.x} y={star.y} />
      ))}
    </div>
  );
}
