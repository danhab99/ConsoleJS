var console1 = {
	init: function(){
		console.log("Console 1 init");
	},
	main: function(C){
		var a;
		var b;
		
		C.WriteLine("First:");
		C.ReadLine(function(e){
			a = parseInt(e);
			C.WriteLine("Second:");
			C.ReadLine(function(e){
				b = parseInt(e);
				C.WriteLine("Sum = " + (a + b));
			});
		});
	}
};
