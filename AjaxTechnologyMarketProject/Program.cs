using AjaxTechnologyMarketProject.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer("Server=MEHMETAKSOY\\SQLMHMT;Database=marketproject;Integrated Security=true;"));


//login i�in yaz�lcak kod 
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
{
    option.ExpireTimeSpan = TimeSpan.FromMinutes(60 * 1);
    option.LoginPath = "/Account/Login";
    option.AccessDeniedPath = "/Account/Login";

});

builder.Services.AddSession(option =>
{
    option.IdleTimeout = TimeSpan.FromMinutes(5);
    //i�erigi terk edilmeden �nce nekadar s�redir bo�ta kalabilecegini g�sterir

    option.Cookie.HttpOnly = true;
    //httponly sayesinde javascript kodlar�n�n cookie bilgisini okumas�na izin vermez g�venlik i�in �nemlidir.

    option.Cookie.IsEssential = true;
    //bu �zellik �erez uygulamas� �al��mas�n� saglamak i�in kullan�l�r

});
var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
