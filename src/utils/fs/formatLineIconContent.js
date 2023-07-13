export function formatLineIconContent(data) {
  let mdStr = ''
  data.forEach((item, index) => {
    mdStr += `${index + 1}. ${item.code}\n ${item.backgroundUrl}\n`
  })
  return mdStr
}
