using AjaxTechnologyMarketProject.Models.Account;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AjaxTechnologyMarketProject.Data;
using AjaxTechnologyMarketProject.Models.ViewModel;

namespace AjaxTechnologyMarketProject.Controllers.Login
{
    public class AccountController : Controller
    {
        public readonly ApplicationDbContext context;
        public AccountController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginSignupView model)
        {
            if (ModelState.IsValid)
            {

                var data = context.Users.Where(e => e.Username == model.Username).SingleOrDefault();
                if (data != null)
                {
                    bool isValid = (data.Username == model.Username && data.Password == model.Password);
                    if (isValid)
                    {
                        var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, model.Username) }, CookieAuthenticationDefaults.AuthenticationScheme);
                        var principal = new ClaimsPrincipal(identity);
                        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                        HttpContext.Session.SetString("Username", model.Username);
                        return RedirectToAction("Index", "Home");

                    }
                    else
                    {
                        TempData["errorPassword"] = "Invalid password!";
                        return View(model);
                    }
                }
                else
                {
                    TempData["errorUsername"] = "Username not found!";
                    return View(model);

                }
            }
            else
            {
                return View(model);
            }

        }

        public IActionResult LogOut()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var storedCookies = Request.Cookies.Keys;
            foreach (var cookies in storedCookies)
            {
                Response.Cookies.Delete(cookies);

            }

            return RedirectToAction("Login", "Account");
        }

        public IActionResult SignUp()
        {
            return View();
        }


        [HttpPost]
        public IActionResult SignUp(LoginSignupView model)
        {
            if (ModelState.IsValid)
            {
                var data = new User()
                {
                    Username = model.Username,
                    Email = model.Email,
                    Password = model.Password,
                    Mobile = model.Mobile,
                    IsActive = model.IsActive
                };
                context.Users.Add(data);
                context.SaveChanges();
                TempData["successMessage"] = "başarılı!";
                return RedirectToAction("Login");
            }
            else
            {
                TempData["errorMessage"] = "başarısız!";
                return View(model);
            }
        }
    }
}
