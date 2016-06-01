/*@cc_on @*/
maths.log1p = function (x) {
  if (x < -1.0) {
    return 0 / 0;
  }
  if (x === -1.0) {
    return -1 / 0;
  }
  if (x === Infinity) {
    return x;
  }
  if (x < 1.1e-16 && x > -1.1e-16) {
    return x;
  }
  if (x >= -0.16 && x < 0.18) {
    var s = x / (2 + x);
    var s2 = s * s;
    return 2 * s * (1 + s2 * (1 / 3 + s2 * (1 / 5 + s2 * (1 / 7 + s2 * (1 / 9 + s2 * (1 / 11 + s2 * (1 / 13 + s2 / 15))))))); // polynomial approximation
  }
  if (x < -0.16) {
    return -maths.log1p(1 / (x + 1) - 1);
  }

  if (x < 0.62) {
    var ln = 0.3184537311185346158102472135906;
    return ln + maths.log1p((x + 1) / 1.375 - 1);
  }
  if (x < 2.04) {
    var ln = 0.63252255874351046683662598941776;
    return ln + maths.log1p(0.53125 * (x + 1) - 1);
  }
  if (x < 7.25) {
    var ln = 1.2685113254635071642956701334458;
    return ln + maths.log1p(0.28125 * (x + 1) - 1);
  }
  if (x <= 81) {
    var ln = 2.2845300760555184018438227088819;
    return ln + maths.log1p(0.1018218994140625 * (x + 1) - 1);
  }
  if (x <= 8e3) {
    var ln = 4.5810270407335015309112229234984;
    return ln + maths.log1p(0.0102443695068359375 * (x + 1) - 1);
  }
  if (x <= 7.6e7) {
    var ln = 9.1615403759270122994262939216551;
    return ln + maths.log1p(0.000105001032352447509765625 * (x + 1) - 1);
  }
  if (x <= 6.8e15) {
    var ln = 18.31632072862812270441657363889;
    return ln + maths.log1p(1.11e-8 * (x + 1) - 1);
  }
  if (x <= 5.45e31) {
    var ln = 36.62625010828778544756021761686;
    return ln + maths.log1p(1.24e-16 * (x + 1) - 1);
  }
  if (x <= 3.5e63) {
    var ln = 73.2444680448783066360817858015;
    return ln + maths.log1p(1.55e-32 * x - 1); // approximate value
  }
  if (x <= 1.45e127) {
    var ln = 146.48956063437980760878401649008;
    return ln + maths.log1p(2.401e-64 * x - 1); // approximate value
  }
  if (x <= 2.5e254) {
    var ln = 292.97303398568547390172039350046;
    return ln + maths.log1p(5.8e-128 * x - 1); // approximate value
  }
  if (x <= 1 / 0 /* overflow */ ) {
    var ln = 585.94428596911737906811893729923;
    return ln + maths.log1p(3.37e-255 * x - 1); // approximate value
  }

  return 0 / 0;
}

maths.expm1 = function (x) {
  var ln2_hi = 6.93147180369123816490e-01,
      ln2_lo = 1.90821492927058770002e-10;
  var ln2 = ln2_hi + ln2_lo;
  var half_ln2 = ln2 / 2;

  if (x < 1.1e-16 && x > -1.1e-16) {
    return x;
  }
  if (x <= half_ln2 && x >= -half_ln2) {
    return x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x*(1+x/13)/12)/11)/10)/9)/8)/7)/6)/5)/4)/3)/2);
  }
  if (x === -1 / 0) { return -1; }
  if (x === 1 / 0) { return x; }
  if (x > half_ln2) {
    var quotient = Math.round(x / ln2);
    var remainder = x - quotient * ln2_hi - quotient * ln2_lo;
    var mantissa = maths.expm1(remainder);

    return Math.pow(2, quotient) * mantissa + (Math.pow(2, quotient) - 1);
  }
  if (x < -half_ln2) {
    return 1 / (1 + maths.expm1(-x)) - 1;
  }
  return 0 / 0;
}

maths["phiInv2"] = 2 / (Math.sqrt(5) + 3);
maths["phi2"] = (Math.sqrt(5) + 3) / 2;
maths.cbrt2 = 1.2599210498948732165
maths.sqcbrt2 = 1.587401051968199475;
maths.cbrt2m1 = 0.259921049894873165;
maths.sqcbrt2m1 = 0.587401051968199475;
maths.sqrt2m1 = 0.4142135623730950488;
maths.sqrt10 = 3.162277660168379332;
maths.cbrt10 = 2.15443469003188372175;
maths.sqcbrt10 = 4.64158883361277889241;
maths.negate = function(x) {return -x;}
maths.sq = function(x) {return x*x;}
maths.log2f = function(x) {
  x = x < 0 ? -x : +x;
  var i = 0;
  if (x === 0) {return -1 / 0;}
  if (1 / x === 0) {return 1 / 0;}
  if (isNaN(x)) {return NaN;}
  for (; x >= 2;) {++i; x *= .5;}
  for (; x < 1;) {--i; x *= 2;}
  return i;
}

/* from Hacker's Delight */
maths.int32parity = function (n) {
	n^=n>>1;
	n^=n>>2;
	n^=n>>4;
	n^=n>>8;
	n^=n>>16;
	return n & 1;
}
maths.int32clz = function (n) {
	var x = 0; /* unused */
	var table = [32,31,x,16,x,30,3,x,15,x,x,x,29,10,2,x,x,x,12,14,21,x,19,x,x,28,x,25,x,9,1,x,17,x,4,x,x,x,11,x,13,22,20,x,26,x,x,18,5,x,x,23,x,27,x,6,x,24,7,x,8,x,0,x];
	n|=n>>1;n|=n>>2;n|=n>>4;n|=n>>8;n|=n>>16;var h=(n>>>16)&0xffff,l=n&0xffff;
	return table[((0x14f9*l)+(((0x6eb*l+0x14f9*h)<<16)>>>0)>>>26)];
}
maths.int32ctz = function (n) {
	var x = 0; /* unused */
	var table = [32,0,1,12,2,6,x,13,3,x,7,x,x,x,x,14,10,4,x,x,8,x,x,25,x,x,x,x,x,21,27,15,31,11,5,x,x,x,x,x,9,x,x,24,x,x,20,26,30,x,x,x,x,23,x,19,29,x,22,18,28,17,16,x];
	n=n&-n;var h=(n>>>16)&0xffff,l=n&0xffff;
	return table[((0xfbaf*l)+(((0x450*l+0xfbaf*h)<<16)>>>0)>>>26)];
}
maths.int32cl1 = function (n) {
	return maths.int32clz(~n);
}
maths.int32ct1 = function (n) {
	return maths.int32ctz(~n);
}
maths.lowest1 = function (n) {
	return n&-n;
}
maths.highest1 = function (n) {
	n|=n>>1;n|=n>>2;n|=n>>4;n|=n>>8;n|=n>>16; return n - (n >>> 1);
}
maths.int32count1 = function (n) {
	n=n-((n>>1)&0x55555555);
	n=(n&0x33333333)+((n>>2)&0x33333333);
	n=(n+(n>>4))&0xf0f0f0f;
	n=n+(n>>8);
	return (n+(n>>16))&63
}
maths.int32revbit = function (x) {
   x = (x & 0x55555555) <<  1 | (x >>  1) & 0x55555555;
   x = (x & 0x33333333) <<  2 | (x >>  2) & 0x33333333;
   x = (x & 0x0F0F0F0F) <<  4 | (x >>  4) & 0x0F0F0F0F;
   x = (x << 24) | ((x & 0xFF00) << 8) | ((x >> 8) & 0xFF00) | (x >>> 24);
   return x;
}
maths.int32avg_2 = function (a, b) {
	return (a&b)+(a^b)>>1
}

if (maths.int64) {
maths.int64parity = function (n) {
	buffer.int64 = n;
	var trail = buffer.int32a[0];
	var lead = buffer.int32a[1];
	return maths.int32parity(lead) ^ maths.int32parity(trail);
}
maths.int64clz = function (n) {
	buffer.int64 = n;
	var trail = buffer.int32a[0];
	var lead = buffer.int32a[1];
	return lead ? maths.int32clz(lead) : 32+maths.int32clz(trail);
}
maths.int64ctz = function (n) {
	buffer.int64 = n;
	var trail = buffer.int32a[0];
	var lead = buffer.int32a[1];
	return trail ? maths.int32ctz(trail) : 32+maths.int32ctz(lead);
}
maths.int64cl1 = function (n) {
	buffer.int64 = n;
	var trail = ~buffer.int32a[0];
	var lead = ~buffer.int32a[1];
	return lead ? maths.int32clz(lead) : 32+maths.int32clz(trail);
}
maths.int64ct1 = function (n) {
	buffer.int64 = n;
	var trail = ~buffer.int32a[0];
	var lead = ~buffer.int32a[1];
	return trail ? maths.int32ctz(trail) : 32+maths.int32ctz(lead);
}
maths.int64count1 = function (n) {
	buffer.int64 = n;
	var trail = buffer.int32a[0];
	var lead = buffer.int32a[1];
	return maths.int32count1(lead) + maths.int32count1(trail);
}
maths.int64revbit = function (n) {
	buffer.int64 = n;
	var trail = maths.int32revbit(buffer.int32a[1]);
	var lead = maths.int32revbit(buffer.int32a[0]);
	buffer.int32a[0] = trail;
	buffer.int32a[1] = lead;
	return buffer.int64;
}

maths.int64_add = function (a, b) {
	buffer.int64 = a;
	var a2 = buffer.uint32a[0];
	var a1 = buffer.int32a[1];
	buffer.int64 = b;
	a2 += buffer.uint32a[0];
	a1 += buffer.int32a[1];
	a2 >= 0x100000000 && ++a1;
	buffer.int32a[0] = a2;
	buffer.int32a[1] = a1;
	return buffer.int64;
}
maths.int64_sub = function (a, b) {
	buffer.int64 = a;
	var a2 = buffer.uint32a[0];
	var a1 = buffer.int32a[1];
	buffer.int64 = b;
	a2 -= buffer.uint32a[0];
	a1 -= buffer.int32a[1];
	a2 < 0 && --a1;
	buffer.int32a[0] = a2;
	buffer.int32a[1] = a1;
	return buffer.int64;
}
maths.int64_mul = function (a, b) {
	buffer.int64 = a;
	var a4 = buffer.uint16a[0];
	var a3 = buffer.uint16a[1];
	var a2 = buffer.uint16a[2];
	var a1 = buffer.int16a[3];
	buffer.int64 = b;
	var b4 = buffer.uint16a[0];
	var b3 = buffer.uint16a[1];
	var b2 = buffer.uint16a[2];
	var b1 = buffer.int16a[3];
	
	var c4 = a4*b4;
	var c3 = a3*b4+a4*b3;
	var c2 = a2*b4+a3*b3+a4*b2;
	var c1 = a1*b4+a2*b3+a3*b2+a4*b1;
	
	c3 += (c4 - c4 % 65536) / 65536
	buffer.int16a[0] = c4;
	c2 += (c3 - c3 % 65536) / 65536
	buffer.int16a[1] = c3;
	c1 += (c2 - c2 % 65536) / 65536
	buffer.int16a[2] = c2;
	buffer.int16a[3] = c1;
	
	return buffer.int64;
}
maths.int64_sqr = function (a) {
	buffer.int64 = a;
	var a4 = buffer.uint16a[0];
	var a3 = buffer.uint16a[1];
	var a2 = buffer.uint16a[2];
	var a1 = buffer.int16a[3];
	
	var c4 = a4*a4;
	var c3 = 2*a3*a4;
	var c2 = 2*a2*a4+a3*a3;
	var c1 = 2*(a1*a4+a2*a3);
	
	c3 += (c4 - c4 % 65536) / 65536
	buffer.int16a[0] = c4;
	c2 += (c3 - c3 % 65536) / 65536
	buffer.int16a[1] = c3;
	c1 += (c2 - c2 % 65536) / 65536
	buffer.int16a[2] = c2;
	buffer.int16a[3] = c1;
	
	return buffer.int64;
}
var Int64DivMod = function (a, b) {
	if (parseInt(b) === 0) { return; } /* divide by zero "overflow" */
	if (parseInt(b) === 1) { return [maths.int64(a),0]; }
	if (parseInt(b) === -1) { return [maths.int64_sub(0,a),0]; }
	var c1 = a / (b - b % 1);
	c1 = c1 - c1 % 1;
	var d1 = maths.int64_mul(c1, b);
	var div_err = maths.int64_sub(a, d1);
	
	var c2 = div_err / (b - b % 1);
	c2 = c2 - c2 % 1;
	var d2 = maths.int64_mul(c2, b);
	div_err = maths.int64_sub(div_err, d2);
	
	var c3 = maths.int64_add(c1,c2);
	while (+div_err * b > 0) {
		c3 = maths.int64_add(c3,1);
		div_err = maths.int64_sub(div_err, b)
	}
	while (-div_err * b > 0) {
		c3 = maths.int64_sub(c3,1);
		div_err = maths.int64_add(div_err, b)
	}
	return [c3, div_err];
}
maths.int64_div = function(a,b) {
	return Int64DivMod(a,b)[0];
}
maths.int64_mod = function(a,b) {
	return Int64DivMod(a,b)[1];
}
maths["if"] = function (c,x,y) {
	return c?x:y;
}
maths["ifb"] = function (c,x,y) {
	return c&x|~c&y;
}
maths.int32_rol = function (a,b) {
	return a << b | a >>> (32 - b)
}
maths.int32_ror = function (a,b) {
	return a >>> b | a << (32 - b)
}
maths.bitwise_mul = function (a,b) {
	var q = 0;
	for (var i = 0; i < 31; ++i) {
		q ^= a << i & -(b & 1 << i);
	}
	return q;
}
var Bitwise_DivMod = function (a,b) {
	var q, r = a, t,
    ah = 31 - maths.int32clz(a),
    bh = 31 - maths.int32clz(b),
    al = ah - bh;
    while (al >= 0) {
        t = -!!(r & (1 << ah));
        t && (r ^= b << al, q |= 1 << al);
        --al; --ah;
    }
    return [q,r];
}
maths.bitwise_div = function (a,b) {
	return Bitwise_DivMod(a,b)[0];
}
maths.bitwise_mod = function (a,b) {
	return Bitwise_DivMod(a,b)[1];
}
maths.int64_shl = function (a,b) {
	buffer.int64 = a;
	var trail = buffer.uint32a[0];
	var lead = buffer.int32a[1];
	if (b < 32) {
		buffer.uint32a[0] = trail << b;
		buffer.int32a[1] = lead << b | !!b * trail >>> (32 - b);
	} else if (b < 64) {
		buffer.uint32a[0] = 0;
		buffer.int32a[1] = trail << (b - 32);
	} else {
		buffer.uint32a[0] = 0;
		buffer.int32a[1] = 0;
	}
	return buffer.int64;
}
maths.int64_sal = function (a,b) {
	return maths.int64_shl(a,b);
}
maths.int64_shr = function (a,b) {
	buffer.int64 = a;
	var trail = buffer.uint32a[0];
	var lead = buffer.int32a[1];
	if (b < 32) {
		buffer.uint32a[0] = trail >>> b | !!b * lead << (32 - b);
		buffer.int32a[1] = lead >>> b;
	} else if (b < 64) {
		buffer.uint32a[0] = lead >>> (b - 32);
		buffer.int32a[1] = 0;
	} else {
		buffer.uint32a[0] = 0;
		buffer.int32a[1] = 0;
	}
	return buffer.int64;
}
maths.int64_sar = function (a,b) {
	buffer.int64 = a;
	var trail = buffer.uint32a[0];
	var lead = buffer.int32a[1];
	if (b < 32) {
		buffer.uint32a[0] = trail >>> b | !!b * lead << (32 - b);
		buffer.int32a[1] = lead >> b;
	} else if (b < 64) {
		buffer.uint32a[0] = lead >> (b - 32);
		buffer.int32a[1] = lead < 0 ? -1 : 0;
	} else {
		buffer.uint32a[0] = lead < 0 ? -1 : 0;
		buffer.int32a[1] = lead < 0 ? -1 : 0;
	}
	return buffer.int64;
}
maths.int64_rol = function (a,b) {
	buffer.int64 = a;
	var trail = buffer.uint32a[0];
	var lead = buffer.int32a[1];
	b = b & 63;
	if (b & 32) {
		var temp = trail;
		trail = lead;
		lead = temp;
		b = b & 31;
	}
	buffer.int32a[0] = trail << b | !!b * lead >>> (32 - b);
	buffer.int32a[1] = lead << b | !!b * trail >>> (32 - b);
	return buffer.int64;
}
maths.int64_ror = function (a,b) {
	buffer.int64 = a;
	var trail = buffer.uint32a[0];
	var lead = buffer.int32a[1];
	b = b & 63;
	if (b & 32) {
		var temp = trail;
		trail = lead;
		lead = temp;
		b = b & 31;
	}
	buffer.int32a[0] = trail >>> b | !!b * lead << (32 - b);
	buffer.int32a[1] = lead >>> b | !!b * trail << (32 - b);
	return buffer.int64;
}
maths.int64_and = function (a, b) {
	buffer.int64 = a;
	var a2 = buffer.uint32a[0];
	var a1 = buffer.int32a[1];
	buffer.int64 = b;
	a2 &= buffer.uint32a[0];
	a1 &= buffer.int32a[1];
	buffer.int32a[0] = a2;
	buffer.int32a[1] = a1;
	return buffer.int64;
}
maths.int64_or = function (a, b) {
	buffer.int64 = a;
	var a2 = buffer.uint32a[0];
	var a1 = buffer.int32a[1];
	buffer.int64 = b;
	a2 |= buffer.uint32a[0];
	a1 |= buffer.int32a[1];
	buffer.int32a[0] = a2;
	buffer.int32a[1] = a1;
	return buffer.int64;
}
maths.int64_xor = function (a, b) {
	buffer.int64 = a;
	var a2 = buffer.uint32a[0];
	var a1 = buffer.int32a[1];
	buffer.int64 = b;
	a2 ^= buffer.uint32a[0];
	a1 ^= buffer.int32a[1];
	buffer.int32a[0] = a2;
	buffer.int32a[1] = a1;
	return buffer.int64;
}
maths.int64_not = function (a, b) {
	buffer.int64 = a;
	buffer.uint32a[0] = ~buffer.uint32a[0];
	buffer.int32a[1] = ~buffer.int32a[1];
	return buffer.int64;
}
}
var remainLines, multiLineOutput, __VariableName;
maths.multilines = function (_var, n) {
	multiLineOutput = "";
	if (n === 0) {maths[_var] = ""; return ""}
	if (n < 0 || (typeof n !== "number")) {throw "Error"}
	__VariableName = _var;
	remainLines = n;
	extendedFlag = "__MultiLine__";
	
}
plugin.__MultiLine__ = function (str) {
	if (remainLines !== 0) {
		multiLineOutput += str + "\n";
	}
	/*alert*/(--remainLines);
	if (remainLines === 0) {
		extendedFlag = false;
		maths[__VariableName] = multiLineOutput;
		multiLineOutput = "";
		return "";
	}
}
var String2HTML = function (str) {
	str = str.split(''); var newStr = "";
	for (var i = 0, j = str.length; i < j; ++i) {
		switch (str[i]) {
			case "&": newStr += "&amp;"; break;
			case "<": newStr += "&lt;"; break;
			case ">": newStr += "&gt;"; break;
			case "\xa0": newStr += "&nbsp;"; break;
			default: newStr += str[i];
		}
	}
	return newStr;
}
maths.printAsText = function (str) {
	var a = arguments;
	if (a.length === 1) {
	   outstr += String2HTML(str) + "\n"
	} else {
	   for (var i = 0, j = a.length; i < j; ++i) {
	      outstr += String2HTML(a[i]);
	   }
	   outstr += "\n";
	}
}
maths.multilines_template = function (_var, n) {
	multiLineOutput = "";
	if (n === 0) {maths[_var] = ""; return ""}
	if (n < 0 || (typeof n !== "number")) {throw "Error"}
	__VariableName = _var;
	remainLines = n;
	extendedFlag = "__MultiLine_Template__";
	
}