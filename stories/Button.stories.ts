import type { Meta, StoryObj } from '@storybook/react';
import  Button  from '../app/components/ui/Button';

const meta = {
  title: 'Main/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button Primary',
    onClick: () => {},
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button Secondary',
    primary: false,
    onClick: () => {},
  },
};

