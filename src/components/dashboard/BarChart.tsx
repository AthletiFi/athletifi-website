import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, LabelList, Legend } from "recharts";
import { useState } from "react";
import { useMediaQuery } from "@/app/utils/useMediaQuery";

const DEFAULT_COLOR = "#113448";
const LAYERCOLOR = "#ffffff";
const dummyData = [
  { attribute: "attacking", rating: 80 },
  { attribute: "skill", rating: 90 },
  { attribute: "physical", rating: 75 },
  { attribute: "mentality", rating: 95 },
  { attribute: "defending", rating: 85 },
];

const attributeConfigs = {
  attacking: {
    color: "#DA393B",
    description: "Attacking description goes here",
  },
  skill: {
    color: "#27B6BD",
    description: "Skill description goes here",
  },
  physical: {
    color: "#B09E03",
    description: "Physical description goes here",
  },
  mentality: {
    color: "#FC6713",
    description: "Mentality description goes here",
  },
  defending: {
    color: "#5A54A2",
    description: "Defending description goes here",
  },
}

function StatsBarChart() {
  const isMobile = useMediaQuery("(max-width: 850px)");
  const xKey = "attribute";
  const yKey = "rating";

  const resetProps = {
    click: null,
    hover: null
  };

  const [barProps, setBarProps]: [any, any] = useState(resetProps);

  function CustomLegend() {
    return (
      <div className="stats-legend__container">
        {Object.keys(attributeConfigs).map((entry, index) => (
          <div
            key={`bar-item-${index}`}
            className="stats-legend__buttons"
            style={{ background: barProps.click === entry ? attributeConfigs[entry].color : DEFAULT_COLOR }}
            onClick={(data) => selectBar(data)}
            onMouseEnter={(data) => handleLegendMouseEnter(data)}
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {entry}
          </div >
        ))
        }
      </div >
    )
  }

  function handleLegendMouseEnter(e: any) {
    if (!barProps.hover) {
      setBarProps({ ...barProps, hover: e.target.textContent });
    }
  }

  function handleLegendMouseLeave() {
    setBarProps({ ...barProps, hover: null });
  }

  function selectBar(e: any) {
    if (e.target.textContent) {
      if (barProps.click === e.target.textContent) {
        setBarProps({ ...barProps, click: null });
      } else {
        setBarProps({ ...barProps, click: e.target.textContent });
      }
    }
  }

  return (
    <>
      <ResponsiveContainer width={"100%"} height={350} debounce={50}>
        <BarChart data={dummyData} layout="vertical" margin={isMobile ? { left: -40, right: 20 } : { left: 20, right: 30 }}>
          <XAxis hide axisLine={false} type="number" />
          <YAxis yAxisId={0} type="category" axisLine={false} tickLine={false} tick={false} />
          <Legend
            layout="vertical"
            verticalAlign={`${isMobile ? 'top' : 'middle'}`}
            align={`${isMobile ? 'center' : 'left'}`}
            content={<CustomLegend />}
            wrapperStyle={isMobile ? {
              paddingBottom: "25px"
            } : {}} />
          {/* <Tooltip cursor={false} /> */}
          <Bar dataKey={yKey} minPointSize={2} barSize={isMobile ? 28 : 40} radius={20} background={{ fill: LAYERCOLOR, radius: 20, opacity: 0.1 }}>
            <LabelList dataKey={yKey} position="insideRight" offset={15} style={{ fill: LAYERCOLOR }} />
            {dummyData.map((d, idx) => {
              return (
                <Cell
                  key={d[xKey]}
                  fill={attributeConfigs[d[xKey]].color}
                  fillOpacity={`${barProps.hover === d[xKey] || !barProps.hover ? 1 : 0.4}`}
                />);
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="relative">
        {barProps.click ? <div className="stats-chart__description stats-chart__desc-container">{attributeConfigs[barProps.click].description}</div> : ''}
      </div>
    </>
  );
};

export default StatsBarChart;