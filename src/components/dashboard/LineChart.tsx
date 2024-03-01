import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
// import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { ILineProps } from '@/types/Dashboard.type';
import { LegendEventType, ILegendMouseEvent } from '@/types/Chart.type';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

const DEFAULT_COLOR = 'rgba(128, 128, 128, 0.15)';

const dummyData = [
  {
    match: '1',
    attacking: 30,
    skill: 75,
    physical: 70,
    mentality: 60,
    defending: 85,
  },
  {
    match: '2',
    attacking: 40,
    skill: 85,
    physical: 75,
    mentality: 63,
    defending: 85,
  },
  {
    match: '3',
    attacking: 50,
    skill: 80,
    physical: 75,
    mentality: 66,
    defending: 85,
  },
  {
    match: '4',
    attacking: 70,
    skill: 90,
    physical: 70,
    mentality: 69,
    defending: 85,
  },
  {
    match: '5',
    attacking: 60,
    skill: 85,
    physical: 75,
    mentality: 75,
    defending: 85,
  },
  {
    match: '6',
    attacking: 80,
    skill: 90,
    physical: 75,
    mentality: 75,
    defending: 85,
  },
  {
    match: '7',
    attacking: 75,
    skill: 85,
    physical: 70,
    mentality: 80,
    defending: 85,
  },
];

const attributeConfigs = {
  attacking: {
    color: '#DA393B',
    description: 'Attacking description goes here',
  },
  skill: {
    color: '#27B6BD',
    description: 'Skill description goes here',
  },
  physical: {
    color: '#B09E03',
    description: 'Physical description goes here',
  },
  mentality: {
    color: '#FC6713',
    description: 'Mentality description goes here',
  },
  defending: {
    color: '#5A54A2',
    description: 'Defending description goes here',
  },
};

function StatsLineChart() {
  const isMobile = useMediaQuery('(max-width: 850px)');

  const [lineProps, setLineProps] = useState<ILineProps>(
    Object.keys(attributeConfigs).reduce(
      (a, key) => {
        a[key] = false;
        return a;
      },
      { hover: null },
    ),
  );

  function CustomLegend(props) {
    const { payload } = props;
    return (
      <div className="flex flex-row lg:flex-col justify-center lg:items-center flex-wrap">
        {payload.map((entry, index) => (
          <div
            key={`line-item-${index}`}
            className="stats-legend__buttons"
            style={{
              background: !lineProps[entry.value]
                ? attributeConfigs[entry.value].color
                : DEFAULT_COLOR,
            }}
            onClick={(data) => selectLine(data)}
            onMouseEnter={(data) => handleLegendMouseEnter(data)}
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {entry.value}
          </div>
        ))}
      </div>
    );
  }

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-10 p-3 leading-8">
          {payload.map(function (entry, index) {
            if (entry?.name) {
              return (
                <p
                  key={`tooltip-${index}`}
                  style={{ color: attributeConfigs[entry.name].color }}
                >{`${entry.name}: ${entry.value}`}</p>
              );
            }
          })}
        </div>
      );
    }

    return null;
  };

  function handleLegendMouseEnter(e: ILegendMouseEvent<LegendEventType>) {
    if (
      e?.target?.textContent &&
      !lineProps[e?.target?.textContent] &&
      !lineProps.hover
    ) {
      setLineProps({ ...lineProps, hover: e?.target?.textContent });
    }
  }

  function handleLegendMouseLeave() {
    setLineProps({ ...lineProps, hover: null });
  }

  function selectLine(e: ILegendMouseEvent<LegendEventType>) {
    if (e?.target?.textContent && e.target.textContent in lineProps) {
      setLineProps({
        ...lineProps,
        [e.target.textContent]: !lineProps[e.target.textContent],
        hover: null,
      });
    }
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={295}>
        <LineChart
          width={500}
          height={300}
          data={dummyData}
          margin={
            isMobile
              ? {
                  left: 10,
                  right: 40,
                }
              : {
                  top: 16,
                  left: 40,
                  right: 50,
                  bottom: -1,
                }
          }
        >
          <XAxis dataKey="match" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign={`${isMobile ? 'top' : 'middle'}`}
            align={`${isMobile ? 'center' : 'left'}`}
            content={<CustomLegend />}
            wrapperStyle={
              isMobile
                ? {
                    paddingBottom: '40px',
                  }
                : {}
            }
          />
          {Object.keys(attributeConfigs).map((attribute, idx) => {
            return (
              <Line
                key={`${attribute}-${idx}`}
                type="monotone"
                dataKey={attribute}
                stroke={`${lineProps[attribute] ? DEFAULT_COLOR : attributeConfigs[attribute].color}`}
                strokeWidth={`${lineProps[attribute] ? '2' : lineProps.hover === attribute || !lineProps.hover ? '5' : '1'}`}
                dot={false}
                // hide={lineProps["attacking"] === true}
              />
            );
          })}
          <CartesianGrid
            strokeWidth={1}
            horizontal={true}
            vertical={false}
            opacity={0.3}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex pl-9 lg:pl-10 w-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-white text-center w-20 md:w-24 lg:w-32 border-t border-[#ccd1d4] py-4">
            <div className="">Rating</div>
            <div className="text-[36px]">72</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsLineChart;
