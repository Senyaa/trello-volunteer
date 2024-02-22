import type { Meta, StoryObj } from "@storybook/react";
import Button from "../app/components/ui/Button";

const meta = {
  title: "Main/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button Primary",
    onClick: () => {},
  },
};
export const PrimaryDisabled: Story = {
  args: {
    label: "Button Primary",
    disabled: true,
    onClick: () => {},
  },
};
export const PrimaryGrey: Story = {
  args: {
    label: "Button Primary",
    color: "grey",
    onClick: () => {},
  },
};
export const PrimaryGreyDisabled: Story = {
  args: {
    label: "Button Primary",
    color: "grey",
    disabled: true,
    onClick: () => {},
  },
};

export const Secondary: Story = {
  args: {
    label: "Button Secondary",
    level: "secondary",
    onClick: () => {},
  },
};
export const SecondaryDisabled: Story = {
  args: {
    label: "Button Secondary",
    level: "secondary",
    disabled: true,
    onClick: () => {},
  },
};
export const SecondaryGrey: Story = {
  args: {
    label: "Button Secondary",
    color: "grey",
    level: "secondary",
    onClick: () => {},
  },
};
export const SecondaryGreyDisabled: Story = {
  args: {
    label: "Button Secondary",
    color: "grey",
    level: "secondary",
    disabled: true,
    onClick: () => {},
  },
};
export const Terinary: Story = {
  args: {
    label: "Button Terinary",
    level: "terinary",
    onClick: () => {},
  },
};
export const TerinaryDisabled: Story = {
  args: {
    label: "Button Terinary",
    level: "terinary",
    disabled: true,
    onClick: () => {},
  },
};
export const TerinaryGrey: Story = {
  args: {
    label: "Button Terinary",
    color: "grey",
    level: "terinary",
    onClick: () => {},
  },
};
export const TerinaryGreyDisabled: Story = {
  args: {
    label: "Button Terinary",
    color: "grey",
    level: "terinary",
    disabled: true,
    onClick: () => {},
  },
};
