import React, { useEffect, useRef } from 'react';
import type { AutoCarouselProps } from '../types';
import { LEFT_PERSPECTIVES, RIGHT_PERSPECTIVES } from '../constants';

const AutoCarousel: React.FC<AutoCarouselProps> = ({ leftImages, rightImages, intervalMs = 1000 }) => {
    const leftRefs = useRef<HTMLImageElement[]>([]);
    const rightRefs = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const translateImage = (el: HTMLImageElement, p: { x: number; z: number }) => {
            el.style.transform = `translate3d(${p.x}rem, 0, ${p.z}rem)`;
        };

        leftRefs.current.forEach(el => {
            if (el) {
                const current = parseInt(el.dataset.counter || '1');
                translateImage(el, LEFT_PERSPECTIVES[current - 1]);
            }
        });
        rightRefs.current.forEach(el => {
            if (el) {
                const current = parseInt(el.dataset.counter || '1');
                translateImage(el, RIGHT_PERSPECTIVES[current - 1]);
            }
        });

        const animateCards = (el: HTMLImageElement, perspectives: { x: number; z: number }[]) => {
            const current = parseInt(el.dataset.counter || '1');
            translateImage(el, perspectives[current - 1]);
            el.dataset.counter = current === 6 ? '1' : (current + 1).toString();
        };

        const interval = setInterval(() => {
            leftRefs.current.forEach(el => animateCards(el, LEFT_PERSPECTIVES));
            rightRefs.current.forEach(el => animateCards(el, RIGHT_PERSPECTIVES));
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return (
        <div className="gallery w-full h-[28rem] max-w-7xl mx-auto flex items-center select-none">
            <div className="left w-1/2 h-full overflow-hidden flex items-center relative">
                <div className="inner w-full flex items-center relative perspective-[500px] transform-3d perspective-origin-left-center">
                    {leftImages.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            ref={el => {
                                if (el) leftRefs.current[idx] = el;
                            }}
                            data-counter={idx + 1}
                            className="item absolute 
                                h-[12rem] w-[10rem] right-[-12rem]
                                sm:h-[14rem] sm:w-[12rem] sm:right-[-12rem]
                                md:h-[18rem] md:w-[14rem] md:right-[-13rem]
                                transition-transform duration-[300ms] ease-[cubic-bezier(0,0.55,0.45,1)]"
                            alt={`Left ${idx}`}
                        />
                    ))}
                </div>
            </div>
            <div className="right w-1/2 h-full overflow-hidden flex items-center relative">
                <div className="inner w-full flex items-center relative perspective-[500px] transform-3d perspective-origin-right-center">
                    {rightImages.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            ref={el => {
                                if (el) rightRefs.current[idx] = el;
                            }}
                            data-counter={idx + 1}
                            className="item absolute 
                                h-[12rem] w-[10rem] left-[-12rem]
                                sm:h-[14rem] sm:w-[12rem] sm:left-[-12rem]
                                md:h-[18rem] md:w-[14rem] md:left-[-13rem]
                                transition-transform duration-[300ms] ease-[cubic-bezier(0,0.55,0.45,1)]"
                            alt={`Right ${idx}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutoCarousel;
