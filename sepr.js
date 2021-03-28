function seprMain(args){
	try{
		var t = seprMqin(args);
		if(t) return t;
	}catch(e){}
	return 'Failed';
}

function seprMqin(args){
	var rot = null;

	for(var i=-100; i < 101; ++i){
		var t = 0;
		for(var j=args.length-1, k=0; j>=0; --j,++k) t += args[j] * Math.pow(i, k);
		if(t == 0){
			rot = i;
			console.log('One root found: '+rot);
			break;
		}
	}
	if(rot == null){
		console.log('Error: Root not found between [-100,100].');
		process.exit(1);
	}

	var tester = [1, -rot];
	var aargs = [];
	var shadowargs = args.slice(0);

	function ins(args){
		var arg2 = args[0]*tester[1]/tester[0];
		var scale = args[0] / tester[0];
		if(args[0] % tester[0] != 0) console.log('Warning: non-integer detected: ' + scale);
		return [scale, args[1]-arg2];
	}

	for(var i=0, n=args.length-1; i<n; ++i){
		var res = ins(shadowargs);
		aargs.push(res[0]);
		if(res[1] == 0 && i != n-1) { console.log('Error: imcompleted algorithm.'); return; }
		shadowargs.shift();
		shadowargs[0] = res[1];
	}

	var ans = '';
	for(var i in aargs){
		var U = aargs.length - i -1;
		ans += (i==0?'':(aargs[i]>0?' +':' ')) 
			+ (aargs[i]==1?'':aargs[i])
			+ (U==0?'':'x' + (U==1?'':'^'+U));
	}

	return (
		'(x' + (rot<0?'+':'') + (tester[1]) + ')' +
		'( ' + ans + ' )'
	);
}
try{
	if(!global.window) console.log(seprMain([1, 0, -2, 4]));
}catch(e){}
