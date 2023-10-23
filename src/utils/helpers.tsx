export const formateDate = (date: Date) => {
  const timestamp = "2023-10-18T21:36:43.865177";
  const dateObj = new Date(timestamp);

  const formattedDate = dateObj.toLocaleDateString(); // Format date (e.g., "10/18/2023")
  const formattedTime = dateObj.toLocaleTimeString(); // Format time (e.g., "21:36:43")

  return { formattedDate, formattedTime };
};
