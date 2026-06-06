import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import CheckBox from '../common/CheckBox';

const meta = {
  title: 'Common/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
  },
  args: {
    checked: false,
    onToggle: fn(),
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const TogglesOnClick: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked);

    return (
      <CheckBox
        {...args}
        checked={checked}
        onToggle={() => {
          args.onToggle();
          setChecked((prevChecked) => !prevChecked);
        }}
      />
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(checkbox);
    await expect(args.onToggle).toHaveBeenCalledOnce();
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  },
};
