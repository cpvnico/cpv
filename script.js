const { PDFDocument, rgb, StandardFonts } = PDFLib;

async function modifyPdf() {
    const outroValor = document.getElementById('outroValor').value;
    const terceiroValor = document.getElementById('terceiroValor').value;
    const quartoValor = document.getElementById('quartoValor').value;
    const quintoValor = document.getElementById('quintoValor').value;

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
    const outroValorWidth = helveticaFont.widthOfTextAtSize(outroValor, 8.25);
    // Calcular a posição X para o Outro Valor
    const outroValorXPosition = 558 - outroValorWidth;

    // Obter a largura do texto inserido para o Terceiro Valor
    const terceiroValorWidth = helveticaFont.widthOfTextAtSize(terceiroValor, 8.25);
    // Calcular a posição X para o Terceiro Valor
    const terceiroValorXPosition = 560 - terceiroValorWidth;

    // Obter a largura do texto inserido para o Quarto Valor
    const quartoValorWidth = helveticaFont.widthOfTextAtSize(quartoValor, 8.25);
    // Calcular a posição X para o Quarto Valor
    const quartoValorXPosition = 560 - quartoValorWidth;

    // Obter a largura do texto inserido para o Quinto Valor
    const quintoValorWidth = helveticaFont.widthOfTextAtSize(quintoValor, 8.25);
    // Calcular a posição X para o Quinto Valor
    const quintoValorXPosition = 560 - quintoValorWidth;

    // Desenhar uma string de texto na primeira página para o Outro Valor
    firstPage.drawText(outroValor, {
      x: outroValorXPosition,
      y: 780,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Terceiro Valor
    firstPage.drawText(terceiroValor, {
      x: terceiroValorXPosition,
      y: 699,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Quarto Valor
    firstPage.drawText(quartoValor, {
      x: quartoValorXPosition,
      y: 687,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Desenhar uma string de texto na primeira página para o Quinto Valor
    firstPage.drawText(quintoValor, {
      x: quintoValorXPosition,
      y: 677,
      size: 8.25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Serializar o PDFDocument para bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Acionar o download do documento PDF no navegador
    download(pdfBytes, "CPV.pdf", "application/pdf");
}