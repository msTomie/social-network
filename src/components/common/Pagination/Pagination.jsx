import React, { useState } from "react";
import s from "./Pagination.module.css";

let Pagination = ({
	totalItemsCount,
	pageSize,
	currentPage,
	onPageChange,
	portionSize = 10,
}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize);

	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPotionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let reghtPortionPageNumber = portionNumber * portionSize;

	return (
		<div className={s.paginator}>
			{portionNumber > 1 && (
				<button
					className={s.shineButton}
					onClick={() => {
						setPotionNumber(portionNumber - 1);
					}}
				>
					Prev
				</button>
			)}

			{pages
				.filter(
					(p) => p >= leftPortionPageNumber && p <= reghtPortionPageNumber
				)
				.map((p) => {
					return (
						<span
							key={p}
							className={currentPage === p && s.selectedPage}
							onClick={(event) => {
								onPageChange(p);
							}}
						>
							{p}
						</span>
					);
				})}

			{portionCount > portionNumber && (
				<button
					className={s.shineButton}
					onClick={() => {
						setPotionNumber(portionNumber + 1);
					}}
				>
					Next
				</button>
			)}
		</div>
	);
};
export default Pagination;
