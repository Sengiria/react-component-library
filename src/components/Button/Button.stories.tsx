import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import {
  COLOR_DEFAULT,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_DANGER,
} from './constants';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [COLOR_DEFAULT, COLOR_PRIMARY, COLOR_SECONDARY, COLOR_DANGER],
      description: 'Predefined color variant',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    ripple: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultVariant: Story = {
  args: {
    color: COLOR_DEFAULT,
    text: 'CLICK ME',
    ripple: true,
    type: 'button',
  },
};
