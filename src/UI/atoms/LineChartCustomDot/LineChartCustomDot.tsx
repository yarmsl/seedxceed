import { FC, memo, useMemo } from "react";

const LineChartCustomDot: FC<ILineChartCustomDotProps> = ({
  cx,
  cy,
  stroke,
  width,
}) => {
  const x = useMemo(() => (cx != null ? cx : 0), [cx]);
  const y = useMemo(() => (cy != null ? cy : 0), [cy]);
  const w = useMemo(() => (width != null ? width : 0), [width]);
  return (
    <svg x={x - w / 2} y={y} width={w} height={2} fill={stroke}>
      <rect width="100%" height="100%" />
    </svg>
  );
};

export default memo(LineChartCustomDot);
