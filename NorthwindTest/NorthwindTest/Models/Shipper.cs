using System;
using System.Collections.Generic;

namespace NorthwindTest.Models;

public partial class Shipper
{
    public int ShipperId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string? Phone { get; set; }

    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; } = new List<Order>();
}
