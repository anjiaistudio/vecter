import { useEffect, useRef } from 'react';

export function useScrollReveal({ direction = 'left', threshold = 0.15 } = {}) {
  const ref = useRef();


  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let initialX = '0', initialY = '0', initialScale = '1';
    let useScale = false;
    if (direction === 'left') initialX = '-60px';
    else if (direction === 'right') initialX = '60px';
    else if (direction === 'top') initialY = '-60px';
    else if (direction === 'bottom') initialY = '60px';
    else if (direction === 'zoomIn') { initialScale = '0.7'; useScale = true; }
    else if (direction === 'zoomOut') { initialScale = '1.3'; useScale = true; }

    node.style.opacity = 0;
    node.style.transform = `translateX(${initialX}) translateY(${initialY}) scale(${initialScale})`;
    node.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.style.opacity = 1;
          node.style.transform = 'translateX(0) translateY(0) scale(1)';
        } else {
          node.style.opacity = 0;
          node.style.transform = `translateX(${initialX}) translateY(${initialY}) scale(${initialScale})`;
        }
      });
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      threshold,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [direction, threshold]);

  return ref;
}
