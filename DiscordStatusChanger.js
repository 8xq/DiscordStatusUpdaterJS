/*
This is where we import our packages and declare our variables
We use "Chalk" to output colour to our console
We use "Request" to send our PATCH request to the discord endpoint
Here we also set our "Delay" between setting status (1,000MS = 1 second)
Here we also declare our discord token that will be read from "Data.json" file
Here we also use a bool "UseEmojis" and this simply states if emojis should be added
And as you can also see Messages are currently added into an 'array'
*/
const request = require('request');
const chalk = require('chalk');
var fs = require('fs');
var ConfigData = JSON.parse(fs.readFileSync('Data.json', 'utf8'));
const Delay = 4000;
const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));
const Endpoint = "https://discord.com/api/v8/users/@me/settings";
const DiscordToken = ConfigData.DiscordToken;
let UseEmojis = true;
const MessageList = [
	"Nulled.to/Nullcheats | <:wtff:799215584205471764>",
	"www.ranebot.com | <:SadgeSip:825881909619720222>",
	"C# == :) | <a:blobcat:636219905351614464>"
];

/*
This is the 'Request' function that simply sends a PATCH request to the endpoint
This function uses the "Content" param passed to it as the "Content"
We assume a response of 200OK is a success message and anything else is a fail
*/
const PatchRequest = (Content) => {
	request.patch({
		url: Endpoint,
		method: "PATCH",
		body: Content,
		headers: {
			'authorization': DiscordToken,
			'Content-Type': 'application/json'
		}
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
            console.log(chalk.green("Updated status message | waiting " + Delay + "ms till next !"));
		} else {
			if (body.includes("Unauthorized")) {
                console.log(chalk.red("Unauthorized | 401 | Please check your token"));
			} else {
                console.log(chalk.red("Generic catch error !"));
			}
		}
	});
}

/*
This is our main function that grabs our messages and sends request
This will call the function "PatchRequest" and pass the "content" to the function
As you can see the "Content" varies depending if the user wants to enable "Emojis"
This function will also sleep with a preset delay to avoid any rate limiting or API abuse
*/
const UpdateStatus = async () => {
	while (true) {
		for (var i = 0; i < MessageList.length; i++) {
            if(UseEmojis == true){
                let Emoji = MessageList[i].split('|')[1].replace('>','').replace('<','');
                let EmojiID = Emoji.split(':')[2];
                let EmojiName = Emoji.split(':')[1];
                let Message = MessageList[i].split('|')[0];
                PatchRequest("{\"custom_status\":{\"text\":\"" + Message + "\",\"emoji_id\":\""+EmojiID+"\",\"emoji_name\":\""+EmojiName+"\"}}");
            }
            else
            {
                PatchRequest("{\"custom_status\":{\"text\":\""+MessageList[i]+"\"}}");
            }
			await sleep(Delay);
		}
	}
}

/*
This is just a simple function to start the "Loop" / status changer
In the future this could be setup to create a start/stop function :)
For now this simply invokes "UpdateStatus()" 
*/
const Menu = () => {
    console.log(chalk.magenta("\r\n                    ___                         ___                         ___           ___     \r\n     _____         \/\\__\\                       \/\\  \\                       \/\\  \\         \/\\__\\    \r\n    \/::\\  \\       \/:\/ _\/_         ___         \/::\\  \\         ___          \\:\\  \\       \/:\/ _\/_   \r\n   \/:\/\\:\\  \\     \/:\/ \/\\  \\       \/\\__\\       \/:\/\\:\\  \\       \/\\__\\          \\:\\  \\     \/:\/ \/\\  \\  \r\n  \/:\/  \\:\\__\\   \/:\/ \/::\\  \\     \/:\/  \/      \/:\/ \/::\\  \\     \/:\/  \/      ___  \\:\\  \\   \/:\/ \/::\\  \\ \r\n \/:\/__\/ \\:|__| \/:\/_\/:\/\\:\\__\\   \/:\/__\/      \/:\/_\/:\/\\:\\__\\   \/:\/__\/      \/\\  \\  \\:\\__\\ \/:\/_\/:\/\\:\\__\\\r\n \\:\\  \\ \/:\/  \/ \\:\\\/:\/ \/:\/  \/  \/::\\  \\      \\:\\\/:\/  \\\/__\/  \/::\\  \\      \\:\\  \\ \/:\/  \/ \\:\\\/:\/ \/:\/  \/\r\n  \\:\\  \/:\/  \/   \\::\/ \/:\/  \/  \/:\/\\:\\  \\      \\::\/__\/      \/:\/\\:\\  \\      \\:\\  \/:\/  \/   \\::\/ \/:\/  \/ \r\n   \\:\\\/:\/  \/     \\\/_\/:\/  \/   \\\/__\\:\\  \\      \\:\\  \\      \\\/__\\:\\  \\      \\:\\\/:\/  \/     \\\/_\/:\/  \/  \r\n    \\::\/  \/        \/:\/  \/         \\:\\__\\      \\:\\__\\          \\:\\__\\      \\::\/  \/        \/:\/  \/   \r\n     \\\/__\/         \\\/__\/           \\\/__\/       \\\/__\/           \\\/__\/       \\\/__\/         \\\/__\/    \r\n"));
    console.log(chalk.cyan('     Made by Nullcheats | github.com/HDzzzz ' + chalk.red(' <3 \n \n')));
    
    console.log(chalk.cyan('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
    console.log("Status:" + chalk.green("Running"));
    UpdateStatus();
}


Menu();
