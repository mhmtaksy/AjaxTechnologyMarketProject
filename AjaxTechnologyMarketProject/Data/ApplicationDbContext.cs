using AjaxTechnologyMarketProject.Models;
using AjaxTechnologyMarketProject.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace AjaxTechnologyMarketProject.Data
{
    public class ApplicationDbContext:DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
                
                


        }

        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Company>? Companies { get; set; }
        public DbSet<Manager>? Managers { get; set; }
        public DbSet<User> Users { get; set; }






    }
}
