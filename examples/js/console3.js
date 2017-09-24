var console3 = {
	main: function(C){
		C.WriteLine("Type a number to print random lines");
		C.ReadLine(function(e){
			var l = parseInt(e);
			for (var i = 0; i < l; i++) {
				C.WriteLine(getRandomArbitrary(1000,9999));
			}
			
			C.WriteLine("Chose which lines to delete");
			C.ReadLine(function(e){
				C.Remove(parseInt(e));
			});
		});
	}
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}