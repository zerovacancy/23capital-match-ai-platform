// Mock real estate market data by city
const marketData = {
  "Chicago": {
    "multifamily": {
      "averageCapRate": 5.2,
      "averageRentPerSqFt": 2.15,
      "vacancyRate": 5.7,
      "averagePricePerUnit": 225000,
      "yearOverYearValueChange": 3.5
    },
    "office": {
      "averageCapRate": 6.8,
      "averageRentPerSqFt": 36.5,
      "vacancyRate": 18.3,
      "averagePricePerSqFt": 285,
      "yearOverYearValueChange": -2.1
    },
    "retail": {
      "averageCapRate": 7.5,
      "averageRentPerSqFt": 26.8,
      "vacancyRate": 8.9,
      "averagePricePerSqFt": 315,
      "yearOverYearValueChange": -1.5
    },
    "industrial": {
      "averageCapRate": 4.8,
      "averageRentPerSqFt": 8.25,
      "vacancyRate": 3.2,
      "averagePricePerSqFt": 115,
      "yearOverYearValueChange": 8.7
    }
  },
  "New York": {
    "multifamily": {
      "averageCapRate": 4.1,
      "averageRentPerSqFt": 5.35,
      "vacancyRate": 3.2,
      "averagePricePerUnit": 625000,
      "yearOverYearValueChange": 2.8
    },
    "office": {
      "averageCapRate": 4.5,
      "averageRentPerSqFt": 86.5,
      "vacancyRate": 15.8,
      "averagePricePerSqFt": 1250,
      "yearOverYearValueChange": -3.2
    },
    "retail": {
      "averageCapRate": 5.2,
      "averageRentPerSqFt": 95.0,
      "vacancyRate": 12.5,
      "averagePricePerSqFt": 1450,
      "yearOverYearValueChange": -4.8
    },
    "industrial": {
      "averageCapRate": 3.9,
      "averageRentPerSqFt": 18.45,
      "vacancyRate": 4.1,
      "averagePricePerSqFt": 275,
      "yearOverYearValueChange": 7.5
    }
  },
  "Los Angeles": {
    "multifamily": {
      "averageCapRate": 4.5,
      "averageRentPerSqFt": 3.45,
      "vacancyRate": 4.2,
      "averagePricePerUnit": 425000,
      "yearOverYearValueChange": 3.2
    },
    "office": {
      "averageCapRate": 5.6,
      "averageRentPerSqFt": 48.5,
      "vacancyRate": 16.5,
      "averagePricePerSqFt": 650,
      "yearOverYearValueChange": -2.8
    },
    "retail": {
      "averageCapRate": 6.1,
      "averageRentPerSqFt": 52.0,
      "vacancyRate": 9.5,
      "averagePricePerSqFt": 725,
      "yearOverYearValueChange": -3.2
    },
    "industrial": {
      "averageCapRate": 4.2,
      "averageRentPerSqFt": 14.25,
      "vacancyRate": 2.8,
      "averagePricePerSqFt": 225,
      "yearOverYearValueChange": 12.5
    }
  },
  "Miami": {
    "multifamily": {
      "averageCapRate": 4.8,
      "averageRentPerSqFt": 2.95,
      "vacancyRate": 3.8,
      "averagePricePerUnit": 375000,
      "yearOverYearValueChange": 8.5
    },
    "office": {
      "averageCapRate": 5.9,
      "averageRentPerSqFt": 45.5,
      "vacancyRate": 14.2,
      "averagePricePerSqFt": 585,
      "yearOverYearValueChange": 2.1
    },
    "retail": {
      "averageCapRate": 6.5,
      "averageRentPerSqFt": 55.0,
      "vacancyRate": 7.5,
      "averagePricePerSqFt": 685,
      "yearOverYearValueChange": 1.5
    },
    "industrial": {
      "averageCapRate": 4.5,
      "averageRentPerSqFt": 11.25,
      "vacancyRate": 3.1,
      "averagePricePerSqFt": 175,
      "yearOverYearValueChange": 10.2
    }
  },
  "Dallas": {
    "multifamily": {
      "averageCapRate": 5.5,
      "averageRentPerSqFt": 1.85,
      "vacancyRate": 5.1,
      "averagePricePerUnit": 195000,
      "yearOverYearValueChange": 6.2
    },
    "office": {
      "averageCapRate": 6.2,
      "averageRentPerSqFt": 32.5,
      "vacancyRate": 16.9,
      "averagePricePerSqFt": 315,
      "yearOverYearValueChange": -1.2
    },
    "retail": {
      "averageCapRate": 6.8,
      "averageRentPerSqFt": 28.0,
      "vacancyRate": 6.5,
      "averagePricePerSqFt": 285,
      "yearOverYearValueChange": 0.8
    },
    "industrial": {
      "averageCapRate": 4.7,
      "averageRentPerSqFt": 7.85,
      "vacancyRate": 2.9,
      "averagePricePerSqFt": 105,
      "yearOverYearValueChange": 9.8
    }
  }
};

// Helper function to calculate percentile rank of a value within an array
function percentileRank(array, value) {
  const count = array.length;
  const ranks = array.filter(x => x < value).length;
  return Math.round((ranks / count) * 100);
}

// Helper function to get "Good", "Average", or "Poor" based on percentile
function getRating(percentile) {
  if (percentile >= 67) return "Good";
  if (percentile >= 33) return "Average";
  return "Poor";
}

// Helper function to check if a value is "better" for a given metric
function isBetter(metric, value, comparison) {
  // For cap rate, vacancy rate - lower is better
  if (metric === "averageCapRate" || metric === "vacancyRate") {
    return value < comparison;
  }
  // For everything else - higher is better
  return value > comparison;
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  // Extract parameters from the query string
  const city = req.query.city;
  const assetType = req.query.assetType?.toLowerCase();
  const capRate = req.query.capRate ? parseFloat(req.query.capRate) : null;
  const rentPerSqFt = req.query.rentPerSqFt ? parseFloat(req.query.rentPerSqFt) : null;
  const pricePerSqFt = req.query.pricePerSqFt ? parseFloat(req.query.pricePerSqFt) : null;
  const pricePerUnit = req.query.pricePerUnit ? parseFloat(req.query.pricePerUnit) : null;
  
  // Basic validation
  if (!city || !assetType) {
    return res.status(400).json({ error: 'City and assetType parameters are required' });
  }
  
  // Handle case-insensitive city names
  const normalizedCity = Object.keys(marketData).find(
    c => c.toLowerCase() === city.toLowerCase()
  ) || city;
  
  // Check if the city and asset type are available in our data
  if (!marketData[normalizedCity]) {
    return res.status(404).json({ error: `Market data not available for city: ${normalizedCity}` });
  }
  
  const cityData = marketData[normalizedCity];
  
  // Normalize asset type to match our data structure
  const normalizedAssetType = Object.keys(cityData).find(
    a => a.toLowerCase() === assetType.toLowerCase()
  ) || assetType;
  
  if (!cityData[normalizedAssetType]) {
    return res.status(404).json({ 
      error: `Asset type '${normalizedAssetType}' not available for city: ${normalizedCity}`
    });
  }
  
  // Get the market data for the specified city and asset type
  const marketStats = cityData[normalizedAssetType];
  
  // Prepare the response
  const response = {
    city: normalizedCity,
    assetType: normalizedAssetType,
    marketAverages: marketStats,
    comparison: {}
  };
  
  // Compare the provided metrics with market averages if they are specified
  if (capRate !== null) {
    // For cap rate, collect data from all cities for percentile
    const allCapRates = Object.values(marketData)
      .map(city => city[normalizedAssetType]?.averageCapRate)
      .filter(rate => rate !== undefined);
      
    const percentile = percentileRank(allCapRates, capRate);
    response.comparison.capRate = {
      userValue: capRate,
      marketAverage: marketStats.averageCapRate,
      percentile,
      difference: capRate - marketStats.averageCapRate,
      isBetterThanMarket: isBetter("averageCapRate", capRate, marketStats.averageCapRate),
      rating: getRating(percentile)
    };
  }
  
  if (rentPerSqFt !== null) {
    const allRents = Object.values(marketData)
      .map(city => city[normalizedAssetType]?.averageRentPerSqFt)
      .filter(rent => rent !== undefined);
      
    const percentile = percentileRank(allRents, rentPerSqFt);
    response.comparison.rentPerSqFt = {
      userValue: rentPerSqFt,
      marketAverage: marketStats.averageRentPerSqFt,
      percentile,
      difference: rentPerSqFt - marketStats.averageRentPerSqFt,
      isBetterThanMarket: isBetter("averageRentPerSqFt", rentPerSqFt, marketStats.averageRentPerSqFt),
      rating: getRating(percentile)
    };
  }
  
  if (pricePerSqFt !== null && normalizedAssetType !== "multifamily") {
    const allPrices = Object.values(marketData)
      .map(city => city[normalizedAssetType]?.averagePricePerSqFt)
      .filter(price => price !== undefined);
      
    const percentile = percentileRank(allPrices, pricePerSqFt);
    response.comparison.pricePerSqFt = {
      userValue: pricePerSqFt,
      marketAverage: marketStats.averagePricePerSqFt,
      percentile,
      difference: pricePerSqFt - marketStats.averagePricePerSqFt,
      isBetterThanMarket: isBetter("averagePricePerSqFt", pricePerSqFt, marketStats.averagePricePerSqFt),
      rating: getRating(percentile)
    };
  }
  
  if (pricePerUnit !== null && normalizedAssetType === "multifamily") {
    const allPrices = Object.values(marketData)
      .map(city => city["multifamily"]?.averagePricePerUnit)
      .filter(price => price !== undefined);
      
    const percentile = percentileRank(allPrices, pricePerUnit);
    response.comparison.pricePerUnit = {
      userValue: pricePerUnit,
      marketAverage: marketStats.averagePricePerUnit,
      percentile,
      difference: pricePerUnit - marketStats.averagePricePerUnit,
      isBetterThanMarket: isBetter("averagePricePerUnit", pricePerUnit, marketStats.averagePricePerUnit),
      rating: getRating(percentile)
    };
  }
  
  // Add insights based on the comparisons
  response.insights = [];
  
  if (response.comparison.capRate && response.comparison.capRate.isBetterThanMarket) {
    response.insights.push(`The cap rate of ${capRate}% is favorable compared to the market average of ${marketStats.averageCapRate}%.`);
  } else if (response.comparison.capRate) {
    response.insights.push(`The cap rate of ${capRate}% is below the market average of ${marketStats.averageCapRate}%.`);
  }
  
  if (response.comparison.rentPerSqFt && response.comparison.rentPerSqFt.isBetterThanMarket) {
    response.insights.push(`The rent of $${rentPerSqFt}/sqft is higher than the market average of $${marketStats.averageRentPerSqFt}/sqft.`);
  } else if (response.comparison.rentPerSqFt) {
    response.insights.push(`The rent of $${rentPerSqFt}/sqft is below the market average of $${marketStats.averageRentPerSqFt}/sqft.`);
  }
  
  if (response.comparison.pricePerSqFt && !response.comparison.pricePerSqFt.isBetterThanMarket) {
    response.insights.push(`The price of $${pricePerSqFt}/sqft is higher than the market average of $${marketStats.averagePricePerSqFt}/sqft.`);
  } else if (response.comparison.pricePerSqFt) {
    response.insights.push(`The price of $${pricePerSqFt}/sqft is favorable compared to the market average of $${marketStats.averagePricePerSqFt}/sqft.`);
  }
  
  if (response.comparison.pricePerUnit && !response.comparison.pricePerUnit.isBetterThanMarket) {
    response.insights.push(`The price per unit of $${pricePerUnit} is higher than the market average of $${marketStats.averagePricePerUnit}.`);
  } else if (response.comparison.pricePerUnit) {
    response.insights.push(`The price per unit of $${pricePerUnit} is favorable compared to the market average of $${marketStats.averagePricePerUnit}.`);
  }
  
  // Add market context
  response.marketContext = {
    vacancyRate: `${marketStats.vacancyRate}% vacancy rate in ${normalizedCity} for ${normalizedAssetType} properties`,
    yearOverYearValueChange: `${marketStats.yearOverYearValueChange > 0 ? '+' : ''}${marketStats.yearOverYearValueChange}% year-over-year value change`,
    marketTrend: marketStats.yearOverYearValueChange > 3 
      ? "Strong growth market" 
      : marketStats.yearOverYearValueChange > 0 
        ? "Stable growth market" 
        : "Declining market"
  };
  
  return res.status(200).json(response);
}