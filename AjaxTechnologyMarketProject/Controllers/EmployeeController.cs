using AjaxTechnologyMarketProject.Data;
using AjaxTechnologyMarketProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxTechnologyMarketProject.Data.Controllers
{
    public class EmployeeController : Controller
    {

        public readonly ApplicationDbContext context;
        public EmployeeController(ApplicationDbContext context)
        {

            this.context = context;

        }


        public IActionResult Index()
        {

            return View();
        }


        public JsonResult EmployeeList()
        {

            var data = context.Employees.ToList();
            return new JsonResult(data);

        }

        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                Age = employee.Age,
                Phone = employee.Phone,
                Email = employee.Email,
                Salary = employee.Salary
            };

            context.Employees.Add(emp);
            context.SaveChanges();
            return new JsonResult("İşlem başarılı");

        }


        public JsonResult Edit(int id)
        {

            var data = context.Employees.Where(a => a.Id == id).SingleOrDefault();
            return new JsonResult(data);



        }

        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            context.Employees.Update(employee);
            context.SaveChanges();
            return new JsonResult("İşlem başarılı");

        }

        public JsonResult Delete(int id)
        {
            var data = context.Employees.Where(i => i.Id == id).SingleOrDefault();
            context.Employees.Remove(data);
            context.SaveChanges();
            return new JsonResult("Silme başarılı");

        }




    }
}
