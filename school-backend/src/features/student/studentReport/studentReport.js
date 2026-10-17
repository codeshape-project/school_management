import { createRecord, listRecords } from '../../recordService.js';

export async function save(data, userId) { return createRecord('studentReport', data, { userId }); }
export async function list(filters) { return listRecords('studentReport', filters); }
