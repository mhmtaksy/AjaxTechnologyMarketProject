using System.ComponentModel.DataAnnotations;

namespace AjaxTechnologyMarketProject.Models
{
    public class Manager
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Expertise { get; set; }


    }
}
