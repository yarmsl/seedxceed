import { Paper } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SalesCard from "./SalesCard";

export default {
  title: "molecules/SalesCard",
  component: SalesCard,
  argTypes: {
    title: {
      options: [
        "sales",
        "refunds",
        "orders",
        "whCapital",
        "profitComm",
        "shipping",
      ],
      control: "inline-radio",
    },
    amountTitle: {
      options: ["amount", "toClient", "retailPrice", "profit"],
      control: "inline-radio",
    },
    countTitle: {
      options: ["quantity", "cost", "fromClient", "mpComm"],
      control: "inline-radio",
    },
  },
} as ComponentMeta<typeof SalesCard>;

const Template: ComponentStory<typeof SalesCard> = (args) => (
  <Paper
    sx={{
      width: "350px",
      p: "12px",
      borderRadius: 1,
      boxSizing: "border-box",
    }}
  >
    <SalesCard {...args} />
  </Paper>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "sales",
  amountTitle: "amount",
  countTitle: "quantity",
  amount: 1000000,
  count: 1000000,
  amountChange: 123456789,
  countChange: 987654321,
};
