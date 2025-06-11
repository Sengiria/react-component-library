export const splitImages = (images: string[]) => {
  const half = Math.ceil(images.length / 2);
  return {
    leftImages: images.slice(0, half),
    rightImages: images.slice(half),
  };
};


