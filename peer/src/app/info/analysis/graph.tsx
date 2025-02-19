import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const KnowledgeGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);

    // 数据
    const data = [
      { name: "节点1", value: 1 },
      { name: "节点2", value: 2 },
      { name: "节点3", value: 3 },
      { name: "节点4", value: 4 },
      { name: "节点5", value: 5 },
      { name: "节点6", value: 6 },
    ];

    const links = [
      { source: "节点1", target: "节点2", name: "关系1-2" },
      { source: "节点2", target: "节点3", name: "关系2-3" },
      { source: "节点3", target: "节点4", name: "关系3-4" },
      { source: "节点4", target: "节点5", name: "关系4-5" },
      { source: "节点5", target: "节点6", name: "关系5-6" },
      { source: "节点6", target: "节点1", name: "关系6-1" },
    ];

    // 配置项
    const option = {
      tooltip: {
        formatter: function (params) {
          if (params.dataType === "node") {
            return `节点名称: ${params.name}`;
          } else if (params.dataType === "edge") {
            return `关系名称: ${params.data.name}`;
          }
        },
      },
      series: [
        {
          type: "graph",
          layout: "force",
          force: {
            repulsion: 1000,
            edgeLength: 200,
          },
          data: data.map((node) => ({
            ...node,
            label: {
              show: true,
              formatter: function (params) {
                // 截断显示节点名称
                return params.name.length > 4
                  ? params.name.substring(0, 4) + "..."
                  : params.name;
              },
            },
          })),
          links: links.map((link) => ({
            ...link,
            label: {
              show: true,
              formatter: function (params) {
                // 截断显示关系名称
                return params.name.length > 4
                  ? params.name.substring(0, 4) + "..."
                  : params.name;
              },
            },
          })),
          roam: true,
          focusNodeAdjacency: true,
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
        },
      ],
    };

    // 设置配置项
    myChart.setOption(option);

    // 监听节点点击事件
    myChart.on("click", function (params) {
      if (params.dataType === "node") {
        console.log("点击了节点:", params.name);
        alert(`点击了节点: ${params.name}`);
      }
    });

    // 组件卸载时销毁 ECharts 实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "600px" }}></div>;
};

export default KnowledgeGraph;