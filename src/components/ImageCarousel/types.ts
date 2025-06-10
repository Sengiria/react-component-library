export type ImageCarouselVariant = 'default' | 'auto';

export interface ImageCarouselProps {
  variant?: ImageCarouselVariant;
  images: string[];
  intervalMs?: number; // only relevant for 'auto' variant
}

export type AutoCarouselProps = {
  leftImages: string[];
  rightImages: string[];
  intervalMs?: number;
};
