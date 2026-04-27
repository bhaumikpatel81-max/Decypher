using Decypher.Web.Data;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Utilities
{
    public static class DbContextExtensions
    {
        public static void SetTenantId(this ApplicationDbContext context, string tenantId)
        {
            context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            context.Database.SetConnectionString(context.Database.GetConnectionString());
            
            if (!string.IsNullOrEmpty(tenantId))
            {
                context.ChangeTracker.Context.Items["TenantId"] = tenantId;
            }
        }
    }
}
