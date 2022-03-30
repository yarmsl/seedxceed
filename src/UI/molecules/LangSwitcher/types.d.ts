interface ILangMenuProps {
  anchor: HTMLElement | null;
  handleClose: () => void;
  handleLang: (lang: string) => void;
  items: ILangObj[];
}

interface ILangObj {
  icon: string;
  title: string;
  lang: string;
}
