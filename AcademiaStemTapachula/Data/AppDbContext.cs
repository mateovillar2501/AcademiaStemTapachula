

using Microsoft.EntityFrameworkCore;
using AcademiaStemTapachula.Areas.Dashboard.Models;

namespace AcademiaStemTapachula.Data;   


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {   
    }

    public  DbSet<Cursos> Cursos {  get; set; }

}
