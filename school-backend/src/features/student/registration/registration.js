import { createRecord, listRecords, searchRecords } from '../../recordService.js';

export async function save(data, userId) { return createRecord('registration', data, { userId }); }
export async function list(filters) { return listRecords('registration', filters); }
export async function search(filters) { return searchRecords('registration', filters); }