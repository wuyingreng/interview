const axios = require('axios');

async function energyBar(country) {
  let maxEnergy = -1;
  let result = '';
  let minPrice = Infinity;
  let page = 1;
  let totalPages = 1;

  // 遍历所有页面
  while (page <= totalPages) {
    try {
      const response = await axios.get(`https://jsonmock.hackerrank.com/api/chocolates?countryOfOrigin=${country}&page=${page}`);
      const { data, total_pages } = response.data;
      totalPages = total_pages;

      // 处理当前页面的数据
      for (const chocolate of data) {
        const { brand, type, nutritionalInformation, weights, prices } = chocolate;

        // 计算平均重量
        const avgWeight = Math.floor(weights.reduce((a, b) => a + b, 0) / weights.length);

        // 计算每克能量值
        const energyPerGram = Math.floor((nutritionalInformation.energy * 0.01) / avgWeight);

        // 计算平均价格
        const avgPrice = Math.floor(prices.reduce((a, b) => a + b, 0) / prices.length);

        // 更新结果
        if (energyPerGram > maxEnergy ||
          (energyPerGram === maxEnergy && avgPrice < minPrice)) {
          maxEnergy = energyPerGram;
          minPrice = avgPrice;
          result = `${brand}:${type}`;
        }
      }

      page++;
    } catch (error) {
      console.error('Error fetching data:', error);
      break;
    }
  }

  return result;
}

// 测试代码
async function main() {
  try {
    const result = await energyBar('Norway');
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 