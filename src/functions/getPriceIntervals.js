import getPriceIndicators from "./getPriceIndicators";

const getPriceIntervals = (language) => {
  return {
    [getPriceIndicators(language)[0]]: {
      "1para": {
        num: -6,
        color: "#798748",
      },
      "2para": {
        num: [-4, -2],
        color: "#98a867",
      },
      "3para": {
        num: [-2, 0],
        color: "#b5c989",
      },
      "4para": {
        num: [0, 2],
        color: "#d7f0af",
      },
      "5para": {
        num: [2, 4],
        color: "#8fc908",
      },
      "6para": {
        num: [4, 6],
        color: "#6c9806",
      },
      "7para": {
        num: [6],
        color: "#8fc908",
      },
      measurement_ge: "ინფლაციის დონე წინა თვესთან შედარებით",
      measurement_en: "Inflation rate compared to the previous month",
    },
    [getPriceIndicators(language)[1]]: {
      "1para": {
        num: -6,
        color: "#e7eb7b",
      },
      "2para": {
        num: [-4, -2],
        color: "#6b9993",
      },
      "3para": {
        num: [-2, 0],
        color: "#9fc4be",
      },
      "4para": {
        num: [0, 2],
        color: "#d8f2ed",
      },
      "5para": {
        num: [2, 4],
        color: "#A6B862",
      },
      "6para": {
        num: [4, 6],
        color: "#779235",
      },
      "7para": {
        num: [6],
        color: "#F4C49C",
      },
      measurement_ge: "წლიური ინფლაციის დონე",
      measurement_en: "Annual inflation rate",
    },
  };
};
export default getPriceIntervals;
