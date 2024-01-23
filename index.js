// Your code here
// Function to create an employee record
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(dataArray) {
    return dataArray.map(createEmployeeRecord);
  }
  
  // Function to create a timeIn event
  function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  // Function to create a timeOut event
  function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
  
    return 0;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map((event) => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  // Function to calculate payroll for an array of employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  