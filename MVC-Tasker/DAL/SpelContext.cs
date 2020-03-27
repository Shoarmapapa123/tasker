using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MVC_Tasker.Models;

namespace MVC_Tasker.DAL
{
    public class SpelContext : DbContext
    {
        public SpelContext(DbContextOptions<SpelContext> options) : base(options) { }        
        public DbSet<SpelModel> Spellen { get; set; }
        public DbSet<SpelerModel> Spelers { get; set; }        
    }
}
