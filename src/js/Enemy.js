var media = 0

for (var c = 0; c < 10000; c++) {

	var start = new Date().getTime()

		teste = false
		for (var c = 0; c < 10000; c++) {
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
			if (teste) teste = true
		}

	var end = new Date().getTime();

	media += end - start
}

console.log("Media de tempo: ", media/10000)