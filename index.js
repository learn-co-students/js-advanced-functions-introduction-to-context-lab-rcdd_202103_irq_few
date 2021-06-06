// Your code here

const createEmployeeRecord = employeeRecord =>{
  return  {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = employeeRecord =>{
  let newEmlployeeRecord = [];
  employeeRecord.forEach( record => {
    newEmlployeeRecord.push(createEmployeeRecord(record));
  });
  return newEmlployeeRecord;
};

const createTimeInEvent = (obj, date) =>{
  date = date.split(" ");
  let newTimeInEvent = {
    type: "TimeIn",
    hour: parseInt(date[1]),
    date: date[0],
  };
  obj.timeInEvents.push(newTimeInEvent);
  return obj;
};

const createTimeOutEvent = (obj, date) =>{
  date = date.split(" ");
  let newTimeOutEvent = {
    type: "TimeOut",
    hour: parseInt(date[1]),
    date: date[0],
  };
  obj.timeOutEvents.push(newTimeOutEvent);
  return obj;
};

const hoursWorkedOnDate = (obj, date) =>{
  const timeOutWork = obj.timeOutEvents.find(timeOut => timeOut.date == date);
  const timeInWork = obj.timeInEvents.find(timeOut => timeOut.date == date);
  const hoursWorked = (timeOutWork.hour - timeInWork.hour)/100;
  return hoursWorked;
};

const wagesEarnedOnDate = (obj, date) =>{
  return hoursWorkedOnDate(obj, date)*obj.payPerHour;
};

const allWagesFor = employee  => {
  let wagesEarned = 0;
  employee .timeInEvents.forEach(wage =>{
    wagesEarned += wagesEarnedOnDate(employee , wage.date);
  });
  return wagesEarned;
};

const findEmployeeByFirstName = (srcArray, firstName) =>{
  return srcArray.find(employee=> {
    if(employee.firstName == firstName) return true;
  });
};

const calculatePayroll = array =>{
  let sum = 0;
  array.forEach(employee => {
    sum += allWagesFor(employee);
  });
  return sum;
};