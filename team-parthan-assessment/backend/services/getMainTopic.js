export default async function getMainTopic({ link, filePath, typeOfInput }) {
  if (link) {
    // Call transcript + topic extractor logic
    return 'Dynamic Programming'; // placeholder
  }
  if (typeOfInput === 'pdf' || typeOfInput === 'image') {
    // Extract text then topic from file
    return 'Graphs'; // placeholder
  }
};
