import React from 'react';
import AutoCarousel from './variants/AutoCarousel';
import type { ImageCarouselProps } from './types';
import { VARIANT_AUTO, VARIANT_DEFAULT } from './constants';

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  variant = VARIANT_DEFAULT,
  intervalMs,
}) => {
  switch (variant) {
    case VARIANT_AUTO: {
      const leftImages = images.slice(0, 6);
      const rightImages = images.slice(6, 12);
      return (
        <AutoCarousel
          leftImages={leftImages}
          rightImages={rightImages}
          intervalMs={intervalMs}
        />
      );
    }
    case VARIANT_DEFAULT:
    default:
      return (
        <div className="flex overflow-x-auto space-x-4 p-4">
          Not implemented yet
        </div>
      );
  }
};
