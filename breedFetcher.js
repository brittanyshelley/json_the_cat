const request = require("request");

const breedName = process.argv[2];

const fetchBreedDescription = function(breedName, callback) {
  if (!breedName) {
    callback('please provide a breed name as a command-line argument.', null);
    return;
  }

  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback(`Breed '${breedName}' not found.`, null);
      return;
    }

    const breedInfo = data[0];
    callback(null, breedInfo.description);
  });
};

module.exports = { fetchBreedDescription };
