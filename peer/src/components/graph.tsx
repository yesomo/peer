import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

const KnowledgeGraph = ({ nodes, links }) => {
  // 截断字符串的函数
  const truncateString = (str, maxLength = 10) => {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  };

  // ECharts 的配置选项
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'node') {
            return `节点名称: ${params.name}`;
          } else if (params.dataType === 'edge') {
            return `关系名称: ${params.data.name}`;
          }
          return '';
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          roam: true,
          label: {
            show: true,
            formatter: (params) => truncateString(params.name),
            color: '#000',
          },
          edgeLabel: {
            show: true,
            formatter: (params) => truncateString(params.data.name),
            color: '#000',
          },
          data: nodes,
          links: links,
          force: {
            repulsion: 100,
            edgeLength: [50, 100],
          },
          itemStyle: {
            normal: {
              borderColor: '#999',
              borderWidth: 1,
            },
          },
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0.3,
            },
          },
        },
      ],
    };
  };

  return <ReactECharts option={getOption()} />;
};

// 示例节点和关系数据
const nodesData = [
  { name: '非常长的节点名称1', value: 10 },
  { name: '节点名称2', value: 20 },
  // ... 其他节点
];

const linksData = [
  { source: '非常长的节点名称1', target: '节点名称2', name: '关系名称1' },
  // ... 其他关系
];

// 使用 KnowledgeGraph 组件
const InfoGraph = () => {
  return (
    <div>
      <h1>知识图谱关系图</h1>
      <KnowledgeGraph nodes={nodesData} links={linksData} />
    </div>
  );
};

export default InfoGraph;