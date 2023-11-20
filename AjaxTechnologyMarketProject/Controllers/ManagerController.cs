using AjaxTechnologyMarketProject.Data;
using AjaxTechnologyMarketProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxTechnologyMarketProject.Data.Controllers
{
    public class ManagerController : Controller
    {

        public readonly ApplicationDbContext context;
        public ManagerController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }


        public JsonResult ManagerList()
        {
            var result = context.Managers.ToList();
            return new JsonResult(result);



        }

        [HttpPost]
        public JsonResult AddManager(Manager manager)
        {
            var mana = new Manager()
            {
                Name = manager.Name,
                Phone = manager.Phone,
                Address = manager.Address,
                Expertise = manager.Expertise


            };
            context.Managers.Add(mana);
            context.SaveChanges();
            return new JsonResult("Kayıt işlemi başarılı");


        }


        public JsonResult Edit(int id)
        {
            var result = context.Managers.Where(i => i.Id == id).SingleOrDefault();
            return new JsonResult(result);




        }

        [HttpPost]
        public JsonResult Update(Manager manager)
        {

            context.Managers.Update(manager);
            context.SaveChanges();
            return new JsonResult("Güncelleme başarılı");



        }

        public JsonResult Delete(int id)
        {
            var result = context.Managers.Where(i => i.Id == id).SingleOrDefault();
            context.Managers.Remove(result);
            context.SaveChanges();
            return new JsonResult("Silme Başarılı");




        }


    }
}
