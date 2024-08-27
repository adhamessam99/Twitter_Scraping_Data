const puppeteer = require('puppeteer');  //nodejs module that render pages and used to handle dynamic content and execute javascript
const schedule = require('node-schedule'); // modules to scheduling run at specific times
const readlineSync = require('readline-sync'); //take user inputs

// add delays in miliseconds to wait for page to load fully
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// funtion that scrape single twitter account and takes 3 parameters -> page: represent singe tab in the browser. url:twitter account url. ticker:the sympol like $TSLA 
const scrapeTwitter = async (page, url, ticker) => {
    try {
        // go to the page url . and waiting until page fully loaded
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('article', { visible: true });

        // Scroll down the page to load more tweets
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
        await sleep(2000); // wait 2 second to load the additional tweets after scrolling

        // select all the tweets and filtering the tweets to keep only the tweets that has ticker words in it(as $TSLA) and count its mentions of ticker
        const mentions = await page.evaluate((ticker) => {
            const tweets = Array.from(document.querySelectorAll('article div[lang]'));
            return tweets.filter(tweet => tweet.innerText.includes(ticker)).length;
        }, ticker);
        
        // return number of mentions of ticker
        return mentions;
        // if there is error during scrapping the website , return 0
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return 0;
    }
};


const main = async () => {
    //arrays of the twitter urls to scrape
    const accounts = [
        "https://twitter.com/Mr_Derivatives",
        "https://twitter.com/warrior_0719",
        "https://twitter.com/ChartingProdigy",
        "https://twitter.com/allstarcharts",
        "https://twitter.com/yuriymatso",
        "https://twitter.com/TriggerTrades",
        "https://twitter.com/AdamMancini4",
        "https://twitter.com/CordovaTrades",
        "https://twitter.com/Barchart",
        "https://twitter.com/RoyLMattox"
    ];
    // take the ticker and time interval from the user
    const ticker = readlineSync.question('Enter the ticker to search (e.g, $TSLA): ');
    const interval = parseInt(readlineSync.question('Enter the time interval in minutes: '), 10);

    const browser = await puppeteer.launch({ headless: true });
    // opens new tap in browser
    const page = await browser.newPage();

    //perform scrapping for all accounts
    const performScraping = async () => {
        console.log(`\nScraping started at ${new Date().toLocaleTimeString()}...`);
        // keep track of total mentions for all accounts
        let totalMentions = 0;

        for (let account of accounts) {
            const mentions = await scrapeTwitter(page, account, ticker);
            totalMentions += mentions;
            console.log(`Found ${mentions} mentions in ${account}`);
        }

        console.log(`\n'${ticker}' was mentioned '${totalMentions}' times in the last '${interval}' minutes.\n`);
    };

    await performScraping();
    // run at specific time that entered by user 
    schedule.scheduleJob(`*/${interval} *`, performScraping);

    console.log(`\nScraper scheduled to run every ${interval} minutes. Press Ctrl+C to stop.\n`);
};

// Run the main function
main().catch(console.error);
