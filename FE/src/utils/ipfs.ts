import axios from 'axios';

const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
const IPFS_PIN_HOST = 'https://api.pinata.cloud/pinning/';
const API_KEY = '4b96899d48f0c349a9c9';
const API_SECRET = '841e416c999c69629c1e584aa36200b621efd4caa222e3993aee286c017b9adb';

export const getIpfsUrl = (hash: string) => {
  return `${IPFS_GATEWAY}${hash}`;
};

export const pinObject = async (object: any) => {
  const url = `${IPFS_PIN_HOST}pinJSONToIPFS`;

  return axios.post(url, JSON.parse(object), {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET
    }
  });
};

export const pinFileToIpfs = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const url = `${IPFS_PIN_HOST}pinFileToIPFS`;

  return axios.post(url, formData, {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
      'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}`
    }
  });
};
