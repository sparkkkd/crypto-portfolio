import { IUserToken } from '../models/tokenTypes'

export const updatePortfolioPercent = (arr: IUserToken[]) => {
	arr.map((item) => {
		item.portfolioPercent =
			arr.length !== 1
				? (item.totalPrice /
						arr.reduce((acc, val) => acc + val.totalPrice, 0)) *
				  100
				: 100
	})
}
