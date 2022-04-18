import { ComponentStory, ComponentMeta } from "@storybook/react";
import GoogleAuthButtonLayout from "./GoogleAuthButtonLayout";

export default {
  title: "atoms/GoogleAuthButton",
  component: GoogleAuthButtonLayout,
  argTypes: {
    variant: {
      options: ["text", "contained", "outlined"],
      control: "radio",
    },
  },
} as ComponentMeta<typeof GoogleAuthButtonLayout>;

const Template: ComponentStory<typeof GoogleAuthButtonLayout> = (args) => (
  <GoogleAuthButtonLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: "",
  variant: "contained",
  fullWidth: false,
};
