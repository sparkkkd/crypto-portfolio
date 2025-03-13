export interface ILoadToken {
	symbol: string
	priceChangePercent: string
	lastPrice: string
}

export interface IToken {
	symbol: string
	token: string
	quoteAsset: string
	price: number
	priceChangePercent: number
}

export interface IUserToken {
	symbol: string
	name: string
	count: number
	price: number
	totalPrice: number
	priceChangePercent: number
	portfolioPercent: number
}
