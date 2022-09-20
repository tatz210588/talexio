import React, { useEffect, useRef } from 'react'
import { NextPage } from 'next'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  TimeScale,
  Title,
  Tooltip
)

export type ChartProps = {
  className?: string
  chartConfig: ChartConfiguration
}

export { type ChartConfiguration }

const Charter: NextPage<ChartProps> = ({
  children,
  className,
  chartConfig,
}) => {
  const chartRef = useRef()
  useEffect(() => {
    if (chartRef.current) {
      var ctx = (chartRef.current as HTMLCanvasElement).getContext('2d')
      new Chart(ctx, chartConfig)
    }
  }, [])
  return (
    <>
      <div className={className}>
        <canvas ref={chartRef}></canvas>
        {children}
      </div>
    </>
  )
}
export default Charter
