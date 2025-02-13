// Map of commonly used colours for difficulty symbols
const COLORS = {
  Circle: ['black', 'blue', 'green', 'orange', 'red'],
  Diamond: ['black', 'red'],
  DoubleDiamond: ['black'],
  Square: ['blue', 'orange'],
  TerrainPark: ['orange'],
};

// Map of the default colour for difficulty symbols used in North America
const DEFAULT_COLOR = {
  Circle: 'green',
  Diamond: 'black',
  DoubleDiamond: 'black',
  Square: 'blue',
  TerrainPark: 'orange',
};

module.exports = (variables, { tpl }) => {
  const componentName = variables.componentName.replace('Svg', '');
  const propsName = `${componentName}Props`;
  const colors = (COLORS[componentName] || [])
    .map((color) => `\'${color}\'`)
    .join(' | ');
  const defaultColor = DEFAULT_COLOR[componentName] || 'black';

  return tpl`
    import { ${!!colors ? 'ColorExtract' : 'Color'}, COLORS } from './constants.js';

    export interface ${propsName} {
      color?: ${!!colors ? `ColorExtract<${colors}>` : 'Color'}
      size?: number
    }
    
    export const ${componentName} = ({ color = '${defaultColor}', size = 24 }: ${propsName}) => (
      ${variables.jsx}
    );
  `;
};
