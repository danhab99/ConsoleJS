var console2 = {
	main: function(C){
		var i = 0;
		setInterval(function() {
			if (isPrime(i))
			{
				C.WriteLine(i);
				C.Beep();
			}
			i++
		},1);
	}
};

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}
