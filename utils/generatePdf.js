const puppeteer = require("puppeteer");
const webUrl = "https://hybrid2native.com";
const optionsPDF = { width: 1024, height: 768 };

exports.GeneratePdf = async (html = "") => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: "domcontentloaded",
  });
  // page.goto(webUrl);
  const pdfBuffer = await page.pdf({
    printBackground: true,
    width: optionsPDF.width,
    height: optionsPDF.height,
  });
  await page.close();
  await browser.close();

  return pdfBuffer;
};
