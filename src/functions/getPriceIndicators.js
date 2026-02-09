const getPriceIndicators = (language) => {
  return language === "en"
    ? ["Monthly inflation rate", "Annual inflation rate"]
    : ["ინფლაციის დონე წინა თვესთან შედარებით", "წლიური ინფლაციის დონე"];
};

export default getPriceIndicators;
