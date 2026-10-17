// const COMMON_FILTERS = new Set(['session','className','section','name','phone','admissionNo','status','fromDate','toDate','paymentMode','vehicleNo','routeName','search']);
// export function buildFilters(filters={}, startIndex=1) {
//   const clauses=[]; const params=[]; let i=startIndex;
//   const add=(sql,val)=>{ clauses.push(sql.replaceAll('?', `$${i++}`)); params.push(val); };
//   if(filters.session && filters.session!=='ALL') add('session=?',filters.session);
//   if(filters.className && filters.className!=='ALL') add('class_name=?',filters.className);
//   if(filters.section && filters.section!=='ALL') add('section=?',filters.section);
//   if(filters.name) add('name ILIKE ?',`%${filters.name}%`);
//   if(filters.phone) add('phone ILIKE ?',`%${filters.phone}%`);
//   if(filters.admissionNo) add('admission_no=?',filters.admissionNo);
//   if(filters.status && filters.status!=='ALL') add('status=?',filters.status);
//   if(filters.fromDate) add('COALESCE(event_date,created_at::date)>=?::date',filters.fromDate);
//   if(filters.toDate) add('COALESCE(event_date,created_at::date)<=?::date',filters.toDate);
//   if(filters.paymentMode && filters.paymentMode!=='ALL') add('payment_mode=?',filters.paymentMode);
//   if(filters.vehicleNo && filters.vehicleNo!=='ALL') add('vehicle_no=?',filters.vehicleNo);
//   if(filters.routeName) add('route_name=?',filters.routeName);
//   if(filters.search) { const term=`%${filters.search}%`; const p1=`$${i}`, p2=`$${i+1}`, p3=`$${i+2}`; clauses.push(`(COALESCE(name,'') ILIKE ${p1} OR COALESCE(phone,'') ILIKE ${p2} OR COALESCE(admission_no,'') ILIKE ${p3})`); params.push(term,term,term); i+=3; }
//   return { clauses, params, nextIndex:i };
// }
// export { COMMON_FILTERS };
export function buildFilters(filters = {}, startIndex = 1) {
  const conditions = [];
  const values = [];

  let index = startIndex;

  if (filters.fromDate) {
    conditions.push(`event_date >= $${index}`);
    values.push(filters.fromDate);
    index++;
  }

  if (filters.toDate) {
    conditions.push(`event_date <= $${index}`);
    values.push(filters.toDate);
    index++;
  }

  if (filters.session) {
    conditions.push(`LOWER(session) = LOWER($${index})`);
    values.push(filters.session);
    index++;
  }

  if (filters.className) {
    conditions.push(`LOWER(class_name) = LOWER($${index})`);
    values.push(filters.className);
    index++;
  }

  if (filters.section) {
    conditions.push(`LOWER(section) = LOWER($${index})`);
    values.push(filters.section);
    index++;
  }

  if (filters.name) {
    conditions.push(`LOWER(name) LIKE LOWER($${index})`);
    values.push(`%${filters.name}%`);
    index++;
  }

  if (filters.phone) {
    conditions.push(`phone LIKE $${index}`);
    values.push(`%${filters.phone}%`);
    index++;
  }

  if (filters.admissionNo) {
    conditions.push(
      `LOWER(admission_no) = LOWER($${index})`
    );

    values.push(filters.admissionNo);
    index++;
  }

  if (filters.status) {
    conditions.push(
      `LOWER(status) = LOWER($${index})`
    );

    values.push(filters.status);
    index++;
  }

  if (filters.paymentMode) {
    conditions.push(
      `LOWER(payment_mode) = LOWER($${index})`
    );

    values.push(filters.paymentMode);
    index++;
  }

  if (filters.vehicleNo) {
    conditions.push(
      `LOWER(vehicle_no) = LOWER($${index})`
    );

    values.push(filters.vehicleNo);
    index++;
  }

  if (filters.routeName) {
    conditions.push(
      `LOWER(route_name) LIKE LOWER($${index})`
    );

    values.push(`%${filters.routeName}%`);
    index++;
  }

  if (filters.search) {
    conditions.push(`
      (
        LOWER(name) LIKE LOWER($${index})
        OR phone LIKE $${index}
        OR LOWER(admission_no) LIKE LOWER($${index})
        OR LOWER(class_name) LIKE LOWER($${index})
        OR LOWER(section) LIKE LOWER($${index})
      )
    `);

    values.push(`%${filters.search}%`);
    index++;
  }

  return {
    sql:
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "",
    values,
    nextIndex: index,
  };
}