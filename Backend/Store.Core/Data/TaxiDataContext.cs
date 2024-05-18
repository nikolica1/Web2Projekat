using Microsoft.EntityFrameworkCore;
using Taxi.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Taxi.Core.Data
{
    public class TaxiDataContext : DbContext
    {
        public TaxiDataContext(DbContextOptions<TaxiDataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Driving> Drivings { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaxiDataContext).Assembly);
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Username)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email)
                .IsUnique();
            modelBuilder.Entity<Driving>()
                .HasOne(o => o.User)
                .WithMany(u => u.Drivings)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.NoAction);
         




        }
    }
}
