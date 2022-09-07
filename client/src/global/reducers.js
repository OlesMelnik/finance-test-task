export const deleteGroupReducer = (global, dispatch, action) => ({
  groups: global.groups.filter((item) => item.name !== action.name),
});

export const removeTickerReducer = (global, dispatch, action) => ({
  groups: global.groups.map((item) =>
    item.name === action.name
      ? {
          ...item,
          tickers: item.tickers.filter((i) => i.name !== action.ticker),
        }
      : item
  ),
});
