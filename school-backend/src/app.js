import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import morgan from 'morgan';
import authRoutes from './auth/authRoutes.js'; import dashboardRoutes from './dashboard/dashboardRoutes.js'; import reportRoutes from './reports/universal/universalReportRoutes.js';
import studentRoutes from './shared/student/studentRoutes.js'; import studentLedgerRoutes from './shared/studentLedger/studentLedgerRoutes.js'; import feeDuesRoutes from './shared/feeDues/feeDuesRoutes.js'; import feeFormatRoutes from './shared/feeFormat/feeFormatRoutes.js';
import enquiryRoutes from './features/student/enquiry/enquiryRoutes.js'; import studentReportRoutes from './features/student/studentReport/studentReportRoutes.js'; import registrationRoutes from './features/student/registration/registrationRoutes.js'; import complaintRoutes from './features/student/complaint/complaintRoutes.js'; import tcRoutes from './features/student/transferCertificate/transferCertificateRoutes.js';
import receiptRoutes from './features/fee/receipt/receiptRoutes.js'; import collectionRoutes from './features/fee/collection/collectionRoutes.js'; import blankReceiptRoutes from './features/fee/blankReceipt/blankReceiptRoutes.js';
import transportRoutes from './features/transport/transportAllotment/transportAllotmentRoutes.js'; import vehiclewiseStudentRoutes from './features/transport/vehiclewiseStudent/vehiclewiseStudentRoutes.js'; import conveyanceStudentRoutes from './features/transport/conveyanceStudent/conveyanceStudentRoutes.js'; import conveyanceAmountRoutes from './features/transport/conveyanceAmount/conveyanceAmountRoutes.js';
import { env } from './config/env.js'; import { notFoundMiddleware } from './middleware/notFoundMiddleware.js'; import { errorMiddleware } from './middleware/errorMiddleware.js';

const app=express();
app.use(helmet()); app.use(cors({origin:env.frontendUrl,credentials:false})); app.use(express.json({limit:'10mb'})); app.use(express.urlencoded({extended:true,limit:'10mb'})); app.use(morgan('dev'));
app.get('/api/health',(_req,res)=>res.json({success:true,message:'School Management API is running.'}));
app.use('/api/auth',authRoutes); app.use('/api/dashboard',dashboardRoutes); app.use('/api/reports',reportRoutes);
app.use('/api/student',studentRoutes); app.use('/api/student-ledger',studentLedgerRoutes); app.use('/api/fee-dues',feeDuesRoutes); app.use('/api/fee-format',feeFormatRoutes);
app.use('/api/enquiries',enquiryRoutes); app.use('/api/student-report',studentReportRoutes); app.use('/api/registrations',registrationRoutes); app.use('/api/complaints',complaintRoutes); app.use('/api/transfer-certificates',tcRoutes);
app.use('/api/fee-receipts',receiptRoutes); app.use('/api/fee-collections',collectionRoutes); app.use('/api/blank-receipts',blankReceiptRoutes);
app.use('/api/transport-allotments',transportRoutes); app.use('/api/vehiclewise-students',vehiclewiseStudentRoutes); app.use('/api/conveyance-students',conveyanceStudentRoutes); app.use('/api/conveyance-amounts',conveyanceAmountRoutes);
app.use('/uploads',express.static('uploads'));
app.use(notFoundMiddleware); app.use(errorMiddleware); export default app;
