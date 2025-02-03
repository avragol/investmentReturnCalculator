const puppeteer = require('puppeteer');
const fs = require('fs');
const crypto = require('crypto');

async function checkSiteChanges() {
  await sendTelegramNotification('hello world');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    
    // התחברות
    await page.goto('https://your-site.com/login');
    await page.type('#username', process.env.SITE_USERNAME);
    await page.type('#password', process.env.SITE_PASSWORD);
    await page.click('#login-button');
    
    // המתנה לטעינה
    await page.waitForNavigation();

    // סריקת תוכן עמוד ספציפי
    await page.goto('https://your-site.com/target-page');
    const content = await page.content();

    // יצירת hash מהתוכן
    const currentHash = crypto.createHash('md5').update(content).digest('hex');
    const previousHash = fs.existsSync('last-hash.txt') 
      ? fs.readFileSync('last-hash.txt', 'utf8') 
      : null;

    if (currentHash !== previousHash) {
      // שמירת hash חדש
      fs.writeFileSync('last-hash.txt', currentHash);
      
      // שליחת התראה (Telegram לדוגמה)
      await sendTelegramNotification('Site updated!');
    }

  } catch (error) {
    console.error('Error checking site:', error);
  } finally {
    await browser.close();
  }
}

async function sendTelegramNotification(message) {
  console.log("telegram function run")
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  console.log("token", botToken)
  console.log("id", chatId)
  try{
  console.log(await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  }));
  } catch (e){console.log(e)}
}

checkSiteChanges();
