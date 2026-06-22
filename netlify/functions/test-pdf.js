import PDFDocument from "pdfkit";

export const handler = async () => {
  try {
    const chunks = [];
    const doc = new PDFDocument({ margin: 50 });

    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfReady = new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);
    });

    doc
      .fontSize(24)
      .fillColor("#d4af37")
      .text("Les 22 Archétypes", { align: "center" })
      .moveDown()
      .fontSize(14)
      .fillColor("#333333")
      .text("Rapport de Numérologie — Test", { align: "center" })
      .moveDown(2)
      .fontSize(12)
      .fillColor("#555555")
      .text("Prénom : Marie", { align: "left" })
      .text("Date de naissance : 15/03/1990", { align: "left" })
      .moveDown()
      .text("Chemin de vie : 1", { align: "left" })
      .text("Arcane Personnel : Le Bateleur", { align: "left" });

    doc.end();
    await pdfReady;

    const pdfBuffer = Buffer.concat(chunks);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "OK",
        message: "pdfkit fonctionne en Netlify Function",
        taille_pdf: `${pdfBuffer.length} octets`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "FAIL", erreur: err.message }),
    };
  }
};
