# Twitter Stock Symbol Scraper

## Overview

This project is a Node.js-based tool that scrapes Twitter accounts for mentions of specific stock symbols (e.g., `$TSLA`). 
It uses Puppeteer to interact with Twitter pages and extract data dynamically loaded by JavaScript. The tool allows you to specify a list of Twitter accounts, 
a stock symbol to search for, and a time interval for repeated scraping sessions.

## Features

- **Dynamic Content Scraping:** Utilizes Puppeteer to handle and scrape content dynamically loaded via JavaScript.
- **Configurable Input:** Accepts user inputs for the stock symbol, time interval, and Twitter accounts to monitor.
- **Scheduled Scraping:** Automatically scrapes the specified Twitter accounts at the given interval and counts the number of times the stock symbol is mentioned.
- **Console Output:** Displays the number of mentions found along with the time of scraping.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (Node package manager, comes with Node.js)

 **Install Dependencies:**

    ```bash
    npm install
    ```

## Usage

1. **Run the Script:**

    ```bash
    node scraper.js
    ```

2. **Input Parameters:**
   - **Stock Symbol:** Enter the stock symbol you want to search for (e.g., `$TSLA`).
   - **Time Interval:** Enter the time interval (in minutes) for how often the scraping should be repeated.
   - The script will then begin scraping the specified Twitter accounts for the given stock symbol.

3. **Output:**
   - The tool will output the number of times the stock symbol was mentioned across the provided Twitter accounts within the specified time interval.
   - Example output:
     ```
     Scraping started at 8:50:37 PM...
     Found 1 mentions in https://twitter.com/Mr_Derivatives
     Found 0 mentions in https://twitter.com/warrior_0719
     Found 0 mentions in https://twitter.com/ChartingProdigy
     ...
     '$TSLA' was mentioned '1' times in the last '15' minutes.
     ```

## Project Structure

- **`scraper.js`:** The main script file that contains the scraping logic using Puppeteer.
- **`package.json`:** Contains the project metadata and dependencies.
- **`node_modules/`:** Directory containing the installed Node.js modules.

## How It Works

1. The script uses Puppeteer to launch a headless browser instance.
2. It navigates to each Twitter account's page and waits for the content to load.
3. The script scrolls the page to load more tweets, ensuring dynamic content is fully rendered.
4. It then counts the number of times the specified stock symbol is mentioned within the tweets.
5. This process is repeated for all provided Twitter accounts and the results are displayed in the console.

## Limitations

- **Rate Limiting:** Be aware of Twitter's rate limiting. Scraping too frequently might result in your IP being temporarily blocked by Twitter.
- **Content Changes:** Any significant changes to Twitter's page structure might break the scraping logic and require updates to the code.
- **Legal Considerations:** Ensure that your scraping activities comply with Twitter's terms of service and any applicable laws.

## Dependencies

- **[Puppeteer](https://pptr.dev/):** Used for controlling a headless version of Chrome/Chromium for scraping.
- **[node-schedule](https://www.npmjs.com/package/node-schedule):** A flexible cron-like job scheduler for Node.js, used for scheduling repeated scraping tasks.
- **[readline-sync](https://www.npmjs.com/package/readline-sync):** Synchronous prompt for user input.



## Acknowledgements

- Inspiration for this project came from the need to track real-time mentions of specific stock symbols on Twitter.
- Thanks to the open-source community for providing the tools and libraries used in this project.

