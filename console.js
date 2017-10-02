var allConsoleElements;
var mainstyle;

window.onload = function(){
	console.log("INIT");
	
	allConsoleElements = document.querySelectorAll("div[isConsole]");
	console.log(allConsoleElements);
	
	mainstyle = document.createElement("style");
	mainstyle.innerText += ".consoleMessage{verticalalign:bottom; padding:0px; margin:0px;}\n";
	document.head.appendChild(mainstyle);
	//document.style.insertRule("p.consoleMessage{verticalalign:bottom;}");
	
	for(var i = 0; i < allConsoleElements.length; i++){
		var e = allConsoleElements[i];
		var s = e.getAttribute('console-Script');
		var fc = e.getAttribute('console-Forecolor');
		var bc = e.getAttribute('console-Backcolor');
		var fs = e.getAttribute('console-FontSize');
		var f = e.getAttribute('console-Font');
		var l = e.getAttribute('console-Limit');
		
		var ns = eval(s);
		
		ns.init = ns.init || function(){ return 0; };
		var con = new Console(e, s, fc, bc, fs, f, l);
		switch (ns.init()){
			case 0: //Ready
				ns.main(con);
				break;
			case 1: //Abort
				con.WriteLine("Init aborted: Error 0x1");
				break;
			case 2: //Retry
				con.WriteLine("Init retry: Error 0x2");
				i--;
				break;
			default:
				con.WriteLine("Init failed to respond: Error 0x-1");
				console.log("Init must return a value to indicate its status, please refer to https://danhab99.github.io/ConsoleJS/ for more information");
				break;
		}
	}
};

function Console(element, name, forecolor, backcolor, fontsize, font, limit){
	forecolor = forecolor || "#ffffff";
	backcolor = backcolor || "#000000";
	fontsize = fontsize || 12;
	font = font || "Verdana";
	limit = limit || -1;
	
	element.style.backgroundColor = backcolor;
	element.style.overflow = "scroll";
	
	mainstyle.innerText += "p." + name + "{color:" + forecolor + "; fontsize:" + fontsize + "; font-family:" + font + ";}\n";
	mainstyle.innerText += "textarea." + name + "{color:" + forecolor + "; fontsize:" + fontsize + "; font-family:" + font + "; background-color:" + backcolor + "; resize: none; width:100%;}\n";
	
	var scope = this;
	var count = 0;
	
	this.WriteLine = function(message){
		var p = document.createElement("p");
		p.classList.add("consoleMessage");
		p.classList.add(name);
		p.setAttribute('index', count++);
		p.innerText = message;
		element.appendChild(p);
		element.scrollTop = element.scrollHeight;
		
		var selector = '[console-script="' + element.getAttribute('console-script') + '"] > p[index]';
		var cull = document.querySelectorAll(selector);
		for (var i = 0; i < cull.length; i++) {
			var index = cull[i].getAttribute('index');
			var cutoff = count - limit;
			
			if (cutoff < limit ? false : index < cutoff && limit > 0) {
				cull[i].remove();
			}
		}
	};
	this.ReadLine = function(callback){
		var p = document.createElement("textarea");
		p.rows = 1;
		p.width='100%';
		p.classList.add(name);
		p.classList.add("consoleMessage");
		var val;
		p.onkeydown =  function(e){
			//alert("Keypress " + e);
			if (!e) e = window.event;
			var keyCode = e.keyCode || e.which;
			if (keyCode == '13'){
			  // Enter pressed
			  val = p.value;
			  p.remove();
			  scope.WriteLine(val);
			  callback(val);
			  return false;
			}
		};
		element.appendChild(p);
	};
	this.Beep = function(){beep();};
	this.Remove = function(i){
		i = i > 0 ? i : count + i;
		i = i === 0 ? i - 1 : i;
		document.querySelector('[console-script="' + element.getAttribute('console-script') + '"] > p[index="' + i + '"]').remove();
	};
	this.Ask = function(question, callback){
		this.WriteLine(question);
		this.ReadLine(callback);
	}
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

function beep() {
  (new
	Audio(
	"data:audio/wav;base64,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"
	)).play();
}
