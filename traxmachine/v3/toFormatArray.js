function DumpObjectIndented(obj, indent) {
	var result = "";
	if (!indent)
		var indentText = "";
	else {
		var max = indent;
		var indentText = "";
		for (var i = 0; i < max; i++)
			indentText += ".";
	}

	var firstStep = true;
	for (var property in obj) {
		var value = obj[property];
		if (typeof value == 'string' || value == 0)
			value = "'" + value + "'";
		else if (typeof value == 'object') {
			if (value instanceof Array) {
				// Just let JS convert the Array to a string!
				value = "[<br> " + indentText + DumpObjectIndented(value, indent + 4) + "<br>" + indentText + "]";
			} else {
				// Recursive dump
				// (replace "  " by "\t" or something else if you prefer)
				var od = DumpObjectIndented(value, indent + 4);
				// If you like { on the same line as the key
				//value = "{<br>" + od + "<br>" + indentText + "}";
				// If you prefer { and } to be aligned
				value = "<br>" + indentText + "{<br>" + od + "<br>" + indentText + "}";
			}
		}
		if (!firstStep) result += ",<br>";
		if (!firstStep && indent) result += "....";
		if (firstStep) firstStep = false;
		result += indentText;
		// if (indent) result += "> ";
		result += "'" + property + "' : " + value;
	}
	return result;
}