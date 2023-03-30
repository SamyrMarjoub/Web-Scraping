// import puppeteer from 'puppeteer';
require("dotenv").config()
// (async () => {
//     const naveagador = await puppeteer.launch({ headless:false })
//     const page = await naveagador.newPage()
//     // open the url
//     await page.goto("https://beta.character.ai/")
//     await page.setViewport({ width: 1024, height: 1024 })
//     // await page.solveRecaptchas()
//     await page.evaluate(() => {
//         window.localStorage.setItem('VISITED_0', "true");
//         window.localStorage.setItem('OPTIONAL_COOKIES_ACCEPTED_0', "true");

//     })
//     await page.reload()
//     const searchResultSelector = '.btn-sm';
//     await page.waitForSelector(searchResultSelector);
//     await page.click(searchResultSelector);
//     await page.click(".border")
//     // await page.solveRecaptchas()

//     // const googleButtonRef = '.c28fbf930';
//     // await page.waitForSelector(googleButtonRef);
//     // await page.click(googleButtonRef)
//     // const emailWait = "[type='email']"
//     // await page.waitForSelector(emailWait)
//     // await page.type(emailWait, "samirgamesmarjoub@gmail.com")
//     // const btnRef = ".AjY5Oe"
//     // await page.waitForSelector(btnRef)
//     // await page.click(btnRef)
//     // const secondRef = ".nCP5yc"
//     // await page.click(secondRef)
//     // const passType = "[type='password']"
//     // await page.waitForSelector(passType)
//     // await page.type(passType, "samir1234.")

// })()

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
// const {Configuration, OpenAIApi} = require("openai")
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fs = require('fs');

// const configuration = new Configuration({
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({

//     model: "gpt-3.5-turbo",
//     messages: [
//         {
//             role: "system", "content": promptE
//         },
//         { role: "user", "content": generatePrompt(prompt, message.from) }
//     ],
//     max_tokens: 300

// })
// resposta = completion.data.choices[0].message.content.trim()

puppeteer.launch({ headless: false }).then(async browser => {
    let resposta = ""
    console.log('Running tests..')
    const page = await browser.newPage()
    //   await page.waitForTimeout(5000)
    await page.goto("https://beta.character.ai/")
    await page.setViewport({ width: 1024, height: 600 })
    // await page.solveRecaptchas()
    await page.evaluate(() => {
        window.localStorage.setItem('VISITED_0', "true");
        window.localStorage.setItem('OPTIONAL_COOKIES_ACCEPTED_0', "true");

    })
    await page.reload()
    const searchResultSelector = '.btn-sm';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    await page.click(".border")

    const googleButtonRef = '.c28fbf930';
    await page.waitForSelector(googleButtonRef);
    await page.click(googleButtonRef)
    const emailWait = "[type='email']"
    await page.waitForSelector(emailWait)
    //email do google pelo .env
    await page.type(emailWait, process.env.EMAIL)
    const btnRef = ".AjY5Oe"
    await page.waitForSelector(btnRef)
    await page.click(btnRef)
    const passRef = "[type='password']"
    await page.waitForSelector(passRef)
    setTimeout(async () => {
        // senha do google pelo .env
        await page.type(passRef, process.env.SENHA)
        const passRefBtn = ".AjY5Oe"
        await page.waitForSelector(passRefBtn)
        await page.click(passRefBtn)
        setTimeout(async () => {
            const chatRef = '#character_slide_0'
            await page.waitForSelector(chatRef)
            await page.click(chatRef)

            setTimeout(async () => {
                const InputRef = "#user-input"
                await page.waitForSelector(InputRef)
                //pergunta q o chat vai receber
                await page.type(InputRef, "Qaunto é 1+1?")
                const btnInputRef = "[title='Submit Message']"
                await page.waitForSelector(btnInputRef)
                setTimeout(async () => {
                    await page.click(btnInputRef)
                    const textSelector = await page.waitForSelector(".char-msg p")
                    const text = await textSelector.evaluate(el => el.textContent);
                    resposta = text
                    //tem q criar o arquivo Teste pra não dar erro
                    const pathToFile = 'C:/Teste/arquivo.txt';
                    fs.appendFile(pathToFile, resposta, (err) => {
                        if (err) throw err;
                        console.log("Salvo!")
                    })
                }, 1000)


            }, 2500)


        }, 3000)
    }, 2000)



})
