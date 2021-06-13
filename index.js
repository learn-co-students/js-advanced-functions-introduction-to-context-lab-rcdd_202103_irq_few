const createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map((row) => createEmployeeRecord(row))
}

const createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const hoursWorkedOnDate = (employee, soughtDate) => {
    let inEvent = employee.timeInEvents.find((e) => e.date === soughtDate)

    let outEvent = employee.timeOutEvents.find((e) => e.date === soughtDate)

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, dateSought) => {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map((e) => e.date)

    let payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d), 0)

    return payable
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find((rec) => rec.firstName === firstName)
}

const calculatePayroll = (arrayOfEmployeeRecords) => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0)
}