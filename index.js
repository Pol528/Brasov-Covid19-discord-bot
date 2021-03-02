//requireing our dpendencies
const Discord = require("discord.js")
const puppeteer = require("puppeteer")

const client = new Discord.Client(); //creating our discord client

function sleep(ms) { //creating a sleep function that we will use later
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 

const takeScreenshot = async () => { //creating out function that screensshots the page
    const browser = await puppeteer.launch(); //here we open our browser
    const page = await  browser.newPage(); //and create a new page
    await page.setViewport({ //setting the page size to 400x701
        width: 400,
        height: 701,
        deviceScaleFactor: 1,
      });
    const options = { //here we say with what options we want the screenshot to be made
        path: 'images/website.png', //here we set the path where it will save our screenshot
        omitbackround: true //here we set the backroud to trasnparent, even though it won't really help us
    }
    await page.goto("https://covid19.brasovcity.ro/"); //now we open the website we want to sceenshot
    await page.mouse.wheel({ deltaY: 250 }) //and we scroll down a bit because the image isn't at the top of the page
    await sleep(2500); //now we wait a bit for the loading animation of the site to finish
    await page.screenshot(options) //and we take a screenshot with the options we decared earlier
    await browser.close() //and we close our browser
}

client.on('ready', () => { //now when the discord bot is ready
  console.log(`Logged in as ${client.user.tag}!`); //logging that it's ready
  client.user.setActivity("made by tata Pol | numar cazuri de Covid-19") //set the activity
  const azi = new Date(); //create a new date because we only want it to send reports at specific times
  console.log(azi.getHours()) //now we log the hour that we are in right now because if you deploy this to your host, it's likeley that the hosting pc isn't in the same timezone that you are in
});
async function loop() { //now we create a function that will loop every 1 minute
const today = new Date(); //we create the same new date because we can't read it from above
if(today.getHours() === 12){ //now we check if the hour now is 12
    if(today.getMinutes() === 1){ //and if the minute is 1
        await takeScreenshot(); //if both of those are true, we take the screenshot
        const canal = client.channels.cache.get("814451276406325268");//now we set what channel id we want to send our message in
        const poza = new Discord.MessageAttachment("./images/website.png") //we declare our sceenshot that is now saved as ./images/website.png as a discord ttachment
        const embed = new Discord.MessageEmbed() //here we create our embed
        .setAuthor('made by tata Pol', 'https://cdn.discordapp.com/attachments/814098086787022888/814495453491888128/GitHub-Mark.png', 'https://github.com/Pol528') //sneak the credits in the setauthor page
        .setTitle("Covid-19")//simple title cuz i can't think of anything else
        .setColor(`RED`) //color red 
        .setURL(`https://covid19.brasovcity.ro/`) //set url
        .attachFiles(poza)//now we need to attach the messageettachment cuz the discord api is weird
        .setImage('attachment://website.png') //and set the image to the attachment we declared earlier
        .setTimestamp() //set a timestamp at the bottom
        canal.send(embed) //and send it to our channel
     }
    }

    }
    setInterval(loop, 60000); //loop this every 60000ms or 1 minute
client.login("token") //here we log into our discord bot