interface IMainMenuListProps {
  items: IMainMenuItemConf[];
}

type IconType =
  | (OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">> & {
      muiName: string;
    })
  | React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >
  | JSX.Element;
