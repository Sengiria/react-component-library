import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedBookFilter } from './AnimatedBookFilter'

const meta: Meta<typeof AnimatedBookFilter> = {
  component: AnimatedBookFilter,
  title: 'Components/AnimatedBookFilter',
}
export default meta

type Story = StoryObj<typeof AnimatedBookFilter>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
        <AnimatedBookFilter />
      </div>
    </div>
  ),
}
