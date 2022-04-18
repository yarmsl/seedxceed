import { ComponentStory, ComponentMeta } from "@storybook/react";
import TrendChevron from "./TrendChevron";

export default {
  title: "atoms/TrendChevron",
  component: TrendChevron,
  argTypes: {
    direction: {
      options: ["rise", "fall"],
      control: "select",
    },
  },
} as ComponentMeta<typeof TrendChevron>;

const Template: ComponentStory<typeof TrendChevron> = (args) => (
  <TrendChevron {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  direction: "rise",
};
