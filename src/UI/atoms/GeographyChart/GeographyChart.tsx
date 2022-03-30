import {memo, useState, useEffect} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {useAppSelector} from "../../../store"
import {uiSelector} from "../../../store/UI/UI.selectors"

const GeographyChart = ({data, colors}: IGeographyChartProps): JSX.Element => {
  const {darkMode} = useAppSelector(uiSelector)
  const [legend, setLegend] = useState<ILegend>(() => {
    let dataLegend: ILegend = {opacity: {}}
    data.slice(0, 11).forEach(item => {
      dataLegend = {opacity: {...dataLegend.opacity, [item.name]: 1}}
    })
    return dataLegend
  })

  const handleMouseEnter = ({value}: {value: string}) => {
    const { opacity } = legend
    setLegend(() => {
      let dataLegend = legend
      for (const key in opacity) {
        if ([key][0] === value) {
          dataLegend = {opacity: {...dataLegend.opacity, [key]: 1}}
        } else {
          dataLegend = {opacity: {...dataLegend.opacity, [key]: 0.2}}
        }
      }
      return dataLegend
    });
  };

  const handleMouseLeave = () => {
    const { opacity } = legend
    setLegend(() => {
      let dataLegend = legend
      for (const key in opacity) {
        dataLegend = {opacity: {...dataLegend.opacity, [key]: 1}}
      }
      return dataLegend
    })
  }

  const renderColorfulLegendText = (value: string) => {
    return <span style={{ color: darkMode ? "#fff" : "#252527" }}>{value}</span>;
  };

  useEffect(() => {
    setLegend(() => {
      let dataLegend: ILegend = {opacity: {}}
      data.slice(0, 11).forEach(item => {
        dataLegend = {opacity: {...dataLegend.opacity, [item.name]: 1}}
      })
      return dataLegend
    })
  }, [data])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart height={500} width={500}>
        <Legend
          iconType="circle"
          align="left"
          height={240}
          margin={{top: 0, left: 52, right: 0, bottom: 0}}
          wrapperStyle={{left: "70%", top: "0", position: "absolute"}}
          formatter={renderColorfulLegendText}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Tooltip/>
        <Pie
          data={data.slice(0, 11)}
          innerRadius={100}
          outerRadius={120}
          cx="30%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.slice(0, 11).map((entry, index) => {
            return <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              fillOpacity={legend.opacity[entry.name]}
            />
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default memo(GeographyChart);