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

import { IAttributeConfig, ILineProps } from '@/types/Dashboard.type';
import { LegendEventType, ILegendMouseEvent } from '@/types/Chart.type';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import Skeleton from 'react-loading-skeleton';
import { IRatingProps } from '@/types/Dashboard.type';
import { attributeConfigs } from '@/app/utils/dashboardHelper';

const DEFAULT_COLOR = 'rgba(128, 128, 128, 0.15)';

const StatsLineChart: React.FC<IRatingProps> = ({
  overall_rating,
  player_ratings,
  chart_fields,
}: IRatingProps) => {
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

  function CustomLegend() {
    return (
      <div className="flex flex-row lg:flex-col justify-center lg:items-center flex-wrap">
        {chart_fields.map((value, index) => (
          <div
            key={`line-item-${index}`}
            className="stats-legend__buttons"
            style={{
              background: !lineProps[value as keyof ILineProps]
                ? attributeConfigs[value as keyof IAttributeConfig].color
                : DEFAULT_COLOR,
            }}
            onClick={(data) => selectLine(data)}
            onMouseEnter={(data) => handleLegendMouseEnter(data)}
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {value}
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
                  style={{
                    color:
                      attributeConfigs[entry.name as keyof IAttributeConfig]
                        .color,
                  }}
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
          data={player_ratings}
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
            const i = attribute as keyof ILineProps;
            const j = attribute as keyof IAttributeConfig;

            return (
              <Line
                key={`${attribute}-${idx}`}
                type="monotone"
                dataKey={attribute}
                stroke={`${lineProps[i] ? DEFAULT_COLOR : attributeConfigs[j].color}`}
                strokeWidth={`${lineProps[i] ? '2' : lineProps.hover === attribute || !lineProps.hover ? '5' : '1'}`}
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
            <div className="text-[36px]">{overall_rating || <Skeleton />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsLineChart;
