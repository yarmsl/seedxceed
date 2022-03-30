import { Country } from "react-phone-number-input";

export interface ICountrySelectProps {
  anchor: HTMLElement | null;
  handleClose: () => void;
  handleCountry: (country: Country) => void;
  countryCode: Country;
}
