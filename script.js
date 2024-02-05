$(document).ready(function(){
  // Ativar/desativar a edição do input quando a página é carregada
  toggleInput();

  // Ativar/desativar a edição do input quando o switch é clicado
  $("#disableInput").on("change", function() {
      toggleInput();
  });

  // Aplicar a máscara de data e hora enquanto o usuário digita
  $("#dataehora").inputmask('99/99/9999 99:99:99', {
      placeholder: 'DD/MM/YYYY HH:mm:ss',
      clearIncomplete: true
  });

  // Aplicar a máscara de data enquanto o usuário digita
  $("#datepag").inputmask('99/99/9999', {
      placeholder: 'DD/MM/YYYY',
      clearIncomplete: true
  });
});

function toggleInput() {
  const now = new Date();
  const formattedDateTime = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  const formattedDate = now.toLocaleDateString();

  if ($("#disableInput").is(":checked")) {
      // Adicionar 1 minuto ao valor atual nos minutos
      now.setMinutes(now.getMinutes() + 1);
      const formattedDateTimeWithMinutes = now.toLocaleDateString() + " " + now.toLocaleTimeString();
      $("#dataehora").val(formattedDateTimeWithMinutes);
      $("#dataehora").prop("disabled", true);

      // Definir a data atual no input
      $("#datepag").val(formattedDate);
      $("#datepag").prop("disabled", true);
  } else {
      // Definir a data e hora atual no input
      $("#dataehora").val(formattedDateTime);
      $("#dataehora").prop("disabled", false);

      // Definir a data atual no input
      $("#datepag").val(formattedDate);
      $("#datepag").prop("disabled", false);
  }
}


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
    let barcode = document.getElementById('barcode').value;
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

    // Remover espaço do final do valor, se houver
    barcode = barcode.replace(/\s+$/, '');

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