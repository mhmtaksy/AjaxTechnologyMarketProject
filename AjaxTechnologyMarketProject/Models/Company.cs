using System.ComponentModel.DataAnnotations;

namespace AjaxTechnologyMarketProject.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Center { get; set; }

    }
}
