import InputField from './InputField';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    label: {
      control: 'text',
    },
    hidden: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const DefaultVariant: Story = {
  args: {
    label: 'Password',
    hidden: true,
  },
};
