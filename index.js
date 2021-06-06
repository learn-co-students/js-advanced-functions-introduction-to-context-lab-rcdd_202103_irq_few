// Your code here
const createEmployeeRecord = (employeeList) =>{
  const newEmployee = {
    firstName: employeeList[0],
    familyName: employeeList[1],
    title: employeeList[2],
    payPerHour: employeeList[3],
    timeInEvents: [],
    timeOutEvents: [],
  }

  return newEmployee;
}

const createEmployeeRecords = (recordList) =>{
  let newEmployeeList = [];
  recordList.forEach(record=>{
    newEmployeeList.push(createEmployeeRecord(record));
  });
  return newEmployeeList;
}

const createTimeInEvent = (employeeRecord, date) =>{
  date = date.split(" ");
  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(date[1]),
    date: date[0],
  }
  employeeRecord.timeInEvents.push(newTimeIn);
  return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, date)=>{
  date = date.split(" ");
  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(date[1]),
    date: date[0],
  }
  employeeRecord.timeOutEvents.push(newTimeOut);
  return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, date) =>{
  const foundTimeOut = employeeRecord.timeOutEvents.find(timeOut => timeOut.date == date);
  const foundTimeIn = employeeRecord.timeInEvents.find(timeOut => timeOut.date == date);
  const workedHours = (foundTimeOut.hour - foundTimeIn.hour)/100;
  return workedHours;
}

const wagesEarnedOnDate = (employeeRecord, date) =>{
  return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour;
}

const allWagesFor = (employeeRecord) => {
  let sumOfWages = 0;
  employeeRecord.timeInEvents.forEach(event=>{
    sumOfWages += wagesEarnedOnDate(employeeRecord, event.date);
  });
  return sumOfWages;
}

const findEmployeeByFirstName =(srcArray, firstName) =>{
  return srcArray.find(employeeRecord => {
    if(employeeRecord.firstName == firstName) return true;
  })
}

const calculatePayroll = (array) =>{
  let sumOfPay = 0;
  array.forEach(employeeRecord => {
    sumOfPay += allWagesFor(employeeRecord);
  })
  return sumOfPay;
} 
