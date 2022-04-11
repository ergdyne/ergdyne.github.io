import randomFromList from "../functions/randomFromList"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getNames(amount: number): string[]{
  const names: Set<string> = new Set()

  while(names.size < amount){
    const last = randomFromList(NAMES)
    const first = LETTERS.charAt(Math.floor(Math.random() * LETTERS.length))
    names.add(`${first}. ${last}`)
  }

  return Array.from(names)
}

const NAMES = [
	'SMITH',
	'JOHNSON',
	'WILLIAMS',
	'JONES',
	'BROWN',
	'DAVIS',
	'MILLER',
	'WILSON',
	'MOORE',
	'TAYLOR',
	'ANDERSON',
	'THOMAS',
	'JACKSON',
	'WHITE',
	'HARRIS',
	'MARTIN',
	'THOMPSON',
	'GARCIA',
	'MARTINEZ',
	'ROBINSON',
	'CLARK',
	'RODRIGUEZ',
	'LEWIS',
	'LEE',
	'WALKER',
	'HALL',
	'ALLEN',
	'YOUNG',
	'HERNANDEZ',
	'KING',
	'WRIGHT',
	'LOPEZ',
	'HILL',
	'SCOTT',
	'GREEN',
	'ADAMS',
	'BAKER',
	'GONZALEZ',
	'NELSON',
	'CARTER',
	'MITCHELL',
	'PEREZ',
	'ROBERTS',
	'TURNER',
	'PHILLIPS',
	'CAMPBELL',
	'PARKER',
	'EVANS',
	'EDWARDS',
	'COLLINS',
	'STEWART',
	'SANCHEZ',
	'MORRIS',
	'ROGERS',
	'REED',
	'COOK',
	'MORGAN',
	'BELL',
	'MURPHY',
	'BAILEY',
	'RIVERA',
	'COOPER',
	'RICHAR',
]
export default getNames
