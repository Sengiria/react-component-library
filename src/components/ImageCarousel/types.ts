export type ImageCarouselVariant = 'default' | 'auto';

export interface ImageCarouselProps {
  variant?: ImageCarouselVariant;
  images: string[];
  showHint: boolean; // only relevant for 'default' variant
  intervalMs?: number; // only relevant for 'auto' variant
}

export type AutoCarouselProps = {
  leftImages: string[];
  rightImages: string[];
  intervalMs?: number;
};
