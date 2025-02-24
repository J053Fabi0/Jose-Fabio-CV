var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

var pdfViewer = new PDFjsViewer($("body"));
pdfViewer.loadDocument("./figures/jose-fabio-arguello-loya-resume.pdf");
