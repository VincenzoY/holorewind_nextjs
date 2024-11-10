export const fontRobotoRegular = fetch(
  new URL('./fonts/Roboto-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const fontRobotoBold = fetch(
  new URL('./fonts/Roboto-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());