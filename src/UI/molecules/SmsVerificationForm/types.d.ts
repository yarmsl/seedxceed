interface ISmsVerificationFormProps {
  phone: string;
  codeLength: number;
  toggleVerify: (condition: boolean) => void;
}

type IMiniSmsInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "ref"
>;
