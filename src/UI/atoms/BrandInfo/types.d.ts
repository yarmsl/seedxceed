interface IBrandInfoProps {
  summary: ISummary;
}

interface ISummary {
  days_on_sale?: number;
  orders?: number;
  products_count?: number;
  returns?: number;
  sales?: number;
}
