type IControlledVideoFileInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "onChange" | "name" | "type" | "ref" | "multiple" | "accept"
> & {
  name: string;
  setIsUpLoading: (condition: boolean) => void;
  isLoading: boolean;
  isEmpty: boolean;
  limit?: number;
  isFull?: boolean;
  addFiles: (files: File[]) => void;
  addPreviews: (previews: string[]) => void;
};

interface IVideoPreviewCardProps {
  index: number;
  src: string;
  remove: (n: number) => void;
}
