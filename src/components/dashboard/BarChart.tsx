import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  Legend,
} from 'recharts';
import { useState } from 'react';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import { IAttributeConfig, IBarProps } from '@/types/Dashboard.type';
import { LegendEventType, ILegendMouseEvent } from '@/types/Chart.type';
import { IRatingProps } from '@/types/Dashboard.type';
import { attributeConfigs } from '@/app/utils/dashboardHelper';

const DEFAULT_COLOR = 'rgba(128, 128, 128, 0.15)';
const LAYERCOLOR = '#ffffff';

const StatsBarChart: React.FC<IRatingProps> = ({
  overall_rating,
  latest_player_ratings,
  chart_fields,
}: IRatingProps) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const xKey = 'attribute';
  const yKey = 'rating';
  const resetProps = {
    click: null,
    hover: null,
  };

  const [barProps, setBarProps] = useState<IBarProps>(resetProps);

  function CustomLegend() {
    return (
      <div className="flex flex-row lg:flex-col justify-center lg:items-center flex-wrap">
        {chart_fields?.map((entry, index) => (
          <div
            key={`bar-item-${index}`}
            className="stats-legend__buttons"
            style={{
              background:
                barProps.click === entry
                  ? attributeConfigs[entry as keyof IAttributeConfig].color
                  : DEFAULT_COLOR,
            }}
            onClick={(latest_player_ratings) =>
              selectBar(latest_player_ratings)
            }
            onMouseEnter={(latest_player_ratings) =>
              handleLegendMouseEnter(latest_player_ratings)
            }
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {entry}
          </div>
        ))}
      </div>
    );
  }

  function handleLegendMouseEnter(e: ILegendMouseEvent<LegendEventType>) {
    if (!barProps.hover) {
      setBarProps({ ...barProps, hover: e?.target?.textContent });
    }
  }

  function handleLegendMouseLeave() {
    setBarProps({ ...barProps, hover: null });
  }

  function selectBar(e: ILegendMouseEvent<LegendEventType>) {
    if (e?.target?.textContent) {
      if (barProps.click === e.target.textContent) {
        setBarProps({ ...barProps, click: null });
      } else {
        setBarProps({ ...barProps, click: e.target.textContent });
      }
    }
  }

  return (
    <>
      {latest_player_ratings === null ? (
        <div className="mt-8 shadow-md mx-auto bg-cardsDark bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-center text-primary text-sm p-6">
          We&apos;re gathering the latest performance stats for your player.
          Check back soon for the updates!
        </div>
      ) : (
        <>
          <ResponsiveContainer
            width={'100%'}
            height={isMobile ? 320 : 295}
            debounce={20}
          >
            <BarChart
              data={latest_player_ratings}
              layout="vertical"
              margin={
                isMobile ? { left: -25, right: 30 } : { left: 40, right: 50 }
              }
            >
              <XAxis hide axisLine={false} type="number" />
              <YAxis
                yAxisId={0}
                type="category"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Legend
                layout="vertical"
                verticalAlign={`${isMobile ? 'top' : 'middle'}`}
                align={`${isMobile ? 'center' : 'left'}`}
                content={<CustomLegend />}
                wrapperStyle={
                  isMobile
                    ? {
                        paddingBottom: '25px',
                      }
                    : {}
                }
              />
              {/* <Tooltip cursor={false} /> */}
              <Bar
                dataKey={yKey}
                minPointSize={2}
                barSize={isMobile ? 26 : 32}
                radius={20}
                background={{ fill: LAYERCOLOR, radius: 20, opacity: 0.1 }}
              >
                <LabelList
                  dataKey={yKey}
                  position="insideRight"
                  offset={15}
                  style={{ fill: LAYERCOLOR }}
                />
                {latest_player_ratings?.map((d) => {
                  return (
                    <Cell
                      key={d[xKey]}
                      fill={
                        attributeConfigs[d[xKey] as keyof IAttributeConfig]
                          .color
                      }
                      fillOpacity={`${barProps.hover === d[xKey] || !barProps.hover ? 1 : 0.4}`}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex pl-9 lg:pl-10 w-full">
            <div className="flex items-center justify-between h-full">
              <div className="text-white text-center w-20 md:w-24 lg:w-32 border-t border-[#ccd1d4] py-4">
                <div className="">Rating</div>
                <div className="text-[36px]">{overall_rating}</div>
              </div>
            </div>
            <div className="ml-5 mr-8 lg:ml-[3.75rem] lg:mr-[3.25rem] w-full">
              {barProps.click ? (
                <div className="-mt-[4px] text-primary font-extralight text-xs md:text-sm bg-gray-500/15 rounded-10 p-2 md:p-4 mb-4 w-full overflow-y-auto max-h-24">
                  {
                    attributeConfigs[barProps.click as keyof IAttributeConfig]
                      .description
                  }
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StatsBarChart;
