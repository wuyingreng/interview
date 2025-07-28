/**------------   before ------------*/

async function getMainData() {
  const res = await activity();
  const styleType = res?.styleType ?? 'normal';
  // 以前用很多的if else
  if (styleType === styleType.Normal) {
  } else if () {

  }
}

/**------------   after ------------*/

openDialog(styleType)
const popType = {
  [styleType.Normall]: function () { },
  [styleType.xxx]: function () { },
  [styleType.Cash]: function () { }
}
function openDialog(type) { return popType[type]() }