'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { Property } from '@/lib/types/types';

interface AnimatedPropertyCardProps {
  property: Property;
  index: number;
}

const AnimatedPropertyCard: React.FC<AnimatedPropertyCardProps> = ({
  property,
  index
}) => {
  const [scope, animate] = useAnimate();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animate(
            scope.current,
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: index * 0.1 }
          );
        }
      },
      {
        threshold: 0.06 // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animate, index, isVisible, scope]);

  return (
    <motion.div ref={ref}>
      <motion.div ref={scope} initial={{ opacity: 0, y: 50 }}>
        <PropertyCard property={property} />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPropertyCard;
