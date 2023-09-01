const asyncHandler = require('express-async-handler');
const getAllMenuList = asyncHandler(async (req, res) => {
    try {
        const menu = [
            {
                "text": "Dashboard",
                "icon": "space_dashboard",
                "routerLink": "/dashboard"
            },
            {
                "text": "User Profile",
                "icon": "account_circle",
                "routerLink": "/user-profile"
            },
            {
                "text": "Employees",
                "icon": "supervisor_account",
                "children": [
                    {
                        "text": "Create Employee",
                        "icon": "chevron_right",
                        "routerLink": "/employee/create",
                    },
                    {
                    "text": "Employee List",
                    "icon": "chevron_right",
                    "routerLink": "/employee/list",
                    },
                ]
            },
            {
                "text": "Attendance",
                "icon": "fingerprint",
                "children": [{
                    "text": "Employee Attendance",
                    "icon": "chevron_right",
                    "routerLink": "/attendence",
                }]
            },
            {
                "text": "Leave",
                "icon": "calendar_month",
                "children": [
                    {
                        "text": "Leave Apply",
                        "icon": "chevron_right",
                    },
                    {
                    "text": "Leave Balance & Events",
                    "icon": "chevron_right",
                    "routerLink": "/leave",
                    },
                ]
            },
            {
                "text": "Payroll",
                "icon": "credit_card",
                "children": [{
                    "text": "Payslip",
                    "icon": "chevron_right",
                    "routerLink": "/payslip",
                },
                {
                    "text": "Create Payslip",
                    "icon": "chevron_right",
                    "routerLink": "/create-payslip",
                }
            ]
            },
            {
                "text": "Tasks",
                "icon": "assignments",
                "children": [{
                    "text": "Ticket",
                    "icon": "chevron_right",
                    "routerLink": "/ticket",
                }]
            },
            {
                "text": "Change Password",
                "icon": "password",
                "routerLink": "/change-password"
            },
        ];
        const userRole = req.role; 
        console.log("userRole", req.user);
        const filteredMenu = menu.filter(item => {
            console.log("=====", item.permissions);
            if (item.permissions) {
                console.log("66666",item.permissions.includes(userRole));
                return item.permissions.includes(userRole);
            }
            return true;
        });
        
        res.json(filteredMenu);
        console.log(filteredMenu)
      } catch(err) {
          res.status(500)
          throw new Error(err.message)
    }
});

module.exports = { getAllMenuList }