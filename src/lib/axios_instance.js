import HttpsProxyAgent from 'https-proxy-agent';
import axios from 'axios';
export default axios.create({
    httpsAgent: process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : {}
});
