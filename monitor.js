const puppeteer = require('puppeteer');
const fs = require('fs');
const crypto = require('crypto');

async function checkSiteChanges() {
  //await sendTelegramNotification('hello world');
 /*  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage(); */

  try {
    // התחברות
    const startTime = performance.now(); // התחלת מדידה
    await fetch('https://cofeeapp.onrender.com');
    const endTime = performance.now(); // סיום מדידה

    const fetchTime = (endTime - startTime).toFixed(2); // זמן במילישניות
    await sendTelegramNotification('cofeeApp is alive! response time: ' + fetchTime + 'ms');
    
   /*  await page.goto('https://daycareeligibilitycheck.labor.gov.il/');
    const c = await page.content();
    console.log("page before types: ", c)
    await page.type('#txtTZkid', process.env.SITE_txtTZkid);
    await page.type('#myDatapicker', process.env.SITE_BIRTHDAY);
    await page.type('#txtTZparents', process.env.SITE_txtTZparents);
    await page.click('#ddlYear');
    await page.click('#ddlYear [value="2024"]');
    await page.click('#btnSubmit');

    // המתנה לטעינה
    await page.waitForNavigation();

    const content = await page.content();
    console.log("content", content)
    // יצירת hash מהתוכן
    const currentHash = crypto.createHash('md5').update(content).digest('hex');
    const previousHash = fs.existsSync('last-hash.txt')
      ? fs.readFileSync('last-hash.txt', 'utf8')
      : null;

    if (currentHash !== previousHash) {
      // שמירת hash חדש
      fs.writeFileSync('last-hash.txt', currentHash);

      // שליחת התראה (Telegram לדוגמה)
      await sendTelegramNotification('Site updated!'); */
    

  } catch (error) {
    console.error('Error in monitor:', error);
  } finally {
    /* await browser.close(); */
  }
  try {
    // התחברות
    const startTime = performance.now(); // התחלת מדידה
    await fetch('https://first-project-ag-server.onrender.com/api/cards/cards');
    const endTime = performance.now(); // סיום מדידה

    const fetchTime = (endTime - startTime).toFixed(2); // זמן במילישניות
    await sendTelegramNotification('Cardify is alive! response time: ' + fetchTime + 'ms');
  } catch (error) {
    console.error('Error in monitor:', error);
  } finally {
    /* await browser.close(); */
  }
}

async function sendTelegramNotification(message) {
  console.log("telegram function run")
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  console.log("token", botToken)
  console.log("id", chatId)
  try {
    console.log(await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    }));
  } catch (e) { console.log(e) }
}

checkSiteChanges();
