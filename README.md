# BetterStacy | Discord Bot

BetterStacy is intergrated with the fun and moderative commands. This bot is originally desineged for the use of public 

## Installation

In order to run this you already should have node installed and add config.json to main directory

```json
{
    prefix: "!",
    token: "Your bot token"
}
```
then you can run it normally 
```bash
npm install 
node bot.js
```

## Usage

```javascript
const  Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {
//build your command here use try catch
    try {
     
    } catch(e) {

    }

}

module.exports.help= {
    name: "commandName",
    desc: " command Description"
}
```

## Contributing
Pull requests are welcome. For major changes, please contact me on [Discord](https://discordapp.com/users/721964010160783432).

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
