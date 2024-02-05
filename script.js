$(document).ready(function(){
  $(".Valor").maskMoney({
      thousands: '.',
      decimal: ',',
      allowZero: true,
      precision: 2,
      allowNegative: false
  });
});

const { PDFDocument, rgb, StandardFonts } = PDFLib;

async function modifyPdf() {
    const dataehora = document.getElementById('dataehora').value;
    const barcode = document.getElementById('barcode').value;
    const datepag = document.getElementById('datepag').value;
    const Valor = document.getElementById('Valor').value;

    // Fetch um documento PDF existente
    const url = './assets/CPV.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Carregar um PDFDocument a partir dos bytes do PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Incorporar a fonte Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Obter a primeira página do documento
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Obter a largura do texto inserido para o Outro Valor
    const dataehoraWidth = helveticaFont.widthOfTextAtSize(dataehora, 8.25);
    // Calcular a posição X para o Outro Valor
    const dataehoraXPosition = 558 - dataehoraWidth;

    // Obter a largura do texto inserido para o Terceiro Valor
    const barcodeWidth = helveticaFont.widthOfTextAtSize(barcode, 8.25);
    // Calcular a posição X para o Terceiro Valor
    const barcodeXPosition = 560 - barcodeWidth;

    // Obter a largura do texto inserido para o Quarto Valor
    const datepagWidth = helveticaFont.widthOfTextAtSize(datepag, 8.25);
    // Calcular a posição X para o Quarto Valor
    const datepagXPosition = 560 - datepagWidth;

    // Obter a largura do texto inserido para o Quinto Valor
    const ValorWidth = helveticaFont.widthOfTextAtSize(Valor, 8.25);
    // Calcular a posição X para o Quinto Valor
    const ValorXPosition = 560 - ValorWidth;

    // Desenhar uma string de texto na primeira página para o Outro Valor
    firstPage.drawText(dataehora, {
      x: dataehoraXPosition,
      y: 780,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Terceiro Valor
    firstPage.drawText(barcode, {
      x: barcodeXPosition,
      y: 699,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Quarto Valor
    firstPage.drawText(datepag, {
      x: datepagXPosition,
      y: 687,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Quinto Valor
    firstPage.drawText(Valor, {
      x: ValorXPosition,
      y: 676,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Serializar o PDFDocument para bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Acionar o download do documento PDF no navegador
    download(pdfBytes, "CPV.pdf", "application/pdf");
}