# DiscordStatusUpdaterJS
```
This is a nodeJS project that allows you to automatically update your discord status from a list of messages
This currently supports both status messages with or without 'Emojis'
```

![Alt text](https://github.com/HDzzzz/DiscordStatusUpdaterJS/blob/main/Preview/9ef6d693c3f2c12d376114ca6dd21fc8.gif?raw=true "Example")

## How to use
```
1 | Open "Data.json" and paste your discord token between the ""
2 | Run commands 'NPM - i chalk' & 'NPM -i request'
3 | In terminal navigate to directory with project
4 | In terminal type node DiscordStatusChanger.js
```

## How to add messages
```
1 | For no emoji simply add the text line to the array 'MessageList' in the JS file
2 | For emoji simply add the line of text to the array followed by ' | <:EmojiName:emoji-ID>
3 | You can get the emoji name by typing '\' then the emoji in discord 
4 | If you use discord to get the ID you can just copy the result discord provides and remove the '\'
```
![Alt text](https://github.com/HDzzzz/DiscordStatusUpdaterJS/blob/main/Preview/6f023142cf64d581fd37ac89c53cb392.gif?raw=true "Example")

## How to grab your discord token
```
1 | Open discord client and press CTRL + SHIFT + I
2 | Navigate to the 'Network' Tab
3 | Click on a chat or server and look for 'Science' on the network tab
4 | Click on 'Science' and look for 'Authorization' under 'request headers'
5 | Copy the long string next to 'Authorization' this is your token !
```
[Video guide (part 2)](https://youtu.be/WWHZoa0SxCc?t=145)    


## Npm packages
```
1 | npm i chalk
2 | npm i request
```

## Downloads & links 
[Chalk node package](https://www.npmjs.com/package/chalk)    
[Request](https://www.npmjs.com/package/request)    


```
Admin@hvh.site
```
