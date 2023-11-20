using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace AjaxTechnologyMarketProject.Models.ViewModel
{
    public class LoginSignupView
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public long Mobile { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsActive { get; set; }

        [Display(Name = "Remember Me")]
        public bool IsRemember { get; set; }
    }
}
