const fs = require('fs');
const path = require('path');

function join_arrays(array1, array2) {
  array1 = array1.concat(array2)
  var unique = [];
  array1.forEach(element => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
});
  return unique
}

function readFileInChunksAndConvertToJson(filename, chunkSize = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let bytesRead = 0;

    const stream = fs.createReadStream(filename, { highWaterMark: chunkSize });

    stream.on('data', (chunk) => {
      chunks.push(chunk);
      bytesRead += chunk.length;
    });

    stream.on('end', () => {
      const data = Buffer.concat(chunks, bytesRead);
      const json = JSON.parse(data.toString());
      var keys = [];
      var uniqueKeys = [];
      for (element of json){
        keys = keys.concat(Object.keys(element))
      }
      keys.forEach(element => {
        if (!uniqueKeys.includes(element)) {
          uniqueKeys.push(element);
        }
    });
      resolve(uniqueKeys);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

function readDirectoryRecursively(directoryPath) {
  var contents = [];

  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      join_arrays(contents, readDirectoryRecursively(filePath));
    }
    else if (path.extname(filePath) === '.json') {
      if (filePath == "raw_data/Acordaos-20230325T095454Z-001/Acordaos/atco1_acordaos.json")
          console.log(filePath)
          readFileInChunksAndConvertToJson(filePath)
          .then((keys) => {
            contents = join_arrays(contents, keys)
            console.log(contents)
          })
          .catch((err) => {
            console.error(err);
          });
    }
    else {
        console.error(`Found non-JSON file ${filePath}`);
    }
  });

  return contents;
}

const directoryPath = 'raw_data';
readDirectoryRecursively(directoryPath);
