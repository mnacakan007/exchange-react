export function toMoney(money = 0, course) {
  if (!money) {
    return 0
  }
  return Math.round(money * course * 100) / 100
}

export function calcCourse(course1, course2) {
  return course1 / course2;
}
