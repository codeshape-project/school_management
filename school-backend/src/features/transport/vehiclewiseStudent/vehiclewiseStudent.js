import { createRecord, listRecords } from '../../recordService.js';

export async function save(data, userId) { return createRecord('vehiclewiseStudent', data, { userId }); }
export async function list(filters) { return listRecords('vehiclewiseStudent', filters); }
