import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Text, LabelList, Tooltip, Legend } from "recharts";
import CustomTooltip from "@/components/dashboard/CustomTooltip";
import { PureComponent, useState, useEffect } from "react";
import { useMediaQuery } from "@/app/utils/useMediaQuery";

const COLORS = ["#DA393B", "#27B6BD", "#B09E03", "#FC6713", "#5A54A2"];
const DEFAULT_BUTTON_COLOR = "#113448";
const LAYERCOLOR = "#ffffff";

const data = [
  { attribute: "attacking", rating: 80 },
  { attribute: "skill", rating: 90 },
  { attribute: "physical", rating: 75 },
  { attribute: "mentality", rating: 95 },
  { attribute: "defending", rating: 85 },
];

type Key = {
  key: string;
  color: string;
};

const SimpleBarChart = () => {
  // const isMobile = useMediaQuery("(max-width: 480px)");
  const isMobile = useMediaQuery("(max-width: 850px)");

  const xKey = "attribute";
  const yKey = "rating";

  const labels: Key[] = [
    { key: "attacking", color: "#DA393B" },
    { key: "skill", color: "#27B6BD" },
    { key: "physical", color: "#B09E03" },
    { key: "mentality", color: "#FC6713" },
    { key: "defending", color: "#5A54A2" },
  ];

  function CustomLegend() {
    return (
      <div className="stats-legend__container">
        {labels.map((entry, index) => (
          <div className="stats-legend__buttons" style={{ background: DEFAULT_BUTTON_COLOR }} key={`bar-item-${index}`}>{entry.key}</div >
        ))
        }
      </div >
    )
  }

  return (
    <ResponsiveContainer width={"100%"} height={350} debounce={50}>
      <BarChart data={data} layout="vertical" margin={isMobile ? { left: -40, right: 20 } : { left: 20, right: 30 }}>
        <XAxis hide axisLine={false} type="number" />
        {/* <YAxis yAxisId={0} dataKey={xKey} type="category" axisLine={false} tickLine={false} tick={<CustomYAxisTick />} style={{ textAnchor: "middle" }} /> */}
        <YAxis yAxisId={0} type="category" axisLine={false} tickLine={false} tick={false} />
        <Legend
          layout="vertical"
          verticalAlign={`${isMobile ? 'top' : 'middle'}`}
          align={`${isMobile ? 'center' : 'left'}`}
          content={<CustomLegend />}
          wrapperStyle={isMobile ? {
            paddingBottom: "25px"
          } : {}} />
        {/* <Tooltip cursor={false} content={<CustomTooltip />} position={{ x: 700, y: 0 }} /> */}
        {/* <Tooltip cursor={false} /> */}
        <Bar dataKey={yKey} minPointSize={2} barSize={isMobile ? 28 : 40} radius={20} background={{ fill: LAYERCOLOR, radius: 20, opacity: 0.1 }}>
          <LabelList dataKey={yKey} position="insideRight" offset={10} style={{ fill: LAYERCOLOR }} />
          {data.map((d, idx) => {
            return <Cell key={d[xKey]} fill={COLORS[idx]} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
