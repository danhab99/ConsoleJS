# ConsoleJS
This simple script will allow you to create terminal-esq interfaces on your webpage

## Implementation

### Step: 1
Add this tag where the rest of your script tags are
```<script href="https://raw.githubusercontent.com/danhab99/ConsoleJS/master/console.min.js"></script>```

### Step: 2
Add an `isConsole` attribute to the `div` you want to make a console. **THIS WILL ONLY WORK ON `DIV`S***.

### Step: 2.1
Include the console's script file in your group of script tags. Like so:

```<script src="js/console1.js"></script>```

Then set the Console Div's `console-Script` attribute to the same source as the previous script tag. This will make this Console Div run this script. Don't worry, we'll prepare the script in a moment.

### Step: 2.2 (Optional)

A Console Div has afew optional attributes:

| Attribute         | Description                | Default |
|-------------------|----------------------------|---------|
| console-Forecolor | Sets the color of the text | #ffffff |
| console-Backcolor | Sets the background        | #000000 |
| console-FontSize  | Sets the font size         | 12      |
| console-Font      | Sets the font family used  | Verdana |

### Step: 3
Now we will prepare the script file. It must be a completly seperate .js file and must look like this:

```javascript
  var console1 = {
	main: function(C){
		//YOUR CODE HERE
	}
};

//YOUR FUNCTIONS OUT HERE
```

### Step: 4
**Done!** Considering you just followed my instructions explicitly you should have a running console div!

## Script usage
In the script file where it says `//YOUR CODE HERE` you will see right above it a big 'C'. You can change that to be 'console' if you'd like. It us used to access the (currently) three console commands.

| Command   | Parameters        | Description                         |
|-----------|-------------------|-------------------------------------|
| WriteLine | message           | Prints something out to the console |
| ReadLine  | callback(results) | Requests an input from the user     |
| Beep      | none              | Will beep                           |

For example `C.WriteLine("Hello World")` will print hello world. All your code and logic should take place within the script files as external interaction is not ~~tested~~ reccomended.
