const request = require("request")
const Discord = require("discord.js")
const puppeteer = require("puppeteer")

const client = new Discord.Client();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 

const takeScreenshot = async () => {
    const browser = await puppeteer.launch();
    const page = await  browser.newPage();
    await page.setViewport({
        width: 400,
        height: 701,
        deviceScaleFactor: 1,
      });
    const options = {
        path: 'images/website.png',
        omitbackround: true
    }
    await page.goto("https://covid19.brasovcity.ro/");
    await page.mouse.wheel({ deltaY: 250 })
    await sleep(2500);
    await page.screenshot(options)

    await browser.close()
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("made by tata Pol | numar cazuri de Covid-19")
  const azi = new Date();
  console.log(azi.getHours())
});
async function loop() { 
    const today = new Date();
if(today.getHours() === 12){
    if(today.getMinutes() === 1){
        await takeScreenshot();
        const canal = client.channels.cache.get("814451276406325268");
        const poza = new Discord.MessageAttachment("./images/website.png", "imagine.png")
        const embed = new Discord.MessageEmbed()
        .setAuthor('made by tata Pol', 'https://cdn.discordapp.com/attachments/814098086787022888/814495453491888128/GitHub-Mark.png', 'https://github.com/Pol528')
        .setTitle("Covid-19")
        .setColor(`RED`)
        .setURL(`https://covid19.brasovcity.ro/`)
        .attachFiles(poza)
        .setImage('attachment://imagine.png')
        .setTimestamp()
        canal.send(embed)
     }
    }

    }
    setInterval(loop, 60000);
client.login("ODE0NDU4ODA0Njg2MjkwOTk0.YDeJ3g.OuN7yxeBrY2YQQT5et4sTwNOw1w")