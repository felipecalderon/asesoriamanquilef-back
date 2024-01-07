import PDFDocument from 'pdfkit'
import { Buffer } from 'buffer';

interface PDFDetails {
    titulo: string;
    detalle: string;
}

export const generarPDF = ({ titulo, detalle }: PDFDetails): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', (data: Buffer) => {
            buffers.push(data);
        });

        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.on('error', reject);

        doc.fontSize(20).text(titulo, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(detalle);
        doc.end();
    });
};