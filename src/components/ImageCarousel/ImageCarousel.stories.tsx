import type { Meta, StoryObj } from '@storybook/react';
import { ImageCarousel } from './ImageCarousel';
import { VARIANT_AUTO, VARIANT_DEFAULT } from './constants';

const meta: Meta<typeof ImageCarousel> = {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

const sampleImages = [
  'https://images.nightcafe.studio/ik-seo/jobs/Od1Yy4dSD1SBRinwLN1I/Od1Yy4dSD1SBRinwLN1I--0--rbjlb/the-lighthouse-between-worlds.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/g7FNILNPysZVOlh3SLvs/g7FNILNPysZVOlh3SLvs--0--s79ao/how-to-be-free.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/5Wq2HnaHQiMBD0AJdqLs/5Wq2HnaHQiMBD0AJdqLs--1--5ciw2/blade-runner-2049-dreamy-scene.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/fAxjZTQ35pRbnTMpfGrf/fAxjZTQ35pRbnTMpfGrf--0--vbh14/fantastical-underwater-city-inhabited-by-merfolk-and-sea-creatures-this-artwork-harmoniously-blends-.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/WnYUipSQJEghifpDUQj8/WnYUipSQJEghifpDUQj8--0--uyuk9/colorfull-enchantments.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/ogG5PUVVhk6mfeHf5H5a/ogG5PUVVhk6mfeHf5H5a--0--japkl/petals-and-flowers-flying-whilst-twinkling-trees-in-bloombeautiful-nature-all-around.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/7fbKc9rQQF5mxJikRcTW/7fbKc9rQQF5mxJikRcTW--0--mo9xr/una-chica-con-ojos-que-parecen-galaxias-rodeados-de-luces-suaves-y-nebulosas.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/PV18FcSlxy6UfOj9LnoC/PV18FcSlxy6UfOj9LnoC--0--dt556/imagine-a-bio-art-collage-depicting-a-woman-whose-hair-is-a-miniature-self-sustaining-ecosystem-comp.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/ynWxrbAGWY7lNhFh3wOv/ynWxrbAGWY7lNhFh3wOv--0--o6xjw/imagine-a-lone-astronaut-standing-on-a-desolate-alien-planet-gazing-up-at-a-breathtaking-nebula-with.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/jobs/bnNFljnKmwFiJOyr81Qt/bnNFljnKmwFiJOyr81Qt-N8pIC.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/SDrnVGe2jYB4Go4r6njU/SDrnVGe2jYB4Go4r6njU--1--861cq/jinx-is-crazy.jpg?tr=w-1080,c-at_max',
  'https://images.nightcafe.studio/ik-seo/jobs/yT9sYZZgM9VR8Rkw4IzL/yT9sYZZgM9VR8Rkw4IzL--0--ef0dt/charming-bluebird-in-a-blossoming-cherry-orchard-springtime-serenade-in-a-corridor-of-soft-dappled-s.jpg?tr=w-1200,c-at_max',
];

export const DefaultVariant: Story = {
  args: {
    images: sampleImages,
    variant: VARIANT_DEFAULT,
  },
};

export const AutomaticVariant: Story = {
  args: {
    images: sampleImages,
    variant: VARIANT_AUTO,
    intervalMs: 1000,
  },
  argTypes: {
    intervalMs: {
      control: { type: 'range', min: 300, max: 5000, step: 100 },
      description: 'Transition speed in ms for auto carousel',
    },
  },
};
