import { useState, useRef, useEffect } from 'react';
import { splitImages } from './CarouselBase';
import { LEFT_PERSPECTIVES, RIGHT_PERSPECTIVES } from '../constants';

interface Props {
    images: string[];
    showHint?: boolean;
}

const DefaultCarousel: React.FC<Props> = ({ images, showHint = false }) => {
    const { leftImages, rightImages } = splitImages(images);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hintVisible, setHintVisible] = useState(showHint);
    const dragStartX = useRef<number | null>(null);
    const dragThreshold = 30;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const didDrag = useRef(false);

    useEffect(() => {
        if (!hintVisible) return;

        const timeout = setTimeout(() => {
            setHintVisible(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [hintVisible]);

    const handleStart = (clientX: number) => {
        dragStartX.current = clientX;
        didDrag.current = false;
        setHintVisible(false);
    };

    const handleMove = (clientX: number) => {
        if (dragStartX.current === null) return;

        const delta = clientX - dragStartX.current;
        if (Math.abs(delta) > dragThreshold && !didDrag.current) {
            didDrag.current = true;
            if (delta > 0) {
                setCurrentIndex((prev) => (prev - 1 + 6) % 6);
            } else {
                setCurrentIndex((prev) => (prev + 1) % 6);
            }
        }
    };

    const handleEnd = () => {
        dragStartX.current = null;
        setTimeout(() => {
            didDrag.current = false;
        }, 50);
    };

    const getTransformStyle = (index: number, perspectives: { x: number; z: number }[]) => {
        const relativeIndex = (index - currentIndex + perspectives.length) % perspectives.length;
        const p = perspectives[relativeIndex];
        return {
            transform: `translate3d(${p.x}rem, 0, ${p.z}rem)`,
        };
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (didDrag.current) return;
        if (!containerRef.current) return;
        setHintVisible(false);
        const bounds = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX;

        if (clickX < bounds.left + bounds.width / 2) {
            setCurrentIndex((prev) => (prev - 1 + 6) % 6);
        } else {
            setCurrentIndex((prev) => (prev + 1) % 6);
        }
    };

    useEffect(() => {
        setHintVisible(showHint);
    }, [showHint]);

    return (
        <div
            ref={containerRef}
            className="gallery w-full h-[28rem] max-w-7xl mx-auto flex items-center select-none"
            data-testid="carousel-gallery"
            onClick={handleClick}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
        >
            <div className="left w-1/2 h-full overflow-hidden flex items-center relative">
                <div className="inner w-full flex items-center relative perspective-[500px] transform-3d perspective-origin-left-center">
                    {leftImages.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            data-counter={idx + 1}
                            draggable={false}
                            style={{
                                ...getTransformStyle(idx, LEFT_PERSPECTIVES),
                            }}
                            className="item absolute
                                cursor-pointer 
                                h-[12rem] w-[10rem] right-[-12rem]
                                sm:h-[14rem] sm:w-[12rem] sm:right-[-12rem]
                                md:h-[18rem] md:w-[14rem] md:right-[-13rem]
                                transition-transform duration-[300ms] ease-[cubic-bezier(0,0.55,0.45,1)]"
                            alt={`Left ${idx}`}
                        />
                    ))}
                    {/* Tooltip */}
                    {hintVisible && (
                        <div
                            className="absolute right-[4rem] sm:right-[12rem] md:right-[21rem] md:h-12 flex items-center bg-black/60 opacity-75 hover:opacity-100 text-white text-xs sm:text-sm px-4 rounded-md shadow-md backdrop-blur-md z-20 cursor-pointer"
                        >
                            🖱️ Drag or click to explore the carousel
                        </div>
                    )}
                </div>
            </div>
            <div className="right w-1/2 h-full overflow-hidden flex items-center relative">
                <div className="inner w-full flex items-center relative perspective-[500px] transform-3d perspective-origin-right-center">
                    {rightImages.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            data-counter={idx + 1}
                            draggable={false}
                            style={{
                                ...getTransformStyle(idx, RIGHT_PERSPECTIVES),
                            }}
                            className="item absolute
                                cursor-pointer 
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

export default DefaultCarousel;
