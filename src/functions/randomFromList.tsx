export default function randomFromList<Type>(list: Type[]): Type {
  return list[Math.floor(Math.random() * list.length)]
}