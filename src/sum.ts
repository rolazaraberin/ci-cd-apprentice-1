export default function sum(x: number, y: number) {
  if (typeof x !== "number" || typeof y !== "number")
    throw new Error("ERROR: Numbers only");
  return x + y;
}
