// Your code here
function createEmployeeRecord(employeeArray){
  const newEmployee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return newEmployee;
}

function createEmployeeRecords(recordArray){
  let newEmlployeeList = [];
  recordArray.forEach(record=>{
    newEmlployeeList.push(createEmployeeRecord(record));
  });
  return newEmlployeeList;
}

function createTimeInEvent(employeeRecord, date){
  date = date.split(" ");
  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(date[1]),
    date: date[0],
  }
  employeeRecord.timeInEvents.push(newTimeIn);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date){
  date = date.split(" ");
  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(date[1]),
    date: date[0],
  }
  employeeRecord.timeOutEvents.push(newTimeOut);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
  const foundTimeOut = employeeRecord.timeOutEvents.find(timeOut => timeOut.date == date);
  const foundTimeIn = employeeRecord.timeInEvents.find(timeOut => timeOut.date == date);
  const workedHours = (foundTimeOut.hour - foundTimeIn.hour)/100;
  return workedHours;
}

function wagesEarnedOnDate(employeeRecord, date){
  return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord){
  let sumOfWages = 0;
  employeeRecord.timeInEvents.forEach(event=>{
    sumOfWages += wagesEarnedOnDate(employeeRecord, event.date);
  });
  return sumOfWages;
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employeeRecord => {
    if(employeeRecord.firstName == firstName) return true;
  })
}

function calculatePayroll(array){
  let sumOfPay = 0;
  array.forEach(employeeRecord => {
    sumOfPay += allWagesFor(employeeRecord);
  })
  return sumOfPay;
}