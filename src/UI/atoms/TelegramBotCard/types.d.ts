interface ITelegramBotCardProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  content: string;
  sub: string;
  active: boolean;
  link: string;
  labelActive: string;
  labelDisabled: string;
}
