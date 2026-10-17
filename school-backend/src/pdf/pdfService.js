import PDFDocument from 'pdfkit';

function value(row,col){
  if(row[col] !== undefined && row[col] !== null) return String(row[col]);
  if(row.form_data && row.form_data[col] !== undefined && row.form_data[col] !== null) return String(row.form_data[col]);
  return '';
}

export function createPdfReport(report, title, filters={}) {
  return new Promise((resolve,reject)=>{
    const doc=new PDFDocument({size:'A4',margin:28}); const chunks=[];
    doc.on('data',c=>chunks.push(c)); doc.on('end',()=>resolve(Buffer.concat(chunks))); doc.on('error',reject);
    doc.fontSize(16).font('Helvetica-Bold').text('SCHOOL MANAGEMENT SYSTEM');
    doc.moveDown(0.25).fontSize(13).text(title);
    doc.moveDown(0.2).fontSize(8).font('Helvetica').text(`Generated: ${new Date().toLocaleString('en-IN')}`);
    const filterText=Object.entries(filters||{}).filter(([,v])=>v!==undefined&&v!==''&&(!Array.isArray(v)||v.length)).map(([k,v])=>`${k}: ${Array.isArray(v)?v.join(', '):v}`).join(' | ');
    if(filterText) doc.moveDown(0.25).fontSize(8).text(`Filters: ${filterText}`);
    doc.moveDown(0.5);
    const cols=report.columns||[]; const rows=report.rows||[];
    const pageWidth=doc.page.width-doc.page.margins.left-doc.page.margins.right;
    const widths=cols.map(()=>Math.max(35,Math.floor(pageWidth/Math.max(cols.length,1))));
    const drawHeader=()=>{doc.font('Helvetica-Bold').fontSize(7); let x=doc.page.margins.left; cols.forEach((c,i)=>{doc.text(c,x,doc.y,{width:widths[i],ellipsis:true});x+=widths[i];});doc.moveDown(0.7);doc.font('Helvetica').fontSize(6.5)};
    drawHeader();
    for(const row of rows){
      if(doc.y>doc.page.height-45){doc.addPage();drawHeader();}
      let x=doc.page.margins.left; const y=doc.y;
      cols.forEach((c,i)=>{doc.text(value(row,c),x,y,{width:widths[i],height:22,ellipsis:true});x+=widths[i];});
      doc.y=y+24; doc.moveTo(doc.page.margins.left,doc.y-4).lineTo(doc.page.width-doc.page.margins.right,doc.y-4).strokeOpacity(0.15).stroke();
    }
    doc.moveDown(0.5).fontSize(9).font('Helvetica-Bold').text(`Total records: ${rows.length}`);
    doc.end();
  });
}
