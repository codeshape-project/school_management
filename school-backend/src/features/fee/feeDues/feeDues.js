import { createRecord, listRecords } from '../../recordService.js';

export async function save(data, userId) { return createRecord('feeDues', data, { userId }); }
export async function list(filters) { return listRecords('feeDues', filters); }
