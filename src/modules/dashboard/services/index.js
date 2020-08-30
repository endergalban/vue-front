import httpClient from '../../../common/services/http-client';

const getRecords = async (payload) => httpClient.get(
  `/records?page=${payload.page}&page_size=${payload.pageSize}${payload.filters}`,
);

const getRecord = async (payload) => httpClient.get(`/records/${payload}`);

const deleteRecord = async (payload) => httpClient.delete(`/records/${payload.id}`);

const getReportRecord = async (payload) => httpClient.get(`/records/${payload}/excel`);

export {
  getRecords,
  getRecord,
  getReportRecord,
  deleteRecord,
};
