// 创建渐变色
export const createGradient = (startColor: string, endColor: string) => {
  return `linear-gradient(145deg, ${startColor} 0%, ${endColor} 100%)`
}

// 创建阴影
export const createShadow = (
  elevation: 1 | 2 | 3 | 4,
  color: string = 'rgb(0 0 0 / 0.1)'
) => {
  const elevationValues = {
    1: `0 1px 2px 0 ${color}`,
    2: `0 4px 6px -1px ${color}`,
    3: `0 10px 15px -3px ${color}`,
    4: `0 20px 25px -5px ${color}`
  } as const

  return elevationValues[elevation] || elevationValues[1]
}

// 创建响应式媒体查询
export const createMediaQuery = (minWidth: string) => {
  return `@media (min-width: ${minWidth})`
}

// 创建颜色变体
export const createColorVariant = (
  baseColor: string,
  lightness: number = 0
) => {
  // 这里可以添加颜色处理逻辑
  return baseColor
}

// 请确保 truncate 函数被正确定义和导出
export const truncate = {
  lines: (lineCount: number) => ({
    display: '-webkit-box',
    '-webkit-line-clamp': lineCount,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  line: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}; 