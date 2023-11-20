using AjaxTechnologyMarketProject.Data;
using AjaxTechnologyMarketProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxTechnologyMarketProject.Data.Controllers
{
    public class CompanyController : Controller
    {
        public readonly ApplicationDbContext context;
        public CompanyController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }


        public JsonResult CompanyList()
        {
            var result = context.Companies.ToList();
            return new JsonResult(result);


        }

        [HttpPost]
        public JsonResult AddCompany(Company company)
        {
            var com = new Company()
            {
                CompanyName = company.CompanyName,
                Address = company.Address,
                Phone = company.Phone,
                Center = company.Center


            };
            context.Companies.Add(com);
            context.SaveChanges();
            return new JsonResult("Kayıt başarılı");


        }


        public JsonResult Edit(int id)
        {
            var result = context.Companies.Where(i => i.Id == id).SingleOrDefault();
            return new JsonResult(result);

        }

        [HttpPost]
        public JsonResult Update(Company company)
        {

            context.Companies.Update(company);
            context.SaveChanges();
            return new JsonResult("Güncelleme Başarılı");


        }

        public JsonResult Delete(int id)
        {
            var result = context.Companies.Where(i => i.Id == id).SingleOrDefault();
            context.Companies.Remove(result);
            context.SaveChanges();
            return new JsonResult("Silme Başarılı");


        }



    }
}
