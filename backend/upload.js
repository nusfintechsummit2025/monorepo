const ipfs = require('./ipfs');

async function uploadToIPFS(fileBuffer) {
  try {
    const result = await ipfs.add(fileBuffer);
    return result.path; // Returns the CID
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
}


async function fetchFromIPFS(cid) {
    try {
      const stream = ipfs.cat(cid);
      let data = '';
  
      for await (const chunk of stream) {
        data += chunk.toString();
      }
  
      return data;
    } catch (error) {
      console.error('IPFS fetch error:', error);
      throw error;
    }
  }
module.exports = { uploadToIPFS, fetchFromIPFS };  