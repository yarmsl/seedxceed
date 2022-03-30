type tutorialsMarketTypes = "tutorial" | supportedMarketTypes;
interface ITutorialCardProps {
  marketName: tutorialsMarketTypes;
  selected: boolean;
  action: function;
}
