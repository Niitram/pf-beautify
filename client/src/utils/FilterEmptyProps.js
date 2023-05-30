export default function filterEmpty(arg) {
  let newObj = {};
  for (const key in arg) {
    if (arg.hasOwnProperty(key) && arg[key] !== "") {
      key !== "name"
        ? (newObj[key] = Number(arg[key]))
        : (newObj[key] = arg[key]);
    }
  }
  return { ...newObj, state: true };
}
