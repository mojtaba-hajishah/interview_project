const searchParams = new URLSearchParams(window.location.search);

export const getSearchParamItem = (key) => {
  try {
    return searchParams.get(key) || ''
  } catch (error) {
    return ''
  }
}