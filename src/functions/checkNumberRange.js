const checkNumberRange = (number, data) => {
  let firstColor = null; // Variable to store the color of the first range
  let lastColor = null; // Variable to store the color of the last range

  for (const key in data) {
    if (key !== "measurement") {
      // Skip the measurement property
      const range = data[key].num;
      const color = data[key].color;

      // Store the color of the first range
      if (firstColor === null) {
        firstColor = color; // Set the first color
      }

      // Check if the range is an array (for ranges) or a single number
      if (Array.isArray(range)) {
        if (range.length === 2) {
          // Check if the number is within the range
          if (number >= range[0] && number <= range[1]) {
            return color; // Return color if within range
          }
        } else if (range.length === 1) {
          // Check if the number is equal to the single number
          if (number === range[0]) {
            return color; // Return color if equal to single number
          }
        }
      } else {
        // If it's a single number (not an array)
        if (number === range) {
          return color; // Return color if equal to single number
        }
      }

      // Store the last color for numbers above the highest range
      lastColor = color;
    }
  }

  // If the number is less than the lowest defined range, return the first color
  if (number < data["1para"].num) {
    return firstColor; // Return the first color if the number is below the lowest range
  }

  // If the number is greater than the highest defined range, return the last color
  return lastColor; // Return the last color if no match found
};

export default checkNumberRange;
