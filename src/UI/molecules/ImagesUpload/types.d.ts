type IControlledImagesFileInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "onChange" | "name" | "type" | "ref" | "multiple" | "accept"
> & {
  name: string;
  addFiles: (files: File[]) => void;
  addPreviews: (previews: string[]) => void;
  setIsUpLoading: (condition: boolean) => void;
  isLoading: boolean;
  isEmpty: boolean;
  limit?: number;
  isFull?: boolean;
};

interface IImagePreviewCardProps {
  index: number;
  src: string;
  remove: (n: number) => void;
  toFirstPlace: (n: number) => void;
}
