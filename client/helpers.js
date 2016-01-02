module.exports = {
	spacedToCamelCased(x){
		return x.split(" ")
			.map(y => y.toLowerCase())
			.reduce(
				(prev, cur, index) =>
					index === 0
						? prev + cur
						: prev + this.capitalise(cur),
				"");
	},
	capitalise(x, i=0){
		return x.split("")
			.map(y => y.toLowerCase())
			.reduce(
				(prev, cur, index) => 
					i === index
						? prev + cur.toUpperCase()
						: prev + cur,
				"");
	}
};