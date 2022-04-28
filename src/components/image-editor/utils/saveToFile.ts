export const saveToFile = (imageData: string) => {
  const link = document.createElement('a');
  link.download = 'my-linkedin-frame.png';
  link.href = imageData;
  link.click();
};
