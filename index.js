// Your code here

function createEmployeeRecord(infoArr) {
  let ctr = 0;
  return {
  firstName: infoArr[ctr++],
  familyName: infoArr[ctr++],
  title: infoArr[ctr++],
  payPerHour: infoArr[ctr++],
  timeInEvents: [],
  timeOutEvents: [],
  }
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeEvent(employee, dateStamp, eventType) {
  dateStamp = dateStamp.split(' ')
  const date = dateStamp[0]
  const hour = parseInt(dateStamp[1])
  
  const eventsAccess = eventType === 'TimeIn' ? 'timeInEvents' : 'timeOutEvents';
  employee[eventsAccess].push(
    {
      type: eventType,
      hour: hour,
      date: date,
    })
  
  return employee
}

function createTimeInEvent(employee, dateStamp) {
  return createTimeEvent(employee, dateStamp, 'TimeIn')
}

function createTimeOutEvent(employee, dateStamp) {
  return createTimeEvent(employee, dateStamp, 'TimeOut')
}

function hoursWorkedOnDate(employee, date) {
  return (employee.timeOutEvents.find(event => event.date === date).hour
    - employee.timeInEvents.find(event => event.date === date).hour)/100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  const workDates = employee.timeInEvents.map(event => event.date)
  return workDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

 cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
        // Earns 324
        updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
        updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
        // Earns 54
        updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
        updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
        
        allWagesFor(cRecord)

